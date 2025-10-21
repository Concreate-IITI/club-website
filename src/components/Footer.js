"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const Footer = () => {
  const socialLinks = [
    {
      href: "https://www.facebook.com/people/Concreate-IITI/100054531757203/",
      label: "Facebook",
      icon: (
        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      href: "https://www.instagram.com/concreate_iiti/",
      label: "Instagram",
      icon: (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
          <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
        </svg>
      ),
    },
    {
      href: "https://www.linkedin.com/company/concreate-club-iit-indore/?originalSubdomain=in",
      label: "LinkedIn",
      icon: (
        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-5 h-5" viewBox="0 0 24 24">
          <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx={4} cy={4} r={2} stroke="none" />
        </svg>
      ),
    },
    {
      href: "mailto:concreate@iiti.ac.in",
      label: "Email",
      icon: (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
          <rect width={20} height={16} x={2} y={4} rx={2} ry={2} />
          <path d="M22 6L12 13 2 6" />
        </svg>
      ),
    },
  ]

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/recentActivities" },
    { label: "Achievements", href: "/achievements" },
    { label: "Projects", href: "/projects" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/message-us" },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <footer className="relative text-white bg-gradient-to-r from-slate-950/95 via-slate-900/95 to-slate-950/95 backdrop-blur-2xl border-t border-slate-700/30 overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-cyan-500/10 to-blue-500/5 opacity-50 pointer-events-none" />

        {/* Glowing top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * -100, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: "100%",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo and Brand Section */}
            <motion.div className="lg:col-span-2 flex flex-col items-center lg:items-start" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <Link href="/" className="flex items-center gap-4 group mb-4">
                {/* Logo with effects */}
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500 scale-150" />

                  {/* Logo container */}
                  <div className="relative bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-500 p-0.5 rounded-full">
                    <div className="bg-slate-950 rounded-full p-2">
                      <motion.img src="/logo.png" alt="Concreate Club Logo" className="h-16 w-16 object-contain" whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }} />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <motion.h3
                    className="spicy-rice-regular text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    Concreate Club
                  </motion.h3>
                </div>
              </Link>

              <p className="text-slate-300 text-center lg:text-left max-w-md mb-4 leading-relaxed">Building the future of civil engineering at IIT Indore through innovation, collaboration, and excellence.</p>

              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>IIT Indore • Est. 2020</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div className="flex flex-col items-center lg:items-start" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-sky-400 to-cyan-500 rounded-full"></div>
                Quick Links
              </h4>
              <nav className="flex flex-col gap-2">
                {quickLinks.map((link, index) => (
                  <motion.div key={link.label} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link href={link.href} className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group text-sm">
                      <motion.div className="w-0 h-[2px] bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full group-hover:w-4 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>

            {/* Connect Section */}
            <motion.div className="flex flex-col items-center lg:items-start" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-sky-400 to-cyan-500 rounded-full"></div>
                Connect With Us
              </h4>

              {/* Social Links */}
              <div className="flex gap-3 mb-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-60 transition-all duration-300" />

                    {/* Button */}
                    <div className="relative w-10 h-10 bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-sky-400/30 group-hover:border-cyan-400 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-cyan-300 transition-all duration-300">{social.icon}</div>
                  </motion.a>
                ))}
              </div>

              {/* Contact Email */}
              <a href="mailto:concreate@iiti.ac.in" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>concreate@iiti.ac.in</span>
              </a>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}>
            <p className="text-slate-400 text-sm text-center md:text-left">© {new Date().getFullYear()} Concreate Club, IIT Indore. All rights reserved.</p>

            {/* Animated gradient text */}
            <motion.p
              className="text-sm bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent font-medium"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              style={{ backgroundSize: "200% 200%" }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Built with ❤️ by Concreate Team
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </footer>
    </motion.div>
  )
}

export default Footer
