const { enableAutoDetectLang } = require('../config/defaults');

function buildPrompt(userPrompt, queryLanguage) {
    const autoDetect = enableAutoDetectLang === 'true';

    if (autoDetect && queryLanguage === null) {
        return `You are a helpful assistant that converts natural language into raw database queries.
            Instructions:
                1. Detect the most appropriate query language (like SQL, MongoDB, etc.) from the prompt.
                2. If the prompt is clear and specific, return only the raw query without any explanation.
                3. If the prompt is vague or lacks essential information (like table name, fields, or conditions), assume reasonable defaults
                   or return an error in the following format:
            Error: Invalid Prompt. <error reason>. Try again with a more meaningful prompt <and suggest a meaningful prompt yourself>.

        Note - Either give error with a suggested prompt (if applicable) or give query for clean prompt. Don't give both.

        Prompt: ${userPrompt.trim()}`;
    }

    return `You are a helpful assistant that converts natural language into raw ${queryLanguage} queries.
        Instructions:
        1. If the prompt is clear and specific, return only the raw ${queryLanguage} query without any explanation.
        2. If the prompt is vague or lacks essential information (like table name, fields, or conditions), assume some details
            or else return an error in the following format:
        Error: Invalid Prompt. <error reason>. Try again with a more meaningful prompt <and suggest a meaningful prompt yourself>.

        Note - Either give error with a suggested prompt (if applicable) or give query for clean prompt. Don't give both.

        Prompt: ${userPrompt.trim()}`;
}

module.exports = { buildPrompt };
