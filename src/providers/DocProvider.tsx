'use client'

import { createContext, useState } from "react"

type DocProviderContextType = {
    docText: string
    setDocText: (text: string) => void
}

export const DocProviderContext = createContext<DocProviderContextType>({
    docText: "",
    setDocText: () => {},
})

function DocProvider({ children }: { children: React.ReactNode }) {
    const [docText, setDocText] = useState("")

    return (
        <DocProviderContext.Provider value={{ docText, setDocText }}>
            {children}
        </DocProviderContext.Provider>
    )
}

export default DocProvider