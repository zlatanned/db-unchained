function buildPrompt(userPrompt, queryLanguage) {
    return `You are a helpful assistant that converts natural language into raw ${queryLanguage} queries.
        Instructions:
            1. If the prompt is clear and specific, return only the raw ${queryLanguage} query without any explanation.
            2. If the prompt is vague or lacks essential information (like table name, fields, or conditions) assume some details
                or else return an error in the following format:
                Error: Invalid Prompt. <error reason>. Try again with a more meaningful prompt <and suggest a meaningful prompt yourself>.

        Note - Either give error with a suggested prompt(if applicable) or give query for clean prompt. Don't give both.

        Prompt: ${userPrompt.trim()}`;
}

module.exports = { buildPrompt };
