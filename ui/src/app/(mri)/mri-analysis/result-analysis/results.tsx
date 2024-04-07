import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMemo } from "react"
import Dropzone, { useDropzone } from "react-dropzone"

const baseStyle = {
  height: "185px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "rgb(3 7 68/ var(--tw-bg-opacity))",
  borderStyle: "dashed",
  backgroundColor: "rgb(3 7 18/ var(--tw-bg-opacity))",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
}

const focusedStyle = {
  borderColor: "#2196f3",
}

const acceptStyle = {
  borderColor: "#00e676",
}

const rejectStyle = {
  borderColor: "#ff1744",
}

export function ResultAnalysis() {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ accept: { "image/*": [] } })
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <div className="bg-white dark:bg-gray-950 dark:text-gray-50 w-full shadow-sm">
      <div className="container mx-auto">
        <div className="container mx-auto space-y-3 p-4 flex flex-col">
          <div>
            <p>Upload a medical scan or result to understand it better.</p>

            <form>
              <div className="w-fit">
                <Label htmlFor="name">Identifier</Label>
                <Input id="name" placeholder="Enter Identifier" />
              </div>
            </form>
          </div>

          <div>
            <section>
              <div
                {...getRootProps({
                  // @ts-ignore
                  style: { ...style },
                })}
                className="w-full h-full flex items-center justify-center"
              >
                <input {...getInputProps()} />
                <p>
                  Drag &apos;n&apos; drop some files here, or click to select
                  files
                </p>
              </div>
            </section>
          </div>

          {acceptedFiles.length > 0 && (
            <div className="bg-green-500 bg-opacity-5 p-2 rounded-lg">
              <h2>Attachments: </h2>
              <ul>
                {acceptedFiles.map((file) => (
                  <li key={file.name}>
                    {file.name} - {file.size} bytes
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="self-center">
            <Button>Get Analysis</Button>
          </div>
        </div>
        <div>
          <h1>Results:</h1>

          <div>
            <p>Results will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
