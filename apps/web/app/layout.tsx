import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "orunos | Your Academic copilot",
  description: "Your Academic Copilot to Ace all your academic documents from as simple as coursework to as complex as research",
  keywords: ["coursework", "research", "artificial intelligence", "academic"],

  openGraph: {
    title: 'orunos',
    description: 'Your Academic Copilot to Ace all your academic documents from as simple as coursework to as complex as research',
    url: 'orunos.com',
    siteName: 'orunos.com',
    locale: "en_US",
    type: "website",
    images: [{ url: 'images/tree.png' }]
  },
  
  twitter: {
    card: "summary_large_image",
    title: 'orunos',
    description: 'Your Academic Copilot to Ace all your academic documents from as simple as coursework to as complex as research',
    creator: "@kimbrenekakande",
    images: "images/tree.png"
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  
  alternates: {
    canonical : "https://orunos.com/dashboard/" //4 static - figure how it works
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="apple-mobile-web-app-title" content="orunos" />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system"  enableSystem disableTransitionOnChange >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
