'use client'

import { DocProviderContext } from "@/providers/DocProvider"
import { useContext } from "react"

function useDoc() {
    const context = useContext(DocProviderContext)
    if (!context) {
        throw new Error("useDoc must be used within a DocProvider")
    }
    return context
}
export default useDoc