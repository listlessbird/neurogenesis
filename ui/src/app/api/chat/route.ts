import { PredictedResults } from "@/app/types"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

export const runtime = "edge"

// const buildGoogleGenAIPrompt = (messages: Message[]) => ({
//   contents: messages
//     .filter(
//       (message) => message.role === "user" || message.role === "assistant"
//     )
//     .map((message) => ({
//       role: message.role === "user" ? "user" : "model",
//       parts: [{ text: message.content }],
//     })),
// })

export async function POST(req: Request) {
  const { results } = (await req.json()) as { results: PredictedResults[] }
  const prompt = `You've been provided with provided results from a machine learning model. 
  The model has predicted the following results: ${results
    .map((result) => `${result.label}: ${result.score}`)
    .join(", ")}. 
    Please provide a brief analysis of the results. Assume the results are accurate and provide a detailed analysis.
    The analysis should include the significance of the results, potential implications, and any recommendations based on the results.
    Use simple language and avoid technical jargon.

    
    `

  //   const result = await model.generateContentStream(prompt)
  //   const stream = GoogleGenerativeAIStream(result)
  const geminiStream = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream(prompt)

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(geminiStream)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
