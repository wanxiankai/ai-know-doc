# AI Know Doc

This is a web application that can use the ai to answer questions about the documents you write.
Now it uses the deepseek to index the documents and the langchain to answer the questions.

## Features

- Sign up and login
- Add documents, search documents and manage documents
- Ask questions about the documents

### Technologies Used

- Next.js
- Tailwind CSS
- Supabase with Auth and Database with PostgreSQL
- Prisma ORM
- Deepseek model

### How to run the project

1. Clone the repository
2. Install the dependencies

```bash
    pnpm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```bash
    DATABASE_URL= 
    SUPABASE_URL=
    SUPABASE_ANON_KEY=
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    SILICONFLOW_API_KEY=
    SILICONFLOW_API_URL= 
```

4. Run the development server

```bash
    pnpm dev
```

5. Open your browser and go to `http://localhost:3000`
6. Create an account and login
