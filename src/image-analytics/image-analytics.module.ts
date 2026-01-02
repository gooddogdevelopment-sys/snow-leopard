import { ImageAnalyticsController } from './image-analytics.controller';
import { ImageAnalyticsService } from './image-analytics.service';
import { Module } from '@nestjs/common';
import { LlmModule } from 'src/common/llm.module';
import { LlmPromptsModule } from 'src/llm-prompts/llm-prompts.module';

@Module({
  imports: [LlmModule, LlmPromptsModule],
  controllers: [ImageAnalyticsController],
  providers: [ImageAnalyticsService],
})
export class ImageAnalyticsModule {}
