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

import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDropzone } from "react-dropzone"

import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const NEURO_DISEASES = ["alzheimer", "parkinson", "huntington", "als"] as const

type NeuroDisease = (typeof NEURO_DISEASES)[number]

type UploadContextType = {
  type: NeuroDisease
  files: File[]
  setFiles: Dispatch<React.SetStateAction<File[]>>
  setType: Dispatch<React.SetStateAction<NeuroDisease>>
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
  const [type, setType] = useState<NeuroDisease>(NEURO_DISEASES[0])

  return (
    <UploadContext.Provider value={{ files, setFiles, type, setType }}>
      {children}
    </UploadContext.Provider>
  )
}

const UploadFormSchema = z.object({
  name: z.string(),
  age: z.coerce.number().int(),
  history: z.string(),
  scans: z.array(z.instanceof(File)),
  neurodegenerativeDisease: z.enum(NEURO_DISEASES),
})

export function UploadForm() {
  const { files, setFiles, type, setType } = useUpload()

  const uploadRef = useRef(null)

  const dropzoneProps = useDropzone({
    multiple: true,
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
      "application/pdf": [],
    },
    onDrop: (accepted, rejected, e) => {
      console.log({
        accepted,
        rejected,
      })
    },
    onDropAccepted: (files, e) => {
      setFiles((prev) => [...prev, ...files])
    },
  })

  const form = useForm({
    resolver: zodResolver(UploadFormSchema),
    defaultValues: {
      name: "",
      age: "",
      history: "",
      scans: [],
      neurodegenerativeDisease: "alzheimer",
    },
  })

  function onSubmit(data: z.infer<typeof UploadFormSchema>) {
    console.log(data)
  }

  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>Upload</CardTitle>
        <CardDescription>
          Upload MRI/CT scans and enter patient information.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          // fix this later
          // @ts-ignore
          onSubmit={form.handleSubmit(onSubmit, (err) => {
            console.log(err)
          })}
        >
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="neurodegenerativeDisease"
              render={({ field }) => (
                <div className="grid gap-4">
                  <FormItem>
                    <FormLabel className="text-sm">
                      Neurodegenerative disease
                    </FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e)
                        setType(e as NeuroDisease)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select disease" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={NEURO_DISEASES[0]}>
                            Alzheimer&apos;s
                          </SelectItem>
                          <SelectItem value={NEURO_DISEASES[1]}>
                            Parkinson&apos;s
                          </SelectItem>
                          <SelectItem value={NEURO_DISEASES[2]}>
                            Huntington&apos;s
                          </SelectItem>
                          <SelectItem value="als">ALS</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="scans"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-2">
                    <FormLabel className="text-sm" htmlFor="scans">
                      Select file
                    </FormLabel>
                    <small className="text-sm text-gray-500 dark:text-gray-400">
                      Accepted file types: .jpg, .png, .pdf, .docx
                    </small>
                  </div>
                  <div className="contents">
                    <FormControl {...dropzoneProps.getRootProps()}>
                      <Input
                        {...dropzoneProps.getInputProps({
                          style: {},
                          id: "scans",
                          onChange: (e) => {
                            field.onChange(Array.from(e.target.files || []))
                          },
                        })}
                        className="cursor-pointer"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-2">
                    <FormLabel className="text-sm" htmlFor="name">
                      Patient name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Enter patient name"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-2">
                    <FormLabel className="text-sm" htmlFor="age">
                      Patient age
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="age"
                        placeholder="Enter patient age"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="history"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-2">
                    <FormLabel className="text-sm" htmlFor="history">
                      Medical history
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[100px]"
                        id="history"
                        placeholder="Enter patient medical history"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Upload</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
