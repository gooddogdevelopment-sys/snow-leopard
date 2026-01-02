import { Module } from '@nestjs/common';
import { LlmPromptsService } from './llm-prompts.service';
import { LlmPromptsController } from './llm-prompts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LlmPrompt } from './entities/llm-prompt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LlmPrompt])],
  controllers: [LlmPromptsController],
  providers: [LlmPromptsService],
  exports: [LlmPromptsService],
})
export class LlmPromptsModule {}
