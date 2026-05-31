import { Test, TestingModule } from '@nestjs/testing';
import { QueryService } from './query.service';
import { PromptService } from '../prompt/prompt.service';
import { ConfigService } from '@nestjs/config';

describe('QueryService', () => {
  let service: QueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueryService,
        {
          provide: PromptService,
          useValue: {
            buildSystemPrompt: jest.fn().mockReturnValue('mock system prompt'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const values: Record<string, string> = {
                LLM_PROVIDER: 'groq',
                GROQ_API_KEY: 'mock_api_key',
                GROQ_TEMPERATURE: '0',
              };
              return values[key];
            }),
            getOrThrow: jest.fn((key: string) => {
              if (key === 'GROQ_MODEL') return 'llama-3.3-70b-versatile';
              throw new Error(`Missing env var: ${key}`);
            }),
          },
        },
      ],
    }).compile();

    service = module.get<QueryService>(QueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
