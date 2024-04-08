"use client"
import useVanta from "@/hooks/useVanta"
import { useState } from "react"
// @ts-ignore
import NET from "@listlessbird/vanta/dist/vanta.net.min.js"
import Script from "next/script"

export default function VantaDots({
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [loaded, setLoaded] = useState(false)

  const opts = {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    size: 3.5,
    showLines: false,
    color: 0xa0a75,
    backgroundColor: 0x70709,
  }
  const { vantaRef } = useVanta({
    effect: NET,
    opts,
    start: () => loaded,
  })

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          // log in different color
          console.log(
            `%c THREE.js loaded, ${(window as any).THREE}`,
            "color: #00ff88"
          )

          setLoaded(true)
        }}
      />

      <div id="dots" {...props} ref={vantaRef}></div>
    </>
  )
}
