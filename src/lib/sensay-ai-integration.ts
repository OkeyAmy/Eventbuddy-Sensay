// Sensay AI Integration Layer - Wraps Sensay AI calls with rate limiting
import { VerboseSensayAPI } from '../api-debug';
import { aiRateLimiter, AICallOptions } from './ai-rate-limiter';
import { SENSAY_USER_ID, SENSAY_REPLICA_SLUG, SENSAY_API_VERSION } from '../constants/sensay-auth';

export interface SensayMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  name?: string;
}

export interface SensayResponse {
  content: string;
  success: boolean;
}

export class SensayAIIntegration {
  private sensayClient: VerboseSensayAPI;
  private orgClient: VerboseSensayAPI;
  private replicaUuid: string | null = null;

  constructor(apiKey: string) {
    // Initialize organization-only client (no user authentication)
    this.orgClient = new VerboseSensayAPI({
      HEADERS: {
        'X-ORGANIZATION-SECRET': apiKey
      }
    });

    // Initialize user-authenticated client for further operations
    this.sensayClient = new VerboseSensayAPI({
      HEADERS: {
        'X-ORGANIZATION-SECRET': apiKey,
        'X-USER-ID': SENSAY_USER_ID
      }
    });
  }

  // Initialize user and replica for the session
  private async initializeSession(): Promise<string> {
    console.log('--- INITIALIZING SENSAY SESSION ---');
    
    if (this.replicaUuid) {
      console.log(`Reusing existing replica UUID: ${this.replicaUuid}`);
      return this.replicaUuid;
    }

    try {
      // Step 1: Check if the sample user exists
      console.log('Step 1: Checking if sample user exists...');
      let userExists = false;
      
      try {
        await this.orgClient.users.getV1Users(SENSAY_USER_ID);
        userExists = true;
        console.log(`✅ User ${SENSAY_USER_ID} exists`);
      } catch (error) {
        console.log(`❌ User ${SENSAY_USER_ID} does not exist, will create it`);
      }
      
      // Step 2: Create the user if it doesn't exist
      if (!userExists) {
        console.log('Step 2: Creating new user...');
        try {
          const newUser = await this.orgClient.users.postV1Users(SENSAY_API_VERSION, {
            id: SENSAY_USER_ID,
            name: "EventBuddy Bot User"
          });
          console.log(`✅ Created user ${SENSAY_USER_ID}:`, newUser);
        } catch (createUserError) {
          console.error('❌ Failed to create user:', createUserError);
          throw createUserError;
        }
      }
      
      // Step 3: List all replicas for this user (filter by fixed slug)
      console.log('Step 3: Listing all replicas for user...');
      let replicas;
      try {
        replicas = await this.sensayClient.replicas.getV1Replicas();
        console.log('Replicas response:', replicas);
      } catch (listReplicasError) {
        console.error('❌ Failed to list replicas:', listReplicasError);
        throw listReplicasError;
      }
      
      // Check if we have a replica with our sample slug
      let uuid: string | undefined;
      if (replicas && replicas.items) {
        console.log('Looking for an existing replica');
        const sampleReplica = replicas.items.find(replica => replica.slug === SENSAY_REPLICA_SLUG);
        if (sampleReplica) {
          uuid = sampleReplica.uuid;
          console.log(`✅ Found existing replica: ${sampleReplica.name} with UUID: ${uuid}`);
        } else {
          console.log('❌ No EventBuddy replica found');
        }
      } else {
        console.log('No replicas found or replicas.items is undefined');
      }
      
      // Step 4: Create a replica if it doesn't exist
      if (!uuid) {
        console.log('Step 4: Creating new replica...');
        try {
          // Sensay requires shortDescription to be <= 50 chars
          const shortDescription = "Discord event management AI assistant".slice(0, 50);

          const replicaPayload = {
            name: "EventBuddy AI Assistant",
            shortDescription,
            greeting: "Hello! I'm EventBuddy, your AI assistant for managing Discord events and engaging with your community. How can I help you today?",
            slug: SENSAY_REPLICA_SLUG,
            ownerID: SENSAY_USER_ID,
            llm: {
              model: 'claude-3-7-sonnet-latest' as const,
              memoryMode: 'prompt-caching' as const,
              // The system prompt used at runtime will be supplied via message contents; keep a minimal default here
              systemMessage: "EventBuddy Discord assistant"
            }
          };
          console.log('Creating replica with payload:', replicaPayload);
          
          const newReplica = await this.sensayClient.replicas.postV1Replicas(SENSAY_API_VERSION, replicaPayload);
          uuid = newReplica.uuid;
          console.log(`✅ Created new replica with slug: ${SENSAY_REPLICA_SLUG}, UUID: ${uuid}`);
        } catch (createReplicaError: any) {
          console.error('❌ Failed to create replica:', createReplicaError);
          
          // Handle 409 Conflict specifically
          if (createReplicaError.status === 409) {
            console.error('409 Conflict: A replica with this slug already exists, attempting to fetch it');
            // Try to fetch the existing replica by listing and reuse it
            try {
              const retry = await this.sensayClient.replicas.getV1Replicas();
              const existing = retry?.items?.find((r: any) => r.slug === SENSAY_REPLICA_SLUG);
              if (existing) {
                uuid = existing.uuid;
                console.log(`✅ Reusing existing replica UUID after conflict: ${uuid}`);
              } else {
                throw new Error('Replica exists but could not be retrieved with current credentials.');
              }
            } catch (retryErr) {
              throw retryErr;
            }
          }
          
          throw createReplicaError;
        }
      }
      
      console.log(`Setting replica UUID: ${uuid}`);
      this.replicaUuid = uuid;
      console.log('--- SENSAY SESSION INITIALIZATION COMPLETE ---');
      return uuid;
    } catch (error: any) {
      console.error('❌❌❌ Error initializing Sensay session:', error);
      
      // Check specifically for unauthorized errors which likely indicate an invalid API key
      let userFriendlyMessage = '';
      
      if (error.status === 401 || error.message?.includes('Unauthorized') || error.message?.includes('401')) {
        userFriendlyMessage = 'Invalid or expired Sensay API key. Please check your API key and try again.';
        console.error('Authentication error detected - likely invalid API key');
      } else if (error.status === 403 || error.message?.includes('Forbidden') || error.message?.includes('403')) {
        userFriendlyMessage = 'Your Sensay API key does not have permission for this operation. Please check your account permissions.';
      } else if (error.status === 429 || error.message?.includes('Too Many Requests') || error.message?.includes('429')) {
        userFriendlyMessage = 'Rate limit exceeded. Please wait a moment and try again.';
      } else {
        // Generic error handling
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        userFriendlyMessage = errorMessage;
      }
      
      throw new Error(`Failed to initialize Sensay session: ${userFriendlyMessage}`);
    }
  }

