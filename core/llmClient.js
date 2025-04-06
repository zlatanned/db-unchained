// Abstracts the LLM integration using LangChain.
// Swaps providers based on environment variables/config.
const { ChatOpenAI } = require('@langchain/openai');
const { ChatGroq } = require('@langchain/groq');
const config = require('../config/defaults');

async function getLLMResponse(prompt) {
    let llm;

    switch (config.llmProvider) {
        case 'openai':
            llm = new ChatOpenAI({
                apiKey: config.openai.apiKey,
                modelName: config.openai.model,
                temperature: config.openai.temperature
            });
            break;
        case 'groq':
            llm = new ChatGroq({
                apiKey: config.groq.apiKey,
                model: config.groq.model,
                temperature: config.groq.temperature
            });
            break;
        default:
            throw new Error(`Unsupported LLM Provider: ${config.llmProvider}`);
    }

    // Directly invoke the LLM with our prompt.
    const response = await llm.invoke(prompt);
    return response.content.trim();
}

module.exports = { getLLMResponse };
