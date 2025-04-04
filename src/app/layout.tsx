import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import DocProvider from "@/providers/DocProvider";


export const metadata: Metadata = {
  title: "AI Know Doc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DocProvider>
            <SidebarProvider>
              <AppSidebar />
              <div className="flex flex-col min-h-screen w-full">
                <Header />
                <main className="flex-1 flex flex-col px-4 pt-8 xl:px-8">
                  {children}
                </main>
              </div>
            </SidebarProvider>
            <Toaster richColors />
          </DocProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
