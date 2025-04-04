'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { Textarea } from './ui/textarea'
import { debounceTimeout } from '@/lib/constants'
import useDoc from '@/hooks/useDoc'
import { updateDocAction } from '@/actions/docs'

type Props = {
    docId: string
    startingDocText: string
}

let updateTimeout: NodeJS.Timeout | null = null

function DocTextInput({ docId, startingDocText }: Props) {
    const docIdParams = useSearchParams().get("docId") || ""
    const { docText, setDocText } = useDoc()

    useEffect(() => {
        if (docId === docIdParams) {
            setDocText(startingDocText)
        }
    }, [startingDocText, docIdParams,docId, setDocText])

    const handleUpdateDoc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDocText = e.target.value
        setDocText(newDocText)
        if (updateTimeout) {
            clearTimeout(updateTimeout)
        }
        updateTimeout = setTimeout(() => {
            updateDocAction(docId, newDocText)
        }, debounceTimeout)
    }

    return (
        <Textarea
            value={docText}
            onChange={handleUpdateDoc}
            placeholder='Type your document text here...'
            className='custom-scrollbar mb-4 h-full max-w-4xl resize-none border p-4 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0'
        />
    )
}

export default DocTextInput