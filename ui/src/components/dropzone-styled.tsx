import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function DropzoneStyled() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center gap-2">
        <FileIcon className="w-12 h-12 text-gray-300" />
        <span className="text-sm text-gray-500">
          Drag and drop your files here
        </span>
        <Button size="sm" variant="outline">
          Select Files
          <Input
            className="absolute inset-0 opacity-0 w-full cursor-pointer"
            multiple
            type="file"
          />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-4">
          <img
            alt="Thumbnail"
            className="rounded"
            height="40"
            src="/placeholder.svg"
            style={{
              aspectRatio: "40/40",
              objectFit: "cover",
            }}
            width="40"
          />
          <div className="text-sm leading-none">
            <h3 className="font-medium">design-system-1.0.0.tgz</h3>
            <p className="text-sm text-gray-500">3.2mb</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img
            alt="Thumbnail"
            className="rounded"
            height="40"
            src="/placeholder.svg"
            style={{
              aspectRatio: "40/40",
              objectFit: "cover",
            }}
            width="40"
          />
          <div className="text-sm leading-none">
            <h3 className="font-medium">wireframe.pdf</h3>
            <p className="text-sm text-gray-500">5.1mb</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}
