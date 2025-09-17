// AI Integration Layer - Wraps AI calls with rate limiting
// Now using Sensay AI instead of Gemini
import { sensayAIIntegration, SensayMessage, SensayResponse } from './sensay-ai-integration';
import { AICallOptions } from './ai-rate-limiter';

// Legacy compatibility types for existing code
export interface Content {
  role?: string; // Added for Discord bot compatibility
  parts?: Array<{ text?: string; functionCall?: any; functionResponse?: any }>;
}

export interface GenerativeModel {
  generateContent(request: { contents: Content[] }): Promise<SensayResponse>;
}

export class AIIntegration {
  private sensay: typeof sensayAIIntegration;

  constructor(apiKey?: string) {
    // Use the singleton Sensay integration
    this.sensay = sensayAIIntegration;
  }

  // Wrap Sensay generateContent with rate limiting (legacy compatibility)
  async generateContentWithRateLimit(
    model: any, // Not used anymore, kept for compatibility
    request: { contents: Content[] },
    options: AICallOptions
  ): Promise<SensayResponse> {
    // Convert legacy Content format to SensayMessage format
    const messages: SensayMessage[] = request.contents.map(content => ({
      role: 'user', // Default to user, could be enhanced to detect role
      content: content.parts?.map(part => part.text || '').join(' ') || ''
    }));

    return this.sensay.generateContentWithRateLimit(messages, options);
  }

  // Create a rate-limited model wrapper (legacy compatibility)
  createRateLimitedModel(modelName: string): GenerativeModel {
    return {
      // Wrap generateContent with rate limiting
      async generateContent(request: { contents: Content[] }, options?: Omit<AICallOptions, 'prompt'>) {
        // Extract prompt from request for cache key
        const prompt = this.extractPromptFromRequest(request);
        
        const messages: SensayMessage[] = request.contents.map(content => ({
          role: 'user',
          content: content.parts?.map(part => part.text || '').join(' ') || ''
        }));

        return sensayAIIntegration.generateContentWithRateLimit(messages, {
          ...(options || {}),
          prompt,
        });
      },
    };
  }

  // Extract text content for prompt key (legacy compatibility)
  private extractPromptFromRequest(request: { contents: Content[] }): string {
    return request.contents
      .map(content => 
        content.parts
          ?.map(part => part.text || '')
          .join(' ')
      )
      .join(' ')
      .substring(0, 500); // Limit length for cache key
  }

  // Get system status
  getSystemStatus() {
    return this.sensay.getSystemStatus();
  }

  // Get token bucket status for specific guild/user
  getTokenBucketStatus(guildId?: string, userId?: string) {
    return this.sensay.getTokenBucketStatus(guildId, userId);
  }
}

// Export singleton instance - now using Sensay instead of Gemini
export const aiIntegration = new AIIntegration();