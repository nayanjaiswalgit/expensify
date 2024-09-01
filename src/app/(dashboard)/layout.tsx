import React from 'react'
import Header from '@/components/layout/header'

type Props = {
    children: React.ReactNode;
};


const layout = ({ children }: Props) => {
    return (
        <>

            <main className='px-3 lg:px-14'>
                <Header />

                {children}
            </main>
        </>
    )
}

export default layout