"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.75])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <header
        className={`text-white body-font sticky top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-slate-950/95 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10 border-b border-cyan-500/20" : "bg-gradient-to-r from-slate-950/80 via-slate-900/80 to-slate-950/80 backdrop-blur-xl border-b border-slate-700/30"
        }`}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-cyan-500/10 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Glowing top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

        <div className="container mx-auto relative">
          {/* Logo Container - Overflowing from top-left */}
          <motion.div className="absolute left-6 md:left-8 -top-3 z-50" style={{ scale: logoScale }} initial={{ opacity: 0, x: -50, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.8, type: "spring", stiffness: 100 }}>
            <Link href="/" className="relative group block">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 scale-150" />

              {/* Rotating ring */}
              <motion.div className="absolute -inset-4 border-2 border-cyan-400/30 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />

              {/* Logo with gradient border */}
              <div className="relative bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-500 p-1 rounded-full">
                <div className="bg-slate-950 rounded-full p-2">
                  <motion.img src="/logo.png" alt="Concreate Club Logo" className="h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 object-contain" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.8, type: "spring" }} />
                </div>
              </div>

              {/* Floating particles around logo */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                  animate={{
                    x: [0, Math.cos((i * Math.PI) / 2) * 30, 0],
                    y: [0, Math.sin((i * Math.PI) / 2) * 30, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                />
              ))}
            </Link>
          </motion.div>

          {/* Main Content - Standard height navbar */}
          <div className="flex items-center justify-between py-4 px-6 pl-32 md:pl-40 lg:pl-44">
            {/* Left: Club Name */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
              <Link href="/" className="relative group">
                <motion.h1
                  className="spicy-rice-regular text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent relative"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Concreate Club
                </motion.h1>

                {/* Glowing underline on hover */}
                <motion.div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>

            {/* Right: Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { href: "/", label: "Home" },
                { href: "/recentActivities", label: "Events" },
                { href: "/achievements", label: "Achievements" },
                { href: "/projects", label: "Projects" },
                { href: "/team", label: "Team" },
                { href: "/message-us", label: "Contact" },
              ].map((link, index) => {
                const isActive = pathname === link.href
                return (
                  <motion.div key={link.href} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index, duration: 0.3 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={link.href}
                      className={`relative group flex items-center px-3 lg:px-4 py-2 rounded-xl font-medium text-sm lg:text-base transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-sky-500/30 to-blue-500/30 text-cyan-300 border border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                          : "text-slate-300 hover:text-cyan-300 hover:bg-gradient-to-r hover:from-sky-500/10 hover:to-blue-500/10 border border-transparent hover:border-sky-400/30"
                      }`}
                    >
                      {/* Label */}
                      <span className="relative z-10">{link.label}</span>

                      {/* Active indicator */}
                      {isActive && <motion.div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-blue-500/20 rounded-xl blur" layoutId="activeNav" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}

                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-400/0 via-cyan-400/10 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Bottom glow on hover */}
                      <motion.div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-sky-400 to-blue-500 rounded-full group-hover:w-3/4 transition-all duration-300" />
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Mobile Menu Toggle */}
            <motion.button className="md:hidden relative p-2 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-sky-400/30 hover:border-sky-400 transition-all duration-300" onClick={() => setMenuOpen(!menuOpen)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-cyan-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Navigation Menu */}
          <motion.nav className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? "max-h-screen opacity-100 pb-4" : "max-h-0 opacity-0"}`}>
            <div className="flex flex-col gap-2 px-6">
              {[
                { href: "/", label: "Home" },
                { href: "/recentActivities", label: "Events" },
                { href: "/achievements", label: "Achievements" },
                { href: "/projects", label: "Projects" },
                { href: "/team", label: "Team" },
                { href: "/message-us", label: "Contact" },
              ].map((link, index) => {
                const isActive = pathname === link.href
                return (
                  <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -20 }} transition={{ delay: 0.05 * index, duration: 0.3 }}>
                    <Link
                      href={link.href}
                      className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 block ${
                        isActive
                          ? "bg-gradient-to-r from-sky-500/30 to-blue-500/30 text-cyan-300 border border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                          : "text-slate-300 hover:text-cyan-300 hover:bg-gradient-to-r hover:from-sky-500/10 hover:to-blue-500/10 border border-transparent hover:border-sky-400/30"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.nav>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </header>
    </motion.div>
  )
}

export default Navbar
