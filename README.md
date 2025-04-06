# DB-Unchained 🧠🔗

Turn plain English into database queries With Auto Language Detection(enabled by default). Powered by LangChain + Groq LLM.

> Example:

> Prompt: `Fetch all names and emails of users aged 25 or below from users table`

> Output:  
> ```sql  
> SELECT name, email FROM users WHERE age <= 25;
> ```

---

## 🚀 Why DB-Unchained?

Tired of writing raw SQL or remembering Mongo filters? Just describe what you want — DB-Unchained translates your intent into a query.

---

## 🛠️ Features

- ✅ Converts English prompts to queries using LLM
- 🔍 Auto Language Detection Mode (Supports all existing Query Languages)
- 🌐 Support for multiple query languages in Manual Language Selection Mode (SQL or MongoDB)
- 🔁 Pluggable LLMs (OpenAI, Groq etc.)
- 🔧 Configurable via environment variables
- 📦 Dockerized for easy deployment
- ✨ Clean and modular structure, built for scaling

---

## 🧪 Example Prompts to Try

| Prompt                                                   | Output Example                                              |
|----------------------------------------------------------|-------------------------------------------------------------|
| List all customers who joined in the last 30 days        | `SELECT * FROM customers WHERE created_at >= NOW() - INTERVAL 30 DAY;` |
| Fetch products that are out of stock                     | `SELECT * FROM products WHERE stock = 0;`                  |
| Get users from New York aged between 20 and 30           | `SELECT * FROM users WHERE city = 'New York' AND age BETWEEN 20 AND 30;` |
| Show total revenue for each product category             | `SELECT category, SUM(revenue) FROM products GROUP BY category;` |
| Find all employees who haven't submitted their timesheet | `SELECT * FROM employees WHERE id NOT IN (SELECT employee_id FROM timesheets);` |

---

## ⚙️ Configuration

All config is managed via environment variables. Example `.env`:

```env
LLM_PROVIDER=groq
ENABLE_AUTO_DETECT=true
GROQ_API_KEY=your-groq-api-key-here
GROQ_MODEL=model-you-want-to-use
```
- ✅ Node.js v22+ supported natively with .env file alternatives
- 🔐 Never commit your .env with secrets
---

## 🔐 How to Get Groq API Key
- Visit: https://console.groq.com/keys
- Login with GitHub/Google
- Generate a new API key
- Add to .env as GROQ_API_KEY=...

---

## ▶️ Run Locally

```bash
# Install deps
npm install --omit=dev

# Run
npm start
```
- (if ENABLE_AUTO_DETECT = true) You’ll be prompted to enter your preferred query language followed by a plain text in your natural language.
The app will return a raw DB query (acc to your selected query language in first prompt) using the selected LLM.

- (if ENABLE_AUTO_DETECT = false) You’ll be prompted to enter a plain text in your natural language.
The app will return a raw DB query with automatic language selection based on your prompt and general popularity.

---

## 🐳 Docker

```bash
# Build
docker build -t db-unchained .

# Run with env
docker run -it --env-file .env db-unchained
```
- Make sure .env contains your API key and configs.

---

# 🤝 Contributing
PRs welcome. Just don’t break the modularity. Keep things clean, minimal, and extendable.

# 🧑‍💻 Author
Made with ❤️ by zlatanned.
