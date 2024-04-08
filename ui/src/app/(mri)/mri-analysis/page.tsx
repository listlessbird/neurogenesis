"use client"
import { UploadForm, UploadProvider } from "./upload-form"
import { UploadPreview } from "./upload-preview"
import { ResultAnalysis } from "./result-analysis/results"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"

export default function AnalyzePage() {
  return (
    <>
      <Tabs defaultValue="nda" className="min-h-full relative z-0">
        <TabsList className="w-full justify-around sticky top-2 z-100 shadow-lg p-4">
          <TabsTrigger value="nda" className="w-full text-pretty">
            Neurodegenerative Disease Analysis
          </TabsTrigger>
          <TabsTrigger value="mra" className="w-full text-pretty">
            Medical Result Analysis
          </TabsTrigger>
        </TabsList>
        <TabsContent value="nda" className="size-full">
          <div className="grid md:grid-cols-[300px_1fr] gap-4 w-full items-start lg:grid-cols-[300px_1fr] py-2">
            <UploadProvider>
              <div className="size-full">
                <div className="fixed left-0 w-[300px] h-[92vh]">
                  <UploadForm />
                </div>
              </div>
              <div className="overflow-y-auto -z-10">
                <UploadPreview />
              </div>
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
