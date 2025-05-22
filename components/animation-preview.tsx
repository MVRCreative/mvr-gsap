import TextAnimationPreview from "./text-animation-preview"
import AnimationControls from "./animation-controls"

interface AnimationPreviewProps {
  id: string
  name: string
  type?: "element" | "text"
}

export default function AnimationPreview({ id, name, type = "element" }: AnimationPreviewProps) {
  return (
    <section id={id} className="min-h-screen pt-16 px-8 ml-[250px]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">{name}</h2>

        <div className="mb-8">
          {type === "element" ? (
            <div
              data-gsap={id}
              className="w-full max-w-md h-64 border border-[#333333]/30 rounded-lg flex items-center justify-center"
            >
              <p className="text-xl">{name} Box</p>
            </div>
          ) : (
            <TextAnimationPreview id={id} name={name} />
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Animation Details</h3>
          <p className="text-[#aaa] mb-2">
            Type: <span className="text-[#e6e6e6]">{id}</span>
          </p>
          <p className="text-[#aaa]">
            Attribute: <code className="bg-[#252525] px-2 py-1 rounded text-[#e6e6e6]">data-gsap="{id}"</code>
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

          <AnimationControls type={type} />
        </div>
      </div>
    </section>
  )
}
