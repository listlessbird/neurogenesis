const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const dotenv=require("dotenv").config()
const readline=require("readline")

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}
const userInterface =readline.createInterface({
    input:process.stdin,
    output:process.stdout
})


userInterface.prompt();
userInterface.on("line",async input=>{
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const imageParts = [
        fileToGenerativePart("blood.png", "image/png"),//16 
      ];
      const result = await model.generateContentStream([input, ...imageParts]);
      let text = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;
      }
})
