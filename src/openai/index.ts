import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.SILICONFLOW_API_KEY,
    baseURL: process.env.SILICONFLOW_API_URL,
});

export default openai;