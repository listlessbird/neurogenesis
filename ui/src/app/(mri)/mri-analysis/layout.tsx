import { AnalysisStoreProvider } from "./analysis-provider"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="size-full ">
      <main className="h-full p-2">
        <AnalysisStoreProvider>{children}</AnalysisStoreProvider>
      </main>
    </div>
  )
}
