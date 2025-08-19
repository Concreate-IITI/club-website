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
      <header className="text-white body-font bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap p-5 items-center justify-between">
          {/* Flex container for mobile view, but separate handling for larger screens */}
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Left aligned logo */}
            <Link href="/" className="flex title-font font-medium items-center text-white group">
              <motion.img src="/logo.png" alt="Logo" className="h-20 w-auto md:h-28 transition-transform duration-300 group-hover:scale-110" whileHover={{ rotate: 5 }} />
            </Link>

            {/* Mobile centered title */}
            <motion.div
              className="spicy-rice-regular text-4xl md:hidden font-bold absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Concreate Club
            </motion.div>

            {/* Right aligned toggle button for mobile */}
            <motion.button className="inline-flex items-center justify-center p-2 rounded-md text-white md:hidden hover:text-cyan-400 transition-colors duration-300" onClick={() => setMenuOpen(!menuOpen)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </motion.button>
          </div>

          {/* Laptop view centered title */}
          <motion.div
            className="hidden md:block spicy-rice-regular text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Concreate Club
          </motion.div>

          {/* Navigation Menu with transition (visible on larger screens, collapsible on mobile) */}
          <nav
            className={`${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} transition-all duration-500 ease-in-out md:transition-none md:opacity-100 md:max-h-full md:flex md:items-center md:ml-auto md:mr-auto text-lg font-bold overflow-hidden md:overflow-visible`}
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
                <Link className={pathname === link.href ? "mr-5 text-cyan-400 relative" : "mr-5 hover:text-cyan-400 transition-colors duration-300 relative group"} href={link.href}>
                  {link.label}
                  <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" whileHover={{ width: "100%" }} />
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
