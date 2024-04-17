"use client";

import { UploadButton } from "@/utils/uploadthing";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TopNav() {
  const router = useRouter();

  return (
    <>
      <nav className="p-4 border-b flex flex-row items-center justify-between">
       <Link
         href="/"
         className="font-semibold text-xl"
       >Gallery</Link>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <div className="flex flex-row gap-4 items-center">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={() => {
                router.refresh();
              }}
            />
            <UserButton />
          </div>
        </SignedIn>
      </nav>
    </>
  )
}

