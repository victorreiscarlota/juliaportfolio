"use client"
import type React from "react"
import { motion } from "motion/react"

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
}

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void
  active: string | null
  item: string
  children?: React.ReactNode
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-pewter hover:text-salmon dark:text-dark-pewter dark:hover:text-dark-salmon font-light transition-colors duration-300"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-pearl dark:bg-dark-pearl backdrop-blur-sm rounded-2xl overflow-hidden border border-sandstone dark:border-dark-sandstone shadow-xl transition-all duration-300"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void
  children: React.ReactNode
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-sandstone dark:border-dark-sandstone bg-pearl/95 dark:bg-dark-pearl/95 backdrop-blur-sm shadow-lg flex justify-center space-x-6 px-8 py-4 transition-all duration-300"
    >
      {children}
    </nav>
  )
}

export const HoveredLink = ({ children, href, ...rest }: any) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <a
      {...rest}
      href={href}
      onClick={handleClick}
      className="text-pewter hover:text-salmon dark:text-dark-pewter dark:hover:text-dark-salmon transition-colors duration-300 block py-2 px-4 rounded-lg hover:bg-sandstone/20 dark:hover:bg-dark-sandstone/20"
    >
      {children}
    </a>
  )
}
