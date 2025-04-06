const prompts = {
    sql: (userPrompt) => `You are a senior backend developer skilled in SQL. 
        Convert the following natural language instruction into a valid SQL query.
        Only return the query. Do not include explanations.
        Prompt: ${userPrompt.trim()}`,

    mongodb: (userPrompt) => `You are a MongoDB expert.
        Translate the following request into a MongoDB query using JavaScript syntax.
        Only return the query. No explanations.
        Prompt: ${userPrompt.trim()}`,

    graphql: (userPrompt) => `You are a GraphQL API expert.
        Convert the prompt into a GraphQL query.
        Only return the query. No additional output.
        Prompt: ${userPrompt.trim()}`,
};

module.exports = prompts;
