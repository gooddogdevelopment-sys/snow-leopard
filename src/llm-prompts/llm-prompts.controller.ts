import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LlmPromptsService } from './llm-prompts.service';
import { CreateLlmPromptDto } from './dto/create-llm-prompt.dto';
import { UpdateLlmPromptDto } from './dto/update-llm-prompt.dto';
import { LlmPrompt } from './entities/llm-prompt.entity';

@ApiTags('llm-prompts')
@Controller('llm-prompts')
export class LlmPromptsController {
  constructor(private readonly llmPromptsService: LlmPromptsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new LLM prompt' })
  @ApiResponse({ status: 201, description: 'The prompt has been successfully created.', type: LlmPrompt })
  create(@Body() createLlmPromptDto: CreateLlmPromptDto): Promise<LlmPrompt> {
    return this.llmPromptsService.create(createLlmPromptDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all LLM prompts' })
  @ApiResponse({ status: 200, description: 'Return all prompts.', type: [LlmPrompt] })
  findAll(): Promise<LlmPrompt[]> {
    return this.llmPromptsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific LLM prompt by ID' })
  @ApiResponse({ status: 200, description: 'Return the prompt.', type: LlmPrompt })
  @ApiResponse({ status: 404, description: 'Prompt not found.' })
  findOne(@Param('id') id: string): Promise<LlmPrompt> {
    return this.llmPromptsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an LLM prompt' })
  @ApiResponse({ status: 200, description: 'The prompt has been successfully updated.', type: LlmPrompt })
  update(@Param('id') id: string, @Body() updateLlmPromptDto: UpdateLlmPromptDto): Promise<LlmPrompt> {
    return this.llmPromptsService.update(id, updateLlmPromptDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an LLM prompt' })
  @ApiResponse({ status: 200, description: 'The prompt has been successfully deleted.' })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.llmPromptsService.remove(id);
  }
}
