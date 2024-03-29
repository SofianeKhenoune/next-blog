import Footer from "@/components/footer"
import Header from "@/components/header"
import AuthProvider from "@/providers/auth-provider"
import QuerryProvider from "@/providers/query-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QuerryProvider>
            <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
              <div className="flex flex-col justify-between min-h-screen">
                <Header />
                {children}
                <Footer />
              </div>
            </ThemeProvider>
          </QuerryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
