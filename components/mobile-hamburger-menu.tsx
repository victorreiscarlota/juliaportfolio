"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { User, Briefcase, Calendar, ChevronDown } from "lucide-react"

interface MobileHamburgerMenuProps {
    items: {
        title: string
        href: string
        subitems?: { title: string; href: string }[]
    }[]
}

// Icon mapping for the menu items
const getIcon = (title: string) => {
    switch (title) {
        case "Sobre mim":
            return <User className="w-5 h-5" />
        case "Atuação":
            return <Briefcase className="w-5 h-5" />
        case "Atendimento":
            return <Calendar className="w-5 h-5" />
        default:
            return <User className="w-5 h-5" />
    }
}

export function MobileHamburgerMenu({ items }: MobileHamburgerMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState<string | null>(null)

    const toggleMenu = () => setIsOpen((prev) => !prev)
    const closeMenu = () => {
        setIsOpen(false)
        setActiveSection(null)
    }

    const toggleSection = (title: string) => {
        setActiveSection((prev) => (prev === title ? null : title))
    }

    const handleLinkClick = (href: string) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            closeMenu()
        }
    }

    // Close menu when clicking outside of both the button and the drawer
    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element
            // if click is NOT inside an element with class "mobile-menu-container" → close
            if (!target.closest(".mobile-menu-container")) {
                closeMenu()
            }
        }

        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [isOpen])

    return (
        <div className="md:hidden mobile-menu-container">
            {/* Animated Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="hamburger-button relative w-8 h-8 flex flex-col justify-center items-center focus:outline-none"
                aria-label="Menu"
            >
                <motion.span
                    animate={{
                        rotate: isOpen ? 45 : 0,
                        y: isOpen ? 8 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="block w-6 h-0.5 bg-pewter dark:bg-dark-pewter mb-1.5 origin-center"
                />
                <motion.span
                    animate={{
                        opacity: isOpen ? 0 : 1,
                        x: isOpen ? -10 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="block w-6 h-0.5 bg-pewter dark:bg-dark-pewter mb-1.5"
                />
                <motion.span
                    animate={{
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? -8 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="block w-6 h-0.5 bg-pewter dark:bg-dark-pewter origin-center"
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        />

                        {/* Drawer Menu */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 w-[85%] max-w-sm h-screen bg-pearl dark:bg-dark-pearl z-50 shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="px-6 py-6 text-center border-b border-sandstone/20 dark:border-dark-sandstone/20">
                                <h2
                                    className="text-2xl font-light text-pewter dark:text-dark-pewter"
                                    style={{ fontFamily: "Georgia, serif" }}
                                >
                                    Júlia Penido
                                </h2>
                                <p className="text-sm text-pewter/60 dark:text-dark-pewter/60 mt-1">
                                    Psicóloga Clínica
                                </p>
                            </div>

                            {/* Scrollable Menu Items */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                                {items.map((item) => (
                                    <div key={item.title} className="rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => toggleSection(item.title)}
                                            className="w-full flex items-center justify-between p-4 bg-pearl/80 dark:bg-dark-pearl/80 hover:bg-sandstone/10 dark:hover:bg-dark-sandstone/10 transition-colors duration-300"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-pewter dark:text-dark-pewter">
                                                    {getIcon(item.title)}
                                                </span>
                                                <span
                                                    className="text-lg font-medium text-pewter dark:text-dark-pewter"
                                                    style={{ fontFamily: "Georgia, serif" }}
                                                >
                                                    {item.title}
                                                </span>
                                            </div>
                                            <motion.div
                                                animate={{
                                                    rotate: activeSection === item.title ? 180 : 0,
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ChevronDown className="w-5 h-5 text-pewter/60 dark:text-dark-pewter/60" />
                                            </motion.div>
                                        </button>

                                        {/* Submenu */}
                                        <AnimatePresence>
                                            {activeSection === item.title && item.subitems && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    {/* ← Removed bg-sandstone/10 so it matches the drawer's background */}
                                                    <div className="pl-12 py-2 space-y-1">
                                                        {item.subitems.map((subitem) => (
                                                            <button
                                                                key={subitem.title}
                                                                onClick={() => handleLinkClick(subitem.href)}
                                                                className="block w-full text-left py-2 px-4 rounded-lg text-pewter/80 dark:text-dark-pewter/80 hover:bg-sandstone/20 dark:hover:bg-dark-sandstone/20 hover:text-salmon dark:hover:text-dark-salmon transition-all duration-300"
                                                            >
                                                                {subitem.title}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 border-t border-sandstone/20 dark:border-dark-sandstone/20 text-center">
                                <p className="text-sm text-pewter/60 dark:text-dark-pewter/60">
                                    CRP 06/123456
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
