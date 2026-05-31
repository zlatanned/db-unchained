// src/query/query.module.ts
import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { QueryService } from './query.service';
import { PromptService } from '../prompt/prompt.service';

@Module({
  controllers: [QueryController],
  providers: [QueryService, PromptService],
})
export class QueryModule {}
