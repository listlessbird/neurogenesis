"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import z from "zod"

import { useDropzone } from "react-dropzone"
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

type UploadContextType = {
  files: File[]
  setFiles: Dispatch<React.SetStateAction<File[]>>
}

const UploadContext = createContext<UploadContextType | null>(null)

export function useUpload() {
  const ctx = useContext(UploadContext)
  if (!ctx) {
    throw new Error("useUpload must be used within an UploadProvider")
  }
  return ctx
}

export function UploadProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<File[]>([])

  return (
    <UploadContext.Provider value={{ files, setFiles }}>
      {children}
    </UploadContext.Provider>
  )
}

const UploadFormSchema = z.object({
  name: z.string(),
  age: z.number(),
  history: z.string(),
  scans: z.array(z.instanceof(File)),
})

export function UploadForm() {
  const { files, setFiles } = useUpload()

  const uploadRef = useRef(null)

  const dropzoneProps = useDropzone({
    multiple: true,
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
      "application/pdf": [],
    },
    // onDrop: (accepted, rejected, e) => {
    //   console.log({
    //     accepted,
    //     rejected,
    //   })
    // },
    onDropAccepted: (files, e) => {
      setFiles((prev) => [...prev, ...files])
    },
  })

  // useEffect(
  //   function syncFiles() {
  //     console.log("sync!!")
  //     if (!uploadRef.current) return
  //     const input = uploadRef.current as HTMLInputElement
  //     const filesInInput = input.files
  //     if (!filesInInput) return
  //     filesInInput.
  //   },
  //   [files]
  // )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload</CardTitle>
        <CardDescription>
          Upload MRI/CT scans and enter patient information.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-sm" htmlFor="scans">
            Select file
          </Label>
          <small className="text-sm text-gray-500 dark:text-gray-400">
            Accepted file types: .jpg, .png, .pdf, .docx
          </small>
        </div>
        <div className="contents" {...dropzoneProps.getRootProps()}>
          <Input
            {...dropzoneProps.getInputProps({
              style: {},
              ref: uploadRef,
            })}
            className="cursor-pointer"
            id="scans"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm" htmlFor="name">
            Patient name
          </Label>
          <Input id="name" placeholder="Enter patient name" />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm" htmlFor="age">
            Patient age
          </Label>
          <Input id="age" placeholder="Enter patient age" type="number" />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm" htmlFor="history">
            Medical history
          </Label>
          <Textarea
            className="min-h-[100px]"
            id="history"
            placeholder="Enter patient medical history"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto">Upload</Button>
      </CardFooter>
    </Card>
  )
}
