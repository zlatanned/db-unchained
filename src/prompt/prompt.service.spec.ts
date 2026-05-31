import { Test, TestingModule } from '@nestjs/testing';
import { PromptService } from './prompt.service';
import { ConfigService } from '@nestjs/config';

describe('PromptService', () => {
  let service: PromptService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'ENABLE_AUTO_DETECT_LANGUAGE') return 'true';
      return undefined;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromptService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<PromptService>(PromptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return auto-detect prompt when ENABLE_AUTO_DETECT_LANGUAGE=true and language=auto', () => {
    const prompt = service.buildSystemPrompt('auto');
    expect(prompt).toContain('Detect the most appropriate query language');
  });

  it('should return language-specific prompt when language is not auto', () => {
    const prompt = service.buildSystemPrompt('sql');
    expect(prompt).toContain('raw sql queries');
  });

  it('should return language-specific prompt when auto-detect is disabled', () => {
    mockConfigService.get.mockReturnValueOnce('false');
    const prompt = service.buildSystemPrompt('auto');
    expect(prompt).toContain('raw auto queries');
  });
});
