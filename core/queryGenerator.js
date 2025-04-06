// Combines the schema with the user's natural language prompt, then gets the generated query from the LLM.
const { getLLMResponse } = require('./llmClient');
const { buildPrompt } = require('../promptBuilder/index');

async function generateDBQuery(userPrompt, queryLanguage) {
    const promptToLLM = buildPrompt(userPrompt, queryLanguage);

    // Prompt configured to only return the query or error for vague responses. No explanations or suggestions.
    const query = await getLLMResponse(promptToLLM);
    return query.trim();
}

module.exports = { generateDBQuery };
