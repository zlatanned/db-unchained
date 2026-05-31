// src/query/query.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PromptService } from '../prompt/prompt.service';
import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI } from '@langchain/openai';

type LLMClient = ChatGroq | ChatOpenAI;

@Injectable()
export class QueryService {
  private llm: LLMClient;

  constructor(
    private readonly promptService: PromptService,
    private readonly configService: ConfigService,
  ) {
    const provider =
      this.configService.get<string>('LLM_PROVIDER') ?? 'groq';

    switch (provider) {
      case 'openai':
        this.llm = new ChatOpenAI({
          apiKey: this.configService.get<string>('OPENAI_API_KEY'),
          model:
            this.configService.get<string>('OPENAI_MODEL') ?? 'gpt-3.5-turbo',
          temperature: Number(
            this.configService.get<string>('OPENAI_TEMPERATURE') ?? 0,
          ),
        });
        break;
      case 'groq':
        this.llm = new ChatGroq({
          apiKey: this.configService.get<string>('GROQ_API_KEY'),
          model: this.configService.getOrThrow<string>('GROQ_MODEL'),
          temperature: Number(
            this.configService.get<string>('GROQ_TEMPERATURE') ?? 0,
          ),
        });
        break;
      default:
        throw new Error(`Unsupported LLM Provider: ${provider}`);
    }
  }

  async generateQuery(userInput: string, language: string): Promise<string> {
    const systemPrompt = this.promptService.buildSystemPrompt(language);
    const response = await this.llm.invoke([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userInput },
    ]);
    return (response.content as string).trim();
  }
}
