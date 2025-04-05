'use client'

import useDoc from "@/hooks/useDoc"
import { Document } from "@prisma/client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { SidebarMenuButton } from "./ui/sidebar"
import Link from "next/link"

type Props = {
  doc: Document
}
function SelectDocButton({ doc }: Props) {
  const docId = useSearchParams().get('docId') || ""

  const { docText: selectedDocText } = useDoc();
  const [shouldUseGlobalDocText, setShouldUseGlobalDocText] = useState(false)
  const [localDocText, setLocalDocText] = useState(doc.text)

  useEffect(() => {
    if (docId === doc.id) {
      setShouldUseGlobalDocText(true)
    } else {
      setShouldUseGlobalDocText(false)
    }
  }, [docId, doc.id])

  useEffect(() => {
    if (shouldUseGlobalDocText) {
      setLocalDocText(selectedDocText)
    }
  }, [selectedDocText, shouldUseGlobalDocText])

  const blankDocText = "EMPTY DOC";
  let docText = localDocText || blankDocText
  if (shouldUseGlobalDocText) {
    docText = selectedDocText || blankDocText
  }

  return (
    <SidebarMenuButton
      asChild
      className={`items-start gap-0 pr-12 ${docId === doc.id && "bg-sidebar-accent/50"}`}
    >
      <Link href={`/?docId=${doc.id}`} className="flex h-fit flex-col">
        <p className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap">
          {docText}
        </p>
        <p className="text-muted-foreground text-xs">
          {doc.updatedAt.toLocaleDateString()}
        </p>
      </Link>
    </SidebarMenuButton>
  )
}

export default SelectDocButton