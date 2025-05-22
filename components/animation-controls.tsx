"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

interface AnimationControlsProps {
  type: "element" | "text"
  duration: number
  delay: number
  ease: string
  onDurationChange: (value: number) => void
  onDelayChange: (value: number) => void
  onEaseChange: (value: string) => void
  onPlay: () => void
}

export default function AnimationControls({ type, duration, delay, ease, onDurationChange, onDelayChange, onEaseChange, onPlay }: AnimationControlsProps) {

  const easeOptions = [
    "none",
    "power1.in",
    "power1.out",
    "power1.inOut",
    "power2.in",
    "power2.out",
    "power2.inOut",
    "power3.in",
    "power3.out",
    "power3.inOut",
    "power4.in",
    "power4.out",
    "power4.inOut",
    "back.in",
    "back.out",
    "back.inOut",
    "elastic.in",
    "elastic.out",
    "elastic.inOut",
    "bounce.in",
    "bounce.out",
    "bounce.inOut",
    "circ.in",
    "circ.out",
    "circ.inOut",
    "expo.in",
    "expo.out",
    "expo.inOut",
    "sine.in",
    "sine.out",
    "sine.inOut",
  ]

  return (
    <div className="mt-6 p-4 border-t border-[#333333]/30">
      <h4 className="text-md font-medium mb-4">Animation Controls</h4>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[#aaa] mb-2">Duration: {duration.toFixed(1)}s</label>
          <Slider value={[duration]} min={0.1} max={5} step={0.1} onValueChange={(value) => onDurationChange(value[0])} />
        </div>

        <div>
          <label className="block text-sm text-[#aaa] mb-2">Delay: {delay.toFixed(1)}s</label>
          <Slider value={[delay]} min={0} max={3} step={0.1} onValueChange={(value) => onDelayChange(value[0])} />
        </div>

        <div>
          <label className="block text-sm text-[#aaa] mb-2">Easing</label>
          <select
            value={ease}
            onChange={(e) => onEaseChange(e.target.value)}
            className="w-full bg-[#0c0c0c] border border-[#333333]/30 rounded-md px-3 py-2 text-sm"
          >
            {easeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {type === "text" && (
          <div>
            <label className="block text-sm text-[#aaa] mb-2">Stagger: 0.05s</label>
            <Slider value={[0.05]} min={0.01} max={0.2} step={0.01} disabled />
          </div>
        )}

        <button
          className="w-full bg-[#1a1a1a] hover:bg-[#252525] text-white py-2 rounded-md transition-colors mt-2"
          onClick={onPlay}
        >
          Play Animation
        </button>
      </div>
    </div>
  )
}
