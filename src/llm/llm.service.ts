import { Injectable, BadRequestException } from '@nestjs/common';
import { ChatOllama } from '@langchain/ollama';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { AiProvider } from './enums/ai-provider.enum';

@Injectable()
export class LlmService {
  getModel(provider: AiProvider, modelName?: string) {
    switch (provider) {
      case AiProvider.OLLAMA:
        return new ChatOllama({
          baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
          model: modelName || 'llama3',
          temperature: 0.7,
        });
      case AiProvider.GOOGLE:
        return new ChatGoogleGenerativeAI({
          apiKey: process.env.GOOGLE_API_KEY,
          model: modelName || 'gemini-1.5-flash',
          maxOutputTokens: 2048,
        });
      default:
        throw new BadRequestException('Invalid AI Provider');
    }
  }

  async invoke(
    systemPrompt: string,
    userPrompt: string,
    provider: AiProvider,
    modelName?: string,
  ) {
    const model = this.getModel(provider, modelName);
    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ];

    const response = await model.invoke(messages);
    return response.content;
  }

  async invokeWithStructuredOutput<T = any>(
    systemPrompt: string,
    userPrompt: string,
    schema: any,
    provider: AiProvider,
    modelName?: string,
  ): Promise<T> {
    const model = this.getModel(provider, modelName);
    const structuredModel = model.withStructuredOutput(schema);
    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ];

    const result = await structuredModel.invoke(messages);
    return result as T;
  }
}
