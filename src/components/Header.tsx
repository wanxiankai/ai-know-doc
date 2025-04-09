import { shadow } from "@/styles/utils"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { ModeToggle } from "./DarkModeToggle"
import { getUser } from "@/auth/server"
import { SidebarTrigger } from "./ui/sidebar"
import LogoutButton from "./LogOutButton"

async function Header() {
    const user = await getUser();
    return (
        <header
            className="bg-popover relative flex items-center justify-between h-24 w-full px-3 sm:px-8"
            style={{ boxShadow: shadow }}
        >
            <SidebarTrigger className="absolute left-1 top-1" />
            <Link href='/' className="flex items-center space-x-2">
                <Image
                    src='/logo.png'
                    alt='logo'
                    width={60}
                    height={60}
                    className="rounded-full"
                    priority />
                <h1 className=" text-2xl font-semibold leading-6">AI Know Doc</h1>
            </Link>

            <div className="flex gap-4">
                {
                    user ? (
                        <LogoutButton />
                    ) : (
                        <>
                            <Button
                                className="hidden sm:block"
                                asChild>
                                <Link href="/sign-up">
                                    Sign Up
                                </Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/login">Login</Link>
                            </Button>
                        </>
                    )
                }
                <ModeToggle />
            </div>
        </header>
    )
}

export default Header