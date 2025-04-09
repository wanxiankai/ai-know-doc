'use client'
import React, { Fragment, useRef, useState, useTransition } from 'react'
import { User } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { Textarea } from './ui/textarea'
import { ArrowUpIcon } from 'lucide-react'
import { askAIAboutDocumentsAction } from '@/actions/docs'
import "@/styles/ai-response.css"
import { Document } from '@prisma/client'


type Props = {
    user: User | null,
    doc: Document | null
}

function AskAIButton({ user, doc }: Props) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)
    const [questionText, setQuestionText] = useState("")
    const [questions, setQuestions] = useState<string[]>([])
    const [responses, setResponses] = useState<string[]>([])
    const handleOnOpenChange = (isOpen: boolean) => {
        if (!user) {
            router.push("/login")
        } else {
            if (isOpen) {
                setQuestions([])
                setResponses([])
                setQuestionText("")
            }
            setOpen(isOpen)
        }
    }

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    const handleInput = () => {
        const textarea = textareaRef.current
        if (!textarea) return

        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
    }

    const handleClickInput = () => {
        textareaRef.current?.focus()
    }

    const handleSubmit = () => {
        if (!questionText.trim()) return
        const newQuestions = [...questions, questionText]
        setQuestions(newQuestions)
        setQuestionText("")
        setTimeout(scrollToBottom, 100)

        startTransition(async () => {
            const response = await askAIAboutDocumentsAction(newQuestions, responses, doc)
            setResponses((prev) => [...prev, response]);
            setTimeout(scrollToBottom, 100)
        })
    }

    const scrollToBottom = () => {
        contentRef.current?.scrollTo({
            top: contentRef.current.scrollHeight,
            behavior: "smooth",
        })
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOnOpenChange}>
            <DialogTrigger asChild>
                <Button variant="secondary">Ask AI</Button>
            </DialogTrigger>
            <DialogContent className="custom-scrollbar flex h-[85vh] max-w-4xl flex-col overflow-y-auto"
                ref={contentRef}>
                <DialogHeader>
                    <DialogTitle>Ask AI About Your Documents</DialogTitle>
                    <DialogDescription>
                        Our AI can answer questions about your documents.
                    </DialogDescription>
                </DialogHeader>
                <div className='mt-4 flex flex-col gap-8'>
                    {questions.map((question, index) => (
                        <Fragment key={index}>
                            <p
                                className='ml-auto max-w-[60%] rounded-md px-2 py-1 text-sm bg-muted text-muted-foreground'>
                                {question}
                            </p>
                            {
                                responses[index] && (
                                    <p
                                        className='bot-response text-sm text-muted-foreground'
                                        dangerouslySetInnerHTML={{ __html: responses[index] }}
                                    />
                                )
                            }
                        </Fragment>
                    ))}
                    {isPending && (
                        <p className='anmit-pulse text-sm'>Thinking...</p>
                    )}
                </div>
                <div
                    className='mt-auto flex flex-col cursor-text rounded-lg border p-4'
                    onClick={handleClickInput}
                >
                    <Textarea
                        ref={textareaRef}
                        placeholder='Ask me anything about your documents...'
                        className='resize-none rounded-none border-none bg-transparent p-0 shadow-none
                placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0'
                        style={{
                            minHeight: "0",
                            lineHeight: "normal",
                        }}
                        rows={1}
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        value={questionText}
                        onChange={(e) => {
                            setQuestionText(e.target.value)
                        }}
                    />
                    <Button className='ml-auto size-8 rounded-full'>
                        <ArrowUpIcon className='text-background' />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AskAIButton