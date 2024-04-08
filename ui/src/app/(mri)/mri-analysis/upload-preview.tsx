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
import { PredictedResults, useUpload } from "./upload-form"
import { memo } from "react"
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GetAIAnalysis } from "./ai-result-parse"

export function UploadPreview() {
  const { files, setFiles, type, hasSubmitted, setHasSubmitted, results } =
    useUpload()

  console.log(type)

  const About = memo(function AboutText() {
    let text = ""

    switch (type) {
      case "alzheimer":
        text =
          "Alzheimer's disease is a progressive disorder that causes brain cells to waste away (degenerate) and die. Alzheimer's disease is the most common cause of dementia — a continuous decline in thinking, behavioral and social skills that disrupts a person's ability to function independently."
        break

      case "parkinson":
        text =
          "Parkinson's disease is a progressive nervous system disorder that affects movement. Symptoms start gradually, sometimes starting with a barely noticeable tremor in just one hand. Tremors are common, but the disorder also commonly causes stiffness or slowing of movement."
        break

      // case "huntington":
      //   text =
      //     "Huntington's disease is an inherited disease that causes the progressive breakdown (degeneration) of nerve cells in the brain. Huntington's disease has a broad impact on a person's functional abilities and usually results in movement, thinking (cognitive) and psychiatric disorders."
      //   break

      // case "als":
      //   text =
      //     "Amyotrophic lateral sclerosis (ALS) is a group of rare neurological diseases that mainly involve the nerve cells (neurons) responsible for controlling voluntary muscle movement. Voluntary muscles produce movements like chewing, walking, and talking. The disease is progressive, meaning the symptoms get worse over time."
      //   break
    }

    const MethodOfAnalysis = memo(function Method() {
      const parkinson = (
        <div>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            <strong className="text-lg font-semibold">
              Upload an image of a handwriting sample to analyze the probability
              of Parkinson&apos;s disease.
            </strong>
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Parkinson&apos;s disease presents movement symptoms like tremor,
            rigidity, bradykinesia, and postural instability. Early stages often
            show bradykinesia and rigidity, impacting handwriting and sketching
            abilities. Micrographia is utilized for early diagnosis. Sketching,
            particularly of a spiral shape, has emerged as a non-invasive
            measure for PD. Digital devices now offer potential for
            machine-based assessment of handwriting and sketching, enabling
            real-time analysis. This could aid in rapid online assessment and
            potential applications in biometrics and PD markers.
          </p>
          <div className="flex justify-center">
            <Image
              alt="Image of a person's handwriting with Parkinson's disease"
              src={"/inputs/parkinson.png"}
              width={500}
              height={500}
            />
          </div>
        </div>
      )

      const alzheimer = (
        <div className="space-y-2">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            <strong className="text-lg font-semibold">
              Upload an image of a MRI scan to analyze the probability of
              Alzheimer&apos;s disease.
            </strong>
          </p>
          <div className="flex justify-center">
            <Image
              alt="Image of a brain scan with Alzheimer's disease"
              src={"/inputs/alzheimer.png"}
              width={500}
              height={500}
            />
          </div>
        </div>
      )

      return (
        <div>
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Method of Analysis
          </h3>
          {type === "alzheimer" && alzheimer}
          {type === "parkinson" && parkinson}
        </div>
      )
    })

    return (
      <div className="space-y-3">
        <div>
          {/* <h2 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight capitalize">
          {type}
        </h2> */}
          <p className="leading-7 [&:not(:first-child)]:mt-6">{text}</p>
        </div>
        <div className="space-y-2">{type && <MethodOfAnalysis />}</div>
      </div>
    )
  })

  return (
    <div className="size-full flex flex-col gap-3">
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 capitalize">
              {type}
            </CardTitle>
            <CardDescription>
              Scan analysis and probability estimation for{" "}
              <span className="capitalize">{type}</span>.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <About />
            {/* <p className="text-muted">
            Upload a scan to analyze the probability of a Neurodegenerative
            disease
          </p> */}
          </CardContent>
          <CardFooter>
            {/* <Button size="sm" disabled={files.length === 0}>
            Analyze
          </Button> */}
          </CardFooter>
        </Card>
      </div>
      <div className="result-wrapper">
        <Card>
          <CardHeader>
            <CardTitle className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 capitalize">
              Results
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              {!hasSubmitted && (
                <p>
                  Predicted results will show up here once you submit the scan.
                </p>
              )}
              {hasSubmitted && results.length === 0 && (
                <div className="flex">
                  <p>
                    Hang tight! while we analyze the scan and provide you with
                    the results...
                  </p>
                </div>
              )}
              {results.length > 0 && (
                <div>
                  <ResultTable results={results} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="ai-analysis-card">
        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 capitalize">
                AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <GetAIAnalysis results={results} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function ResultTable({ results }: { results: PredictedResults[] }) {
  return (
    <Table>
      <TableCaption>Results</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Label</TableHead>
          <TableHead>Probability</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result) => (
          <TableRow key={result.label}>
            <TableCell className="font-medium">{result.label}</TableCell>
            <TableCell className="text-right">
              {result.score * 100 + "%"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
