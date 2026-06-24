import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter, Inter_Tight } from "next/font/google";

import { Header } from "@/components/header";
import { TooltipProvider } from "@/components/ui/tooltip";

import "@/styles/global.css";

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '700']
});

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['700']

})

export const metadata: Metadata = {
  title: 'Mundo Pet',
  description: 'Agendamento de pet shop'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${interTight.variable} antialiased`}
    >
      <body>
        <Header />
        <div className="max-w-3xl mx-auto">
          <main className="flex flex-1 flex-col mt-12">
            <TooltipProvider>{children}</TooltipProvider>
          </main>
          <Toaster position="top-right" />
        </div>
      </body>
    </html>
  );
}
