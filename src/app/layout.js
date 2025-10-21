import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "@/components/SessionProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Concreate - Civil Engineering",
  description: "Civil Engineering Website",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative`}>
        <SessionProvider>
          <div className="relative z-10">{children}</div>
        </SessionProvider>
      </body>
    </html>
  )
}
