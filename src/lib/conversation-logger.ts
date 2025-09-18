// Conversation logging utilities for Discord bot
import { createClient } from '@supabase/supabase-js';

interface ConversationEntry {
  user_id: string;
  channel_id: string;
  guild_id: string;
  message_content?: string;
  sender_id: string;
  sender_username?: string;
  ai_response?: string;
  context_used?: any;
}

interface UserPreference {
  user_id: string;
  channel_id: string;
  guild_id: string;
  preference_type: string;
  preference_value: string;
  preference_description?: string;
}

interface ChannelMetadata {
  channel_id: string;
  guild_id: string;
  channel_name: string;
  channel_purpose?: string;
  created_by: string;
  ai_personality_context?: any;
}

export class ConversationLogger {
  private supabase: ReturnType<typeof createClient>;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Log a conversation entry to the database
   */
  async logConversation(entry: ConversationEntry): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('conversation_history')
        .insert([{
          user_id: entry.user_id,
          channel_id: entry.channel_id,
          guild_id: entry.guild_id,
          message_content: entry.message_content,
          sender_id: entry.sender_id,
          sender_username: entry.sender_username,
          ai_response: entry.ai_response,
          context_used: entry.context_used || {}
        }]);

      if (error) {
        console.error('❌ Error logging conversation:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('❌ Exception in logConversation:', error);
      return false;
    }
  }

  /**
   * Get conversation context for AI to learn from
   */
  async getConversationContext(
    userId: string,
    channelId: string,
    limit: number = 50
  ): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .rpc('get_conversation_context', {
          p_user_id: userId,
          p_channel_id: channelId,
          p_limit: limit
        });

      if (error) {
        console.error('❌ Error getting conversation context:', error);
        return [];
      }

