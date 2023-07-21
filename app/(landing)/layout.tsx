

interface LandingLayoutProps {
  children: React.ReactNode
}

export default async function LandingLayout({
  children,
}: LandingLayoutProps) {
  return (
    <div className="-mx-4 flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}