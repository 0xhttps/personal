import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const generateCompletion = async (messages) => {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages,
            temperature: 0.7,
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error creating completion:', error);
        throw new Error('Failed to generate completion');
    }
};
