import { Injectable } from '@nestjs/common';
import { AiProvider } from 'src/common/enums/llm.provider.enum';
import { LlmModel } from 'src/common/enums/llm-model.enum';
import { LlmService } from 'src/common/llm.service';
import { HumanMessage } from '@langchain/core/messages';
import { LlmPromptsService } from 'src/llm-prompts/llm-prompts.service';

@Injectable()
export class ImageAnalyticsService {
  constructor(
    private readonly llmService: LlmService,
    private readonly llmPromptsService: LlmPromptsService,
  ) {}

  async analyzeImage(
    imageData: string,
    provider: AiProvider,
    modelName: LlmModel,
    promptId: string,
  ): Promise<string> {
    const model = this.llmService.getModel(provider, modelName);
    const prompt = await this.llmPromptsService.findOne(promptId);
    const response = await model.invoke([
      new HumanMessage({
        content: [
          {
            type: 'text',
            text: prompt.prompt,
          },
          {
            type: 'image_url',
            image_url: imageData,
          },
        ],
      }),
    ]);

    return response.content as string;
  }
}
