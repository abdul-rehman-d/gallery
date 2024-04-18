import React from "react";
import Link from 'next/link'
import { Button } from "@/components/ui/button";
 
export default function NotFound() {
  return (
    <div className="h-full w-full flex flex-col gap-2 justify-center items-center">
      <h2 className="text-xl font-semibold">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">
        <Button>
          Go to Home
        </Button>
      </Link>
    </div>
  )
}

