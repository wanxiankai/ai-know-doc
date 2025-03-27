'use client'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { CardContent, CardFooter } from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Props {
    type: 'login' | 'signUp'
}

function AuthForm({ type }: Props) {
    const isLoginForm = type === 'login';
    const router = useRouter();

    const [isPending, startTransition] = useTransition()

    const handleSubmit = (formData: FormData) => {
        console.log(formData)
    }

    return (
        <form action={handleSubmit}>
            <CardContent className='w-full grid gap-4'>
                <div className='flex flex-col gap-4'>
                    <Label htmlFor='email'>Email</Label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='px-1.5 py-1.5 outline rounded-sm'
                        placeholder='Enter your email'
                        disabled={isPending}
                        required
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <Label htmlFor='password'>Password</Label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        className='px-1.5 py-1.5 outline rounded-sm'
                        placeholder='Enter your password'
                        disabled={isPending}
                        required
                    />
                </div>
            </CardContent>
            <CardFooter className='w-full flex flex-col gap-6 mt-6'>
                <Button className='w-full'>
                    {isPending ? <Loader2 className='animate-spin' /> : isLoginForm ? 'Login' : 'Sign Up'}
                </Button>
            </CardFooter>
            <p className='text-xs mt-6 flex items-center justify-center gap-1.5'>
                {isLoginForm ? 'Don\'t have an account?' : 'Already have an account?'}
                <Link
                    href={isLoginForm ? '/sign-up' : '/login'}
                    className={`text-blue-500 ${isPending ? 'pointer-events-none' : ''}`}
                >
                    {isLoginForm ? 'Sign Up' : 'Login'}
                </Link>
            </p>
        </form>
    )
}

export default AuthForm