import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { LlmRequestDto } from '../common/dto/llm-request.dto';

@Module({
    providers: [LlmService],
    exports: [LlmService],
})
export class LlmModule { }