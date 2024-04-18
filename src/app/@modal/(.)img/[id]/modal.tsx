'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

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
            onClick={onDismiss}
        >
            {children}
        </dialog>,
        document.getElementById('modal-root')!
    );
}

