"use client"
import { Button } from '@/components/ui/button'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import React from 'react'
const Dashbord = () => {
    const { onOpen } = useNewAccount()
    return (
        <>
            <div>

                <Button onClick={onOpen}>Add a Account</Button>
            </div>
        </>
    )
}

export default Dashbord