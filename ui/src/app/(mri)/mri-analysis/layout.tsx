export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full container mx-auto">
      <main className="h-full">{children}</main>
    </div>
  )
}