  // Generate content with rate limiting using Sensay API
  async generateContentWithRateLimit(
    messages: SensayMessage[],
    options: AICallOptions
  ): Promise<SensayResponse> {
    const result = await aiRateLimiter.callAI(
      async () => {
        // Initialize the session and get a replica UUID
        const replicaUuid = await this.initializeSession();
        
        // Flatten the full prompt (system + db context + user) into a single content string
        const combinedContent = this.formatContentsToPlaintext(messages as unknown as any[]);
        if (!combinedContent || !combinedContent.trim()) {
          // Fallback to last user message if flattening failed
          const userMessage = messages.filter(msg => (msg as any).role === 'user').pop();
          if (!userMessage) {
            throw new Error('No user message found in the conversation');
          }
          
          // Use the standard non-streaming chat completions endpoint
          const response = await this.sensayClient.chatCompletions.postV1ReplicasChatCompletions(
            replicaUuid,
            SENSAY_API_VERSION,
            {
              content: userMessage.content,
              source: 'web',
              skip_chat_history: false
            }
          );
  
          return {
            content: response.content,
            success: response.success
          };
        }

        // Use the standard non-streaming chat completions endpoint
        const response = await this.sensayClient.chatCompletions.postV1ReplicasChatCompletions(
          replicaUuid,
          SENSAY_API_VERSION,
          {
            content: combinedContent,
            source: 'web',
            skip_chat_history: false
          }
        );

        return {
          content: response.content,
          success: response.success
        };
      },
      options
    );

    if (!result.success) {
      // Log telemetry
      console.log(`[Sensay-Telemetry] ${result.errorType}: ${result.error} - Queue wait: ${result.queueWaitMs}ms, Attempts: ${result.attemptCount}`);
      
      // Throw with user-friendly message based on error type
      throw new Error(result.error);
    }

    // Log successful call
    if (result.fromCache) {
      console.log(`[Sensay-Cache] Cache hit - Queue wait: ${result.queueWaitMs}ms`);
    } else {
      console.log(`[Sensay-Success] Response generated - Queue wait: ${result.queueWaitMs}ms, Attempts: ${result.attemptCount}`);
    }

    return result.data!;
  }

  // Create a rate-limited model wrapper (for compatibility with existing code)
  createRateLimitedModel(modelName: string) {
    return {
      // Wrap generateContent with rate limiting
      async generateContent(request: { contents: SensayMessage[] }, options: Omit<AICallOptions, 'prompt'>) {
        // Extract prompt from request for cache key
        const prompt = this.extractPromptFromRequest(request);
        
        return this.generateContentWithRateLimit(request.contents, {
          ...options,
          prompt,
        });
      },
    };
  }

  // Extract text content for prompt key
  private extractPromptFromRequest(request: { contents: SensayMessage[] }): string {
    const flattened = this.formatContentsToPlaintext(request.contents as unknown as any[]);
    return flattened.substring(0, 500);
  }

  // Convert the mixed Content[] shape (with parts) into a single plaintext string
  private formatContentsToPlaintext(contents: any[]): string {
    if (!Array.isArray(contents)) return '';
    const lines: string[] = [];
    for (const item of contents) {
      const role = (item?.role || 'user').toString().toUpperCase();
      let text = '';
      if (Array.isArray(item?.parts) && item.parts.length > 0) {
        const partTexts = item.parts
          .map((p: any) => p?.text)
          .filter((t: any) => typeof t === 'string' && t.trim().length > 0);
        text = partTexts.join('\n');
      } else if (typeof item?.content === 'string') {
        text = item.content;
      }
      if (text.trim().length > 0) {
        lines.push(`${role}: ${text}`);
      }
    }
    return lines.join('\n\n');
  }

  // Get system status
  getSystemStatus() {
    return aiRateLimiter.getStatus();
  }

  // Get token bucket status for specific guild/user
  getTokenBucketStatus(guildId?: string, userId?: string) {
    return aiRateLimiter.getTokenBucketStatus(guildId, userId);
  }
}

// Export singleton instance
export const sensayAIIntegration = new SensayAIIntegration(process.env.SENSAY_API_KEY_SECRET || '');
