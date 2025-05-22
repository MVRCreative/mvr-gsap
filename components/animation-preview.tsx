import { useRef, useState, useEffect } from "react"
import { gsap, ScrambleTextPlugin, ScrollTrigger, ScrollSmoother, SplitText, TextPlugin } from "@/lib/gsap/plugins"
import AnimationControls from "./animation-controls"
import { copyToClipboard } from "@/lib/clipboard"

interface AnimationPreviewProps {
  id: string
  name: string
  type?: "element" | "text"
}

export default function AnimationPreview({ id, name, type = "element" }: AnimationPreviewProps) {
  const [duration, setDuration] = useState(1)
  const [delay, setDelay] = useState(0)
  const [ease, setEase] = useState("power2.out")
  const [copied, setCopied] = useState(false)
  const previewRef = useRef<HTMLParagraphElement>(null)

  // Animation logic for each plugin
  const playAnimation = () => {
    if (!previewRef.current) return
    gsap.killTweensOf(previewRef.current)

    if (id === "scrolltrigger") {
      gsap.fromTo(
        previewRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: previewRef.current,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        }
      )
    } else if (id === "scrollsmoother") {
      // ScrollSmoother is a layout-wide effect, so show a demo fade-in
      gsap.fromTo(
        previewRef.current,
        { opacity: 0, x: -80 },
        { opacity: 1, x: 0, duration, delay, ease }
      )
    } else if (id === "splittext") {
      // Animate each word using SplitText
      if (previewRef.current) {
        const split = new SplitText(previewRef.current, { type: "words,chars" })
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease,
            stagger: 0.04,
            onComplete: () => split.revert(),
          }
        )
      }
    } else if (id === "scrambletext") {
      // Scramble text effect
      gsap.fromTo(
        previewRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration * 0.5,
          delay,
          ease,
          onStart: () => {
            gsap.to(previewRef.current, {
              scrambleText: {
                text: "The fox jumped over the wall",
                chars: "upperAndLowerCase",
                revealDelay: 0.2,
                speed: 0.5,
              },
              duration,
              ease,
            })
          },
        }
      )
    } else if (id === "textplugin") {
      // Typewriter/text update effect
      gsap.fromTo(
        previewRef.current,
        { text: "" },
        {
          text: "The fox jumped over the wall",
          duration,
          delay,
          ease,
        }
      )
    } else {
      // Fallback: simple fade/slide
      gsap.fromTo(
        previewRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration, delay, ease }
      )
    }
  }

  // Animate on slider/toggle change
  const handleDuration = (v: number) => {
    setDuration(v)
    playAnimation()
  }
  const handleDelay = (v: number) => {
    setDelay(v)
    playAnimation()
  }
  const handleEase = (v: string) => {
    setEase(v)
    playAnimation()
  }

  // Play on first mount
  useEffect(() => {
    playAnimation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Copy attribute
  const attributeString = `data-gsap=\"${id}\"`
  const handleCopy = () => {
    copyToClipboard(`data-gsap="${id}"`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <section id={id} className="min-h-screen pt-16 px-8 ml-[250px]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">{name}</h2>

        <div className="mb-8">
          <section id={id} data-gsap={id} className="w-full max-w-md h-64 border border-[#333333]/30 rounded-lg flex items-center justify-center">
            <p ref={previewRef} className="text-xl font-semibold">The fox jumped over the wall</p>
          </section>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Animation Details</h3>
          <p className="text-[#aaa] mb-2">
            Type: <span className="text-[#e6e6e6]">{id}</span>
          </p>
          <p className="text-[#aaa] flex items-center gap-2">
            Attribute: <code className="bg-[#252525] px-2 py-1 rounded text-[#e6e6e6]">data-gsap="{id}"</code>
            <button
              type="button"
              onClick={handleCopy}
              className="ml-2 px-2 py-1 text-xs bg-[#222] rounded text-[#e6e6e6] border border-[#333] hover:bg-[#333]"
              aria-label="Copy attribute"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </p>

          {type === "text" && (
            <div className="mt-4 pt-4">
              <h4 className="text-md font-medium mb-2">GSAP Text Animation</h4>
              <p className="text-[#aaa] text-sm mb-2">
                Text animations typically require special setup in GSAP to handle characters or words.
              </p>
              <p className="text-[#aaa] text-sm">
                The preview above has the necessary HTML structure for implementing {name.toLowerCase()} with GSAP.
              </p>
            </div>
          )}

          <AnimationControls
            type={type}
            duration={duration}
            delay={delay}
            ease={ease}
            onDurationChange={handleDuration}
            onDelayChange={handleDelay}
            onEaseChange={handleEase}
            onPlay={playAnimation}
          />
        </div>
      </div>
    </section>
  )
}
