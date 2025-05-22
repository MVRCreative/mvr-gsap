"use client"

interface TextSplitterProps {
  text: string
  type: "chars" | "words"
  className?: string
  elementType?: "div" | "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  charClassName?: string
  wordClassName?: string
}

export default function TextSplitter({
  text,
  type,
  className = "",
  elementType = "div",
  charClassName = "inline-block",
  wordClassName = "inline-block mr-1",
}: TextSplitterProps) {
  const Element = elementType as keyof JSX.IntrinsicElements

  if (type === "chars") {
    const characters = text.split("")

    return (
      <Element className={className}>
        {characters.map((char, index) => (
          <span key={index} className={charClassName}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Element>
    )
  }

  if (type === "words") {
    const words = text.split(" ")

    return (
      <Element className={className}>
        {words.map((word, index) => (
          <span key={index} className={wordClassName}>
            {word}
          </span>
        ))}
      </Element>
    )
  }

  return <Element className={className}>{text}</Element>
}
