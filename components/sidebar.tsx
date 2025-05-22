"use client"

interface Animation {
  id: string
  name: string
  type: "element" | "text"
}

interface SidebarProps {
  animations: Animation[]
  activeAnimation: string
  setActiveAnimation: (id: string) => void
}

export default function Sidebar({ animations, activeAnimation, setActiveAnimation }: SidebarProps) {
  const handleClick = (id: string) => {
    setActiveAnimation(id)

    // Smooth scroll to the element
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Group animations by type
  const elementAnimations = animations.filter((anim) => anim.type === "element")
  const textAnimations = animations.filter((anim) => anim.type === "text")

  return (
    <aside className="fixed top-0 left-0 w-[250px] h-screen border-r border-[#333333]/30 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-6">GSAP Animations</h1>
        <nav>
          <div className="mb-4">
            <h2 className="text-sm uppercase text-[#999] font-medium mb-2">Element Animations</h2>
            <ul className="space-y-1">
              {elementAnimations.map((animation) => (
                <li key={animation.id}>
                  <button
                    onClick={() => handleClick(animation.id)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors duration-200 ${
                      activeAnimation === animation.id ? "bg-[#333] text-white" : "hover:bg-[#252525]"
                    }`}
                  >
                    {animation.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm uppercase text-[#999] font-medium mb-2">Text Animations</h2>
            <ul className="space-y-1">
              {textAnimations.map((animation) => (
                <li key={animation.id}>
                  <button
                    onClick={() => handleClick(animation.id)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors duration-200 ${
                      activeAnimation === animation.id ? "bg-[#333] text-white" : "hover:bg-[#252525]"
                    }`}
                  >
                    {animation.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  )
}
