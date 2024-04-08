import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant"
    )
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
})

export async function POST(req: Request) {
  const formData = await req.formData()

  const imgPart = formData.get("img") as File

  const geminiInlineData = {
    inlineData: {
      data: Buffer.from(await imgPart.arrayBuffer()).toString("base64"),
      mimeType: imgPart.type,
    },
  }

  const prompt = `
   Can you look at an image and tell me if it's a medical report? If it is, explain what it shows, and what can be inferred from it and also how should the person move forward in plain English, like you're talking to someone who doesn't know much medical jargon.
   
   MAKE SURE TO SEND THE RESPONSE IN MARKDOWN FORMAT.
   `

  // return new Response("ok")
  const geminiStream = await genAI
    .getGenerativeModel({ model: "gemini-pro-vision" })
    .generateContentStream([prompt, geminiInlineData])
  // .generateContentStream(buildGoogleGenAIPrompt(messages))

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(geminiStream)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
