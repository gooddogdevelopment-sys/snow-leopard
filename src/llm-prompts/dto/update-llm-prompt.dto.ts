import { PartialType } from '@nestjs/swagger';
import { CreateLlmPromptDto } from './create-llm-prompt.dto';

export class UpdateLlmPromptDto extends PartialType(CreateLlmPromptDto) {}
