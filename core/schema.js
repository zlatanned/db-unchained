/**
 * TEMPORARY - Schema input will be taken by user in the future. Hardcoded schemas will be deprecated then.
 */

const schema = `
Tables:
1. users(id, name, email, signup_date, status)
2. orders(id, user_id, amount, created_at)
`;

module.exports = schema;
