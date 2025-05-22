"use client"

import { useState } from "react"
import Sidebar from "./sidebar"
import AnimationPreview from "./animation-preview"

// Animation examples
const animations = [
  // Element animations
  { id: "fade-up", name: "Fade Up", type: "element" },
  { id: "fade-down", name: "Fade Down", type: "element" },
  { id: "slide-left", name: "Slide Left", type: "element" },
  { id: "slide-right", name: "Slide Right", type: "element" },
  { id: "zoom-in", name: "Zoom In", type: "element" },
  { id: "zoom-out", name: "Zoom Out", type: "element" },
  { id: "flip", name: "Flip", type: "element" },
  { id: "bounce", name: "Bounce", type: "element" },
  { id: "rotate", name: "Rotate", type: "element" },
  // Text animations
  { id: "text-fade", name: "Text Fade", type: "text" },
  { id: "text-chars", name: "Character Reveal", type: "text" },
  { id: "text-words", name: "Word Reveal", type: "text" },
  { id: "text-scramble", name: "Text Scramble", type: "text" },
  { id: "text-slide", name: "Text Slide", type: "text" },
  { id: "text-wave", name: "Text Wave", type: "text" },
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
