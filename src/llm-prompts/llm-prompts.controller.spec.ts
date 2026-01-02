import { Test, TestingModule } from '@nestjs/testing';
import { LlmPromptsController } from './llm-prompts.controller';
import { LlmPromptsService } from './llm-prompts.service';

describe('LlmPromptsController', () => {
  let controller: LlmPromptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LlmPromptsController],
      providers: [
        {
          provide: LlmPromptsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LlmPromptsController>(LlmPromptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
