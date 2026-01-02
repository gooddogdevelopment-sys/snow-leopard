import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLlmPromptDto } from './dto/create-llm-prompt.dto';
import { UpdateLlmPromptDto } from './dto/update-llm-prompt.dto';
import { LlmPrompt } from './entities/llm-prompt.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class LlmPromptsService {
  constructor(
    @InjectRepository(LlmPrompt)
    private readonly llmPromptRepository: Repository<LlmPrompt>,
  ) {}
  create(createLlmPromptDto: CreateLlmPromptDto): Promise<LlmPrompt> {
    return this.llmPromptRepository.save(createLlmPromptDto);
  }

  findAll(): Promise<LlmPrompt[]> {
    return this.llmPromptRepository.find();
  }

  async findOne(id: string): Promise<LlmPrompt> {
    const prompt = await this.llmPromptRepository.findOneBy({ id });
    if (!prompt) {
      throw new NotFoundException(`LlmPrompt with ID "${id}" not found`);
    }
    return prompt;
  }

  async update(
    id: string,
    updateLlmPromptDto: UpdateLlmPromptDto,
  ): Promise<LlmPrompt> {
    await this.llmPromptRepository.update(id, updateLlmPromptDto);
    return await this.findOne(id);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.llmPromptRepository.delete(id);
  }
}
