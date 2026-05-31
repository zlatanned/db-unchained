// src/query/query.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { QueryService } from './query.service';
import { isValidPrompt } from '../util';
import { z } from 'zod';

const QueryDto = z.object({
  prompt: z
    .string()
    .min(10)
    .refine(isValidPrompt, {
      message:
        'Invalid prompt. Must be at least 10 characters, contain at least 3 meaningful words, and include an action verb (e.g. get, find, fetch, list, select, count).',
    }),
  language: z.enum(['sql', 'mongodb', 'auto']).default('auto'),
});

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Post()
  async query(@Body() body: unknown) {
    const { prompt, language } = QueryDto.parse(body);
    const result = await this.queryService.generateQuery(prompt, language);
    return { query: result };
  }
}
