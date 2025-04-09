'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { logOutAction } from '@/actions/users'

function LogoutButton() {
    const router = useRouter();

    const [loading, setLoading] = useState(false)
    const handleLogout = async () => {
        setLoading(true)

        const { errorMessage } = await logOutAction();

        if (!errorMessage) {
            toast.success('Logout successful')
            router.push('/')
        } else {
            toast.error(errorMessage)
        }
        setLoading(false)
    }
    return (
        <Button
            onClick={handleLogout}
            variant='outline'
            disabled={loading}
            className='w-24'
        >
            {loading ? <Loader2 className='animate-spin' /> : "Logout"}
        </Button>
    )
}

export default LogoutButton