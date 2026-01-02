import { Test, TestingModule } from '@nestjs/testing';
import { LlmPromptsService } from './llm-prompts.service';

describe('LlmPromptsService', () => {
  let service: LlmPromptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LlmPromptsService],
    }).compile();

    service = module.get<LlmPromptsService>(LlmPromptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