      return (data as any[]) || [];
    } catch (error) {
      console.error('❌ Exception in getConversationContext:', error);
      return [];
    }
  }

  /**
   * Get user preferences for a specific channel
   */
  async getUserChannelPreferences(
    userId: string,
    channelId: string
  ): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .rpc('get_user_channel_preferences', {
          p_user_id: userId,
          p_channel_id: channelId
        });

      if (error) {
        console.error('❌ Error getting user preferences:', error);
        return [];
      }

      return (data as any[]) || [];
    } catch (error) {
      console.error('❌ Exception in getUserChannelPreferences:', error);
      return [];
    }
  }

  /**
   * Set user preference for a channel
   */
  async setUserPreference(preference: UserPreference): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('user_channel_preferences')
        .upsert([{
          user_id: preference.user_id,
          channel_id: preference.channel_id,
          guild_id: preference.guild_id,
          preference_type: preference.preference_type,
          preference_value: preference.preference_value,
          preference_description: preference.preference_description,
          is_active: true
        }], {
          onConflict: 'user_id,channel_id,preference_type'
        });

      if (error) {
        console.error('❌ Error setting user preference:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('❌ Exception in setUserPreference:', error);
      return false;
    }
  }

  /**
   * Update or create channel metadata
   */
  async updateChannelMetadata(metadata: ChannelMetadata): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('channel_metadata')
        .upsert([{
          channel_id: metadata.channel_id,
          guild_id: metadata.guild_id,
          channel_name: metadata.channel_name,
          channel_purpose: metadata.channel_purpose,
          created_by: metadata.created_by,
          ai_personality_context: metadata.ai_personality_context || {},
          updated_at: new Date().toISOString()
        }], {
          onConflict: 'channel_id'
        });

      if (error) {
        console.error('❌ Error updating channel metadata:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('❌ Exception in updateChannelMetadata:', error);
      return false;
    }
  }

  /**
   * Get channel metadata and AI context
   */
  async getChannelMetadata(channelId: string): Promise<any | null> {
    try {
      const { data, error } = await this.supabase
        .from('channel_metadata')
        .select('*')
        .eq('channel_id', channelId)
        .single();

      if (error) {
        console.error('❌ Error getting channel metadata:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('❌ Exception in getChannelMetadata:', error);
      return null;
    }
  }

  /**
   * Build context string for AI from conversation history and preferences
   */
  async buildAIContext(userId: string, channelId: string, guildId: string): Promise<string> {
    try {
      // Get conversation history
      const history = await this.getConversationContext(userId, channelId, 20);
      
      // Get user preferences
      const preferences = await this.getUserChannelPreferences(userId, channelId);
      
      // Get channel metadata
      const channelMeta = await this.getChannelMetadata(channelId);

      // Get active events from database
      let activeEventsInfo = '';
      try {
        const { data: events } = await this.supabase
          .from('events')
          .select('*')
          .eq('guild_id', guildId)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (events && events.length > 0) {
          const eventList = events.map((e: any) => {
            const name = e.event_name ?? e.name ?? e.eventName ?? 'Unnamed Event';
            const description = e.event_description ?? e.description ?? '';
            const date = e.event_date ?? e.date ?? '';
            const time = e.event_time ?? e.time ?? '';
            const location = e.event_location ?? e.location ?? '';
            const others = e.others ?? '';
            return `• **${name}** (Status: ${e.status})${description ? `\n  Description: ${description}` : ''}${date ? `\n  Date: ${date}` : ''}${time ? `\n  Time: ${time}` : ''}${location ? `\n  Location: ${location}` : ''}${others ? `\n  Additional Info: ${others}` : ''}`;
          }).join('\n');
          activeEventsInfo = `\nCURRENT ACTIVE EVENTS IN DATABASE:\n${eventList}\n`;
        } else {
          activeEventsInfo = '\nCURRENT ACTIVE EVENTS IN DATABASE:\nNo active events found in the database.\n';
        }
      } catch (eventsError) {
        console.error('❌ Error getting events for AI context:', eventsError);
        activeEventsInfo = '\nCURRENT ACTIVE EVENTS IN DATABASE:\nError retrieving events from database.\n';
      }

      let contextParts = [];

      // Add active events information at the top
      if (activeEventsInfo) {
        contextParts.push(activeEventsInfo);
      }

      // Add channel context
      if (channelMeta) {
        contextParts.push(`Channel: ${channelMeta.channel_name}`);
        if (channelMeta.channel_purpose) {
          contextParts.push(`Purpose: ${channelMeta.channel_purpose}`);
        }
        if (channelMeta.ai_personality_context && Object.keys(channelMeta.ai_personality_context).length > 0) {
          contextParts.push(`Channel personality: ${JSON.stringify(channelMeta.ai_personality_context)}`);
        }
      }

      // Add user preferences
      if (preferences.length > 0) {
        const prefStrings = preferences.map(p => `${p.preference_type}: ${p.preference_value}`);
        contextParts.push(`User preferences: ${prefStrings.join(', ')}`);
      }

      // Add recent conversation history
      if (history.length > 0) {
        contextParts.push(`Recent conversation history:`);
        history.reverse().forEach((entry, index) => {
          if (entry.message_content) {
            contextParts.push(`${entry.sender_username || entry.sender_id}: ${entry.message_content}`);
          }
          if (entry.ai_response) {
            contextParts.push(`AI: ${entry.ai_response}`);
          }
        });
      }

      return contextParts.join('\n');
    } catch (error) {
      console.error('❌ Error building AI context:', error);
      return '';
    }
  }

  /**
   * Log AI response with the original message
   */
  async logAIResponse(
    userId: string,
    channelId: string,
    guildId: string,
    userMessage: string,
    username: string,
    aiResponse: string,
    contextUsed?: any
  ): Promise<boolean> {
    try {
      // Log user message
      await this.logConversation({
        user_id: userId,
        channel_id: channelId,
        guild_id: guildId,
        message_content: userMessage,
        sender_id: userId,
        sender_username: username
      });

      // Log AI response
      await this.logConversation({
        user_id: userId,
        channel_id: channelId,
        guild_id: guildId,
        ai_response: aiResponse,
        sender_id: 'AI',
        sender_username: 'EventBuddy',
        context_used: contextUsed
      });

      return true;
    } catch (error) {
      console.error('❌ Error logging AI response:', error);
      return false;
    }
  }
}