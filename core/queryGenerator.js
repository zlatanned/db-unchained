// Combines the schema with the user's natural language prompt, then gets the generated query from the LLM.
const { getLLMResponse } = require('./llmClient');
const config = require('../config/defaults');
const promptTemplates = require('../promptBuilder/index');

async function generateDBQuery(userPrompt) {
    const buildPrompt = promptTemplates[config.queryLanguage.toLowerCase()];
    if (!buildPrompt) {
        console.error(`No prompt template found for: ${config.queryLanguage}`);
        process.exit(1);
    }

    // Prompt configured to only return the query. No explanations or suggestions.
    const systemPrompt = buildPrompt(userPrompt);
    const query = await getLLMResponse(systemPrompt);
    return query.trim();
}

module.exports = { generateDBQuery };
