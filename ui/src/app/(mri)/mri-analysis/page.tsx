"use client"
import { UploadForm, UploadProvider } from "./upload-form"
import { UploadPreview } from "./upload-preview"

export default function AnalyzePage() {
  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-4 w-full max-w-6xl mx-auto items-start lg:grid-cols-[300px_1fr] content-center h-full">
      <UploadProvider>
        <UploadForm />
        <UploadPreview />
      </UploadProvider>
    </div>
  )
}
