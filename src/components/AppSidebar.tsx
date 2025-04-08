import { getUser } from "@/auth/server"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { prisma } from "@/lib/prisma";
import { Document } from "@prisma/client";
import Link from "next/link";
import SidebarGroupContent from "./SidebarGroupContent";

async function AppSidebar() {
    const user = await getUser();
    let documents: Document[] = [];

    if (user) {
        documents = await prisma.document.findMany({
            where: {
                authorId: user.id,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
    }

    return (
        <Sidebar>
            {user ?
                (<SidebarContent className="custom-scrollbar">
                    <SidebarGroup>
                        <SidebarGroupLabel className="my-2 text-lg">
                            {user && "Your Documents"}
                        </SidebarGroupLabel>
                        {user && <SidebarGroupContent docs={documents} />}
                    </SidebarGroup>
                </SidebarContent>)
                : (
                    <div className="h-full flex flex-col items-center justify-center">
                        <p className="text-center">
                            <Link href='/login' className="underline">
                                Login
                            </Link>{" "}
                            to view your documents
                        </p>
                    </div>
                )}
        </Sidebar>
    )
}

export default AppSidebar