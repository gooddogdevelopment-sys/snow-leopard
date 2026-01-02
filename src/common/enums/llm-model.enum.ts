import { AiProvider } from '../enums/llm.provider.enum';

export enum LlmModel {
  // Open AI
  GPT_4 = 'gpt-4',
  GPT_3_5_TURBO = 'gpt-3.5-turbo',

  // Google
  GEMINI_2_5_FLASH = 'gemini-2.5-flash',

  // Anthropic
  CLAUDE_3_OPUS = 'claude-3-opus',
  CLAUDE_3_SONNET = 'claude-3-sonnet',

  // Ollama
  LLAMA_3 = 'llama3',
}

export const ProviderModelMap: Record<AiProvider, LlmModel[]> = {
  [AiProvider.OPEN_AI]: [LlmModel.GPT_4, LlmModel.GPT_3_5_TURBO],
  [AiProvider.GOOGLE]: [LlmModel.GEMINI_2_5_FLASH],
  [AiProvider.ANTHROPIC]: [LlmModel.CLAUDE_3_OPUS, LlmModel.CLAUDE_3_SONNET],
  [AiProvider.OLLAMA]: [LlmModel.LLAMA_3],
};
