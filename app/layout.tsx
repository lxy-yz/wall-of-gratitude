import "@/styles/globals.css"
import { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"
import { authOptions } from "@/lib/auth"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { getServerSession } from "next-auth/next"
import { SessionProvider } from "./session-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/icons/favicon-32x32.png",
    shortcut: "/icons/favicon-16x16.png",
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marck+Script&display=swap" />

          <script defer data-domain="wallofgratitude.site" src="https://plausible.liallen.me/js/script.tagged-events.js"></script>
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <SessionProvider session={session}>
            {/* TODO: change to system? */}
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1 px-4">{children}</div>
              </div>
              <TailwindIndicator />
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
    </>
  )
}

