import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LlmPromptsService } from './llm-prompts.service';
import { LlmPrompt } from './entities/llm-prompt.entity';

describe('LlmPromptsService', () => {
  let service: LlmPromptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LlmPromptsService,
        {
          provide: getRepositoryToken(LlmPrompt),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LlmPromptsService>(LlmPromptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
