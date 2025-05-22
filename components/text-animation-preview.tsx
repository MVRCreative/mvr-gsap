import TextSplitter from "./text-splitter"

interface TextAnimationPreviewProps {
  id: string
  name: string
}

export default function TextAnimationPreview({ id, name }: TextAnimationPreviewProps) {
  // Sample texts for different animation types
  const sampleTexts = {
    "text-fade": "This text will fade in smoothly.",
    "text-chars": "Each character reveals one by one.",
    "text-words": "Each word reveals one by one.",
    "text-scramble": "Text scrambles into place.",
    "text-slide": "This text slides into view.",
    "text-wave": "Wave effect animation.",
  }

  const text = sampleTexts[id as keyof typeof sampleTexts] || "Text animation preview"

  return (
    <div className="w-full max-w-md p-4">
      <h3 className="text-xl font-medium mb-6">Text Animation Preview</h3>

      {id === "text-fade" && (
        <p data-gsap={id} className="text-lg">
          {text}
        </p>
      )}

      {id === "text-chars" && (
        <TextSplitter text={text} type="chars" className="text-lg" elementType="p" data-gsap={id} />
      )}

      {id === "text-words" && (
        <TextSplitter text={text} type="words" className="text-lg" elementType="p" data-gsap={id} />
      )}

      {id === "text-scramble" && (
        <p data-gsap={id} className="text-lg font-mono">
          {text}
        </p>
      )}

      {id === "text-slide" && (
        <div className="overflow-hidden">
          <p data-gsap={id} className="text-lg">
            {text}
          </p>
        </div>
      )}

      {id === "text-wave" && (
        <TextSplitter text={text} type="chars" className="text-lg" elementType="p" data-gsap={id} />
      )}
    </div>
  )
}
