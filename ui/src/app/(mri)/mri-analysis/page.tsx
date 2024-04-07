"use client"
import { UploadForm, UploadProvider } from "./upload-form"
import { UploadPreview } from "./upload-preview"
import { ResultAnalysis } from "./result-analysis/results"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyzePage() {
  return (
    <>
      <Tabs defaultValue="nda" className="min-h-full">
        <TabsList className="w-full justify-around">
          <TabsTrigger value="nda" className="w-full text-pretty">
            Neurodegenerative Disease Analysis
          </TabsTrigger>
          <TabsTrigger value="mra" className="w-full text-pretty">
            Medical Result Analysis
          </TabsTrigger>
        </TabsList>
        <TabsContent value="nda" className="min-h-full size-full">
          <div className="grid md:grid-cols-[300px_1fr] gap-4 w-full items-start lg:grid-cols-[300px_1fr] min-h-[94vh] py-2">
            <UploadProvider>
              <UploadForm />
              <UploadPreview />
            </UploadProvider>
          </div>
        </TabsContent>
        <TabsContent value="mra" className="min-h-[80vh] size-full">
          <ResultAnalysis />
        </TabsContent>
      </Tabs>
    </>
  )
}
