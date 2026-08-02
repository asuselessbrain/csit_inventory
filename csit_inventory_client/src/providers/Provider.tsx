"use client"
import { UserProvider } from '@/context/UserContext'
import React from 'react'
import { IUser } from '@/types'

export default function Provider({ children, initialUser }: { children: React.ReactNode, initialUser?: IUser | null }) {
    return <UserProvider initialUser={initialUser}>{children}</UserProvider>
}