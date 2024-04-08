import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleGenerativeAIStream } from "ai"
import { PredictedResults } from "./upload-form"
import { Suspense, useCallback, useEffect, useState } from "react"

export function GetAIAnalysis({ results }: { results: PredictedResults[] }) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")

  const makeApiReq = useCallback(async function (results: PredictedResults[]) {
    try {
      setLoading(true)
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ results }),
      })

      if (!res.ok) {
        throw new Error("Failed to fetch")
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const reader = res.body?.getReader()
      if (reader) {
        let accumulator = ""
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const text = new TextDecoder().decode(value)
          accumulator += text
          setResult(accumulator)
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setResult(`Error: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    makeApiReq(results)
  }, [results])

  return (
    <div>
      <Suspense
        fallback={<div>Hang tight while getting the AI analysis...</div>}
      >
        <div className="text-pretty">{result}</div>
      </Suspense>
    </div>
  )
}

// async function Reader({
//   reader,
// }: {
//   reader: ReadableStreamDefaultReader<any>
// }) {
//   const { done, value } = await reader.read()

//   if (done) {
//     return null
//   }

//   const text = new TextDecoder().decode(value)

//   return (
//     <span>
//       {text}
//       <Suspense>
//         <Reader reader={reader} />
//       </Suspense>
//     </span>
//   )
// }
