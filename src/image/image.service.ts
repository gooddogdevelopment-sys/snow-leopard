import { Injectable } from '@nestjs/common';
import { LlmService } from '../llm/llm.service';
import { ImageActionDto } from './dto/image-action.dto';
import { AiProvider } from '../llm/enums/ai-provider.enum';
import { ChatResponseDto } from './dto/chat-response.dto';
import { HumanMessage } from '@langchain/core/messages';

const IMAGE_ANALYSIS_PROMPT =
  'Analyze this image in detail. Describe what you see, including objects, people, colors, composition, and any notable features.';
const AGE_ESTIMATION_PROMPT =
  'Estimate the age of the person in this image. Provide your best estimate and explain the visual cues you used to make this determination.';

@Injectable()
export class ImageService {
  constructor(private readonly llmService: LlmService) {}

  async processImage(dto: ImageActionDto) {
    const systemPrompt = `You are an expert image analysis assistant. 
    Perform the requested action on the provided image with precision and detail.`;

    const userPrompt = `Action: ${dto.action}
    Image URL: ${dto.imageUrl}
    ${dto.additionalContext ? `Additional Context: ${dto.additionalContext}` : ''}`;

    const result = await this.llmService.invoke(
      systemPrompt,
      userPrompt,
      dto.provider,
      dto.modelName,
    );

    return {
      action: dto.action,
      result,
      imageUrl: dto.imageUrl,
      provider: dto.provider,
      model: dto.modelName,
    };
  }

  async analyzeImage(
    imageData: string,
    provider: AiProvider,
    modelName?: string,
    customPrompt?: string,
  ): Promise<ChatResponseDto> {
    const model = this.llmService.getModel(provider, modelName);
    const response = await model.invoke([
      new HumanMessage({
        content: [
          {
            type: 'text',
            text: customPrompt || IMAGE_ANALYSIS_PROMPT,
          },
          {
            type: 'image_url',
            image_url: imageData,
          },
        ],
      }),
    ]);

    return Object.assign(new ChatResponseDto(), {
      provider,
      model:
        modelName ||
        (provider === 'ollama' ? 'llama3.2-vision' : 'gemini-1.5-flash'),
      responseContent: response.content as string,
    });
  }

  async estimateAge(
    imageData: string,
    provider: AiProvider,
    modelName?: string,
  ): Promise<ChatResponseDto> {
    const model = this.llmService.getModel(provider, modelName);
    const response = await model.invoke([
      new HumanMessage({
        content: [
          {
            type: 'text',
            text: AGE_ESTIMATION_PROMPT,
          },
          {
            type: 'image_url',
            image_url: imageData,
          },
        ],
      }),
    ]);

    return Object.assign(new ChatResponseDto(), {
      provider,
      model:
        modelName ||
        (provider === 'ollama' ? 'llama3.2-vision' : 'gemini-1.5-flash'),
      responseContent: response.content as string,
    });
  }
}
