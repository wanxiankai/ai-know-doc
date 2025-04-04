'use client'
import React, { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { createDocAction } from '@/actions/docs'
type Props = {
    user: User | null
}

function NewDocumentButton({ user }: Props) {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const handleClickNewDocument = async () => {
        if (!user) {
            router.replace("/login")
        }else {
            setLoading(true)
            const uuid = uuidv4()
            await createDocAction(uuid)
            router.push(`/?docId=${uuid}`)
            toast.success("New document created")
            setLoading(false)
        }
    }

    return (
        <Button
            onClick={handleClickNewDocument}
            variant="secondary"
            className='w-24'
            disabled={loading}
            >
            {loading ? <Loader2 className='animate-spin' /> : "New Doc"}
        </Button>
    )
}

export default NewDocumentButton