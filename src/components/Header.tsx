import { shadow } from "@/styles/utils"
import Image from "next/image"
import Link from "next/link"

function Header() {
    return (
        <header
            className="bg-popover relative flex items-center justify-between h-24 w-full px-3 sm:px-8"
            style={{ boxShadow: shadow }}
        >
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
        </header>
    )
}

export default Header