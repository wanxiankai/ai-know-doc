'use client'
import React from 'react'
import { User } from '@supabase/supabase-js'


type Props = {
    user: User | null
}

function AskAIButton({ user }: Props) {
    console.log("user", user?.email)
    return (
        <div>AskAIButton</div>
    )
}

export default AskAIButton