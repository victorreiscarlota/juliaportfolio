"use client"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import React from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

type LinkPreviewProps = {
  children: React.ReactNode
  url: string
  className?: string
  width?: number
  height?: number
  quality?: number
  layout?: string
} & ({ isStatic: true; imageSrc: string } | { isStatic?: false; imageSrc?: never })

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  const [isOpen, setOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  const [isTouchDevice, setIsTouchDevice] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  const springConfig = { stiffness: 100, damping: 15 }
  const x = useMotionValue(0)
  const translateX = useSpring(x, springConfig)

  const handleMouseMove = (event: any) => {
    if (isTouchDevice) return

    const targetRect = event.target.getBoundingClientRect()
    const eventOffsetX = event.clientX - targetRect.left
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2
    x.set(offsetFromCenter)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isTouchDevice) {
      e.preventDefault()
      setOpen(!isOpen)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTouchDevice) {
      e.preventDefault()
      setOpen(!isOpen)
    }
  }

  React.useEffect(() => {
    if (isTouchDevice && isOpen) {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        const target = event.target as Element
        if (!target.closest("[data-radix-hover-card-trigger]") && !target.closest("[data-radix-hover-card-content]")) {
          setOpen(false)
        }
      }

      document.addEventListener("click", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside)
      return () => {
        document.removeEventListener("click", handleClickOutside)
        document.removeEventListener("touchstart", handleClickOutside)
      }
    }
  }, [isTouchDevice, isOpen])

  return (
    <HoverCardPrimitive.Root
      open={isOpen}
      openDelay={isTouchDevice ? 0 : 50}
      closeDelay={isTouchDevice ? 0 : 100}
      onOpenChange={(open) => {
        if (!isTouchDevice) {
          setOpen(open)
        }
      }}
    >
      <HoverCardPrimitive.Trigger
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        className={cn(
          "text-salmon dark:text-dark-salmon font-medium border-b border-dashed border-salmon/40 dark:border-dark-salmon/40 hover:bg-salmon/10 dark:hover:bg-dark-salmon/10 px-0.5 py-0.5 rounded transition-all duration-300 cursor-pointer",
          className,
        )}
        asChild
      >
        <span className="inline">{children}</span>
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Content
        className="z-50 [transform-origin:var(--radix-hover-card-content-transform-origin)]"
        side="top"
        align="center"
        sideOffset={10}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              className="shadow-xl rounded-xl"
              style={{
                x: translateX,
              }}
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-1 bg-pearl dark:bg-dark-pearl border-2 border-sandstone dark:border-dark-sandstone shadow rounded-xl hover:border-salmon/30 dark:hover:border-dark-salmon/30 transition-colors duration-300"
              >
                <img
                  src={isStatic ? imageSrc : "/placeholder.svg?height=125&width=200"}
                  width={width}
                  height={height}
                  className="rounded-lg"
                  alt="preview image"
                />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  )
}
