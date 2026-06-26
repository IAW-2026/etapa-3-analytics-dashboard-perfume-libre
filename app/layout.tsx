import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { TimeFilter } from "@/components/dashboard/TimeFilter";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "Analytics Dashboard",
  description: "Métricas y reportes globales del ecosistema",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es" className={cn("font-sans", inter.variable)}>
        <body className="bg-gray-50 text-gray-900 font-sans antialiased flex h-screen overflow-hidden">
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
              <h2 className="text-lg font-bold text-indigo-600">
                Perfume Libre Analytics
              </h2>
              <div className="flex items-center space-x-4">
                <TimeFilter />
                <UserButton />
              </div>
            </header>

            <main className="flex-1 overflow-y-auto p-8">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
