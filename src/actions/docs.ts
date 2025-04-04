'use server'

import { getUser } from "@/auth/server"
import { prisma } from "@/lib/prisma"
import { handleError } from "@/lib/utils"

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