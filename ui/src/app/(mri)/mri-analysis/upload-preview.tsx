import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { FileIcon } from "lucide-react"
import { useUpload } from "./upload-form"

export function UploadPreview() {
  const { files, setFiles } = useUpload()

  return (
    <div className="size-full">
      <Card>
        <CardHeader>
          <CardTitle>Analysis</CardTitle>
          <CardDescription>
            Scan analysis and probability estimation.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-muted">
            Upload a scan to analyze the probability of a Neurodegenerative
            disease
          </p>
          {/* {files.map((file, i) => (
            <UploadedActions
              key={i}
              file={file}
              onRemove={() =>
                setFiles((prev) => prev.filter((f) => f !== file))
              }
            /> */}
        </CardContent>
        <CardFooter>
          {/* <Button size="sm" disabled={files.length === 0}>
            Analyze
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  )
}

function UploadedActions({
  file,
  onRemove,
}: {
  file: File
  onRemove: () => void
}) {
  return (
    <div className="flex items-center gap-4">
      <FileIcon className="w-8 h-8" />
      <div className="flex-1">
        <div className="font-semibold">{file.name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {file.lastModified}
        </div>
      </div>
      <Button variant={"ghost"} onClick={onRemove}>
        Remove
      </Button>
    </div>
  )
}
