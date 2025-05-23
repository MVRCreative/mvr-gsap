export function copyToClipboard(text: string) {
  if (typeof window !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(text)
  } else {
    // fallback for older browsers
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.setAttribute("readonly", "")
    textarea.style.position = "absolute"
    textarea.style.left = "-9999px"
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
  }
}
