"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <header className="text-white body-font bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/30 sticky top-0 z-50 shadow-lg shadow-black/10">
        <div className="container mx-auto flex flex-wrap py-3 px-6 items-center justify-between">
          {/* Flex container for mobile view, but separate handling for larger screens */}
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Left aligned logo */}
            <Link href="/" className="flex title-font font-medium items-center text-white group">
              <motion.img src="/logo.png" alt="Logo" className="h-10 w-auto md:h-12 transition-transform duration-300 group-hover:scale-105" whileHover={{ rotate: 3 }} />
            </Link>

            {/* Mobile centered title */}
            <motion.div
              className="spicy-rice-regular text-xl md:hidden font-bold absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Concreate Club
            </motion.div>

            {/* Right aligned toggle button for mobile */}
            <motion.button className="inline-flex items-center justify-center p-1.5 rounded-lg text-white md:hidden hover:text-sky-400 hover:bg-sky-400/10 transition-all duration-300" onClick={() => setMenuOpen(!menuOpen)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </motion.button>
          </div>

          {/* Desktop centered title */}
          <motion.div
            className="hidden md:block spicy-rice-regular text-2xl lg:text-3xl font-bold bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Concreate Club
          </motion.div>

          {/* Navigation Menu with transition (visible on larger screens, collapsible on mobile) */}
          <nav
            className={`${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} transition-all duration-500 ease-in-out md:transition-none md:opacity-100 md:max-h-full md:flex md:items-center md:ml-auto md:mr-auto text-sm lg:text-base font-medium overflow-hidden md:overflow-visible`}
            style={{ transitionProperty: "opacity, max-height" }}
          >
            {[
              { href: "/", label: "Home" },
              { href: "/recentActivities", label: "Recent Activities" },
              { href: "/achievements", label: "Achievements" },
              { href: "/team", label: "Team Members" },
              { href: "/message-us", label: "Contact Us" },
            ].map((link, index) => (
              <motion.div key={link.href} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.3 }}>
                <Link className={pathname === link.href ? "px-3 py-2 text-sky-400 relative rounded-lg bg-sky-400/10" : "px-3 py-2 hover:text-sky-400 hover:bg-sky-400/10 transition-all duration-300 relative group rounded-lg"} href={link.href}>
                  {link.label}
                  <motion.div className="absolute -bottom-0.5 left-3 right-3 h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300" whileHover={{ opacity: 1 }} />
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </header>
    </motion.div>
  )
}

export default Navbar
