import TopNav from "@/components/top-nav";
import { ourFileRouter } from "@/app/api/uploadthing/core"
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import "@uploadthing/react/styles.css";

import { Inter } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Gallery by ARD",
  description: "A small shared secure storage for your images",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <body className={`font-sans ${inter.variable} dark`} >
          <div className="h-dvh px-4 pb-4 grid grid-rows-[auto,1fr] gap-4">
            <TopNav />
            <main className="overflow-y-auto">
              {children}
            </main>
          </div>
          {modal}
          <div id="modal-root" />
          <Toaster />
        </body>
      </html>
    </ClerkProvider >
  );
}
