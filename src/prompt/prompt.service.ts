// src/prompt/prompt.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PromptService {
  constructor(private readonly configService: ConfigService) {}

  buildSystemPrompt(language: string): string {
    const autoDetect =
      this.configService.get<string>('ENABLE_AUTO_DETECT_LANGUAGE') === 'true';

    if (autoDetect && language === 'auto') {
      return `You are a helpful assistant that converts natural language into raw database queries.
            Instructions:
                1. Detect the most appropriate query language (like SQL, MongoDB, etc.) from the prompt.
                2. If the prompt is clear and specific, return only the raw query without any explanation.
                3. If the prompt is vague or lacks essential information (like table name, fields, or conditions), assume reasonable defaults
                   or return an error in the following format:
            Error: Invalid Prompt. <error reason>. Try again with a more meaningful prompt <and suggest a meaningful prompt yourself>.

        Note - Either give error with a suggested prompt (if applicable) or give query for clean prompt. Don't give both.`;
    }

    return `You are a helpful assistant that converts natural language into raw ${language} queries.
        Instructions:
        1. If the prompt is clear and specific, return only the raw ${language} query without any explanation.
        2. If the prompt is vague or lacks essential information (like table name, fields, or conditions), assume some details
            or else return an error in the following format:
        Error: Invalid Prompt. <error reason>. Try again with a more meaningful prompt <and suggest a meaningful prompt yourself>.

        Note - Either give error with a suggested prompt (if applicable) or give query for clean prompt. Don't give both.`;
  }
}
