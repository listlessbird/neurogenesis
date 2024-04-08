import { useEffect, useRef, useState } from "react"
import { useScript } from "./useExternalScript"

export default function useVanta({
  // No type declarations for vanta.js
  // @ts-ignore
  effect,
  script,
  opts,
  start,
}: {
  effect: any
  opts?: any
  script?: string
  start: () => boolean
}) {
  // const status = useScript(script || "", {
  //   removeOnUnmount: true,
  // })

  const [vantaEffect, setVantaEffect] = useState<any>(0)

  const vantaRef = useRef(null)

  useEffect(() => {
    if (!vantaEffect && start()) {
      console.log(`Starting Vanta.js effect...`)
      // console.log(`${script} is ${status}`)

      console.log({
        opts,
      })

      opts.el = vantaRef.current
      opts.THREE = (window as any).THREE

      setVantaEffect(effect(opts))
    } else {
      console.log({ vantaEffect })
    }
    return () => {
      if (vantaEffect) vantaEffect?.destroy()
    }
  }, [vantaEffect, effect, opts, start])

  return {
    vantaRef,
  }
}
