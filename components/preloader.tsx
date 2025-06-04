"use client"

import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => setIsLoading(false), 2000)
                    return 100
                }
                return prev + Math.random() * 15 + 5
            })
        }, 150)

        return () => clearInterval(interval)
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-pearl dark:bg-dark-pearl flex flex-col items-center justify-center min-h-screen"
                >
                    {/* Main Logo Animation */}
                    <div className="relative mb-8 flex items-center justify-center">
                        {/* Outer Ring */}
                        <motion.div
                            initial={{ scale: 0, rotate: 0 }}
                            animate={{ scale: 1, rotate: 360 }}
                            transition={{
                                scale: { duration: 1, ease: "easeOut" },
                                rotate: { duration: 2, ease: "linear", repeat: Number.POSITIVE_INFINITY },
                            }}
                            className="w-24 h-24 border-2 border-salmon/30 dark:border-dark-salmon/30 rounded-full absolute"
                        />

                        {/* Inner Ring */}
                        <motion.div
                            initial={{ scale: 0, rotate: 0 }}
                            animate={{ scale: 1, rotate: -360 }}
                            transition={{
                                scale: { duration: 1, delay: 0.2, ease: "easeOut" },
                                rotate: { duration: 3, ease: "linear", repeat: Number.POSITIVE_INFINITY },
                            }}
                            className="w-16 h-16 border-2 border-sandstone/50 dark:border-dark-sandstone/50 rounded-full absolute"
                        />

                        {/* Center Circle with Initials */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                            className="w-12 h-12 bg-salmon dark:bg-dark-salmon rounded-full flex items-center justify-center"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="text-white font-bold text-lg"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                JP
                            </motion.span>
                        </motion.div>
                    </div>

                    {/* Name Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="text-center mb-6"
                    >
                        <motion.h1
                            className="text-3xl font-light text-pewter dark:text-dark-pewter mb-2"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            {"Júlia Penido".split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 1.2 + index * 0.05,
                                        ease: "easeOut",
                                    }}
                                    className="inline-block"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.8 }}
                            className="text-olive-slate dark:text-dark-olive-slate"
                        >
                            Psicóloga Clínica
                        </motion.p>
                    </motion.div>

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "200px" }}
                        transition={{ duration: 0.8, delay: 2 }}
                        className="relative h-1 bg-sandstone/30 dark:bg-dark-sandstone/30 rounded-full overflow-hidden mx-auto"
                    >
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-salmon to-sandstone dark:from-dark-salmon dark:to-dark-sandstone rounded-full"
                        />
                    </motion.div>

                    {/* Loading Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 2.2 }}
                        className="mt-4 text-center"
                    >
                        <motion.p
                            className="text-sm text-pewter/60 dark:text-dark-pewter/60"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                            Carregando...
                        </motion.p>
                    </motion.div>

                    {/* Floating Particles */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                x: [0, Math.random() * 200 - 100],
                                y: [0, Math.random() * 200 - 100],
                            }}
                            transition={{
                                duration: 3,
                                delay: 2.5 + i * 0.2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 1,
                            }}
                            className="absolute w-2 h-2 bg-salmon/40 dark:bg-dark-salmon/40 rounded-full"
                            style={{
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
