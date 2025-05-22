"use client"

import { useState } from "react"
import Sidebar from "./sidebar"
import AnimationPreview from "./animation-preview"

// Animation examples
const animations: { id: string; name: string; type: "element" | "text" }[] = [
  { id: "scrolltrigger", name: "ScrollTrigger", type: "element" },
  { id: "scrollsmoother", name: "ScrollSmoother", type: "element" },
  { id: "splittext", name: "SplitText", type: "text" },
  { id: "scrambletext", name: "ScrambleText", type: "text" },
  { id: "textplugin", name: "TextPlugin", type: "text" },
]

export default function AnimationPlayground() {
  const [activeAnimation, setActiveAnimation] = useState(animations[0].id)

  return (
    <div className="flex min-h-screen">
      <Sidebar animations={animations} activeAnimation={activeAnimation} setActiveAnimation={setActiveAnimation} />
      <div className="flex-1 overflow-y-auto">
        {animations.map((animation) => (
          <AnimationPreview key={animation.id} id={animation.id} name={animation.name} type={animation.type} />
        ))}
      </div>
    </div>
  )
}
