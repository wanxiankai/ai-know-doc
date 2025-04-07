import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || ""

    const newestDocumentId = await prisma.document.findFirst({
        where: {
            authorId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
        },
    })

    return NextResponse.json({ newestDocumentId: newestDocumentId?.id })
}