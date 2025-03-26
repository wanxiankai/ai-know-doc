'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

function LogoutButton() {
    const [loading, setLoading] = useState(false)
    const handleLogout = () => {
        console.log('Logging out...')
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