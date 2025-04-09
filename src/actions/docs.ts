'use server'

import { getUser } from "@/auth/server"
import { prisma } from "@/lib/prisma"
import { handleError } from "@/lib/utils"
import openai from "@/openai";
import { Document } from "@prisma/client";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const updateDocAction = async (docId: string, text: string) => {
    try {
        const user = await getUser()
        if (!user) {
            return { errorMessage: "You must be logged in to update a document" }
        }

        await prisma.document.update({
            where: {
                id: docId,
                authorId: user.id,
            },
            data: {
                text,
            },
        })

        return { errorMessage: null }

    } catch (error) {
        return handleError(error)
    }
}

export const createDocAction = async (docId: string) => {
    try {
        const user = await getUser()
        if (!user) {
            return { errorMessage: "You must be logged in to create a document" }
        }

        await prisma.document.create({
            data: {
                id: docId,
                authorId: user.id,
                text: "",
            },
        })

        return { errorMessage: null }

    } catch (error) {
        return handleError(error)
    }
}

export const deleteDocAction = async (docId: string) => {
    try {
        const user = await getUser()
        if (!user) {
            return { errorMessage: "You must be logged in to create a document" }
        }

        await prisma.document.delete({
            where: {
                id: docId,
                authorId: user.id,
            },
        })

        return { errorMessage: null }

    } catch (error) {
        return handleError(error)
    }
}

export const askAIAboutDocumentsAction = async (questions: string[], responses: string[], doc: Document | null) => {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to ask AI questions");

    if (!doc) {
        return "You don't have any documents yet.";
    }

    // const docs = await prisma.document.findMany({
    //     where: {
    //         authorId: user.id,
    //     },
    //     orderBy: {
    //         createdAt: "desc",
    //     },
    //     select: {
    //         text: true,
    //         createdAt: true,
    //         updatedAt: true,
    //     },
    // })
    // if (docs.length === 0) {
    //     return "You don't have any documents yet.";
    // }

    // const formattedDocs = docs.map(
    //     doc =>
    //         `
    //     Text: ${doc.text}
    //     Created at: ${doc.createdAt}
    //     Last updated: ${doc.updatedAt}
    //     `.trim()
    // ).join("\n")

    const messages: ChatCompletionMessageParam[] = [
        {
            role: "system",
            content: `
                  You are a helpful assistant that answers questions about a user's documents. 
                  Assume all questions are related to the user's documents. 
                  Make sure that your answers are not too verbose and you speak succinctly. 
                  Your responses MUST be formatted in clean, valid HTML with proper structure. 
                  Use tags like <p>, <strong>, <em>, <ul>, <ol>, <li>, <h1> to <h6>, and <br> when appropriate. 
                  Do NOT wrap the entire response in a single <p> tag unless it's a single paragraph. 
                  Avoid inline styles, JavaScript, or custom attributes.
                  
                  Rendered like this in JSX:
                  <p dangerouslySetInnerHTML={{ __html: YOUR_RESPONSE }} />
            
                  Here are the user's documents:
                  ${doc.text}
                  `,
        },
    ];

    for (let i = 0; i < questions.length; i++) {
        messages.push({ role: "user", content: questions[i] })
        if (responses.length > i) {
            messages.push({ role: "system", content: responses[i] })
        }
    }

    const completion = await openai.chat.completions.create({
        model: 'deepseek-ai/DeepSeek-V3',
        messages,
        stream: false,
    })

    return completion.choices[0].message.content || "A problem occurred while generating the response. Please try again later."
}