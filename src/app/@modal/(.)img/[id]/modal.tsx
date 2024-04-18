'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';

function XSVG() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    );
}

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<'dialog'>>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        router.back();
    }

    return createPortal(
        <dialog
            ref={dialogRef}
            className="w-dvw h-dvh max-w-[100dvw] max-h-[100dvh] m-0 bg-background/90 text-white p-16"
            onClose={onDismiss}
        // onClick={onDismiss}
        >
            <div className='absolute top-2 right-2 max-w-fit'>
                <Button variant="secondary" onClick={() => {
                    dialogRef.current?.close();
                }}>
                    <XSVG />
                </Button>
            </div>
            {children}
        </dialog>,
        document.getElementById('modal-root')!
    );
}

