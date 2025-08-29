"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const Footer = () => {
  const socialLinks = [
    {
      href: "https://www.facebook.com/people/Concreate-IITI/100054531757203/",
      label: "Facebook",
      gradient: "from-blue-500 to-blue-600",
      icon: (
        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      href: "https://www.instagram.com/concreate_iiti/",
      label: "Instagram",
      gradient: "from-pink-500 to-purple-500",
      icon: (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
          <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
        </svg>
      ),
    },
    {
      href: "https://www.linkedin.com/company/concreate-club-iit-indore/?originalSubdomain=in",
      label: "LinkedIn",
      gradient: "from-blue-600 to-blue-700",
      icon: (
        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-6 h-6" viewBox="0 0 24 24">
          <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx={4} cy={4} r={2} stroke="none" />
        </svg>
      ),
    },
    {
      href: "mailto:concreate@iiti.ac.in",
      label: "Email",
      gradient: "from-green-500 to-emerald-500",
      icon: (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
          <rect width={20} height={16} x={2} y={4} rx={2} ry={2} />
          <path d="M22 6L12 13 2 6" />
        </svg>
      ),
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <footer className="text-white body-font bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/50 relative">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

        <div className="container px-6 py-12 mx-auto">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Logo and Brand Section */}
            <motion.div className="flex flex-col sm:flex-row items-center gap-6" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <motion.img src="/logo.png" alt="Logo" className="h-24 w-auto sm:h-32 transition-transform duration-300 hover:scale-110" whileHover={{ rotate: 5 }} />
              <div className="text-center sm:text-left">
                <motion.h3
                  className="spicy-rice-regular text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Concreate Club
                </motion.h3>
                <p className="text-slate-300 text-lg">Building the Future of Civil Engineering</p>
                <p className="text-slate-400 text-sm mt-2">IIT Indore • Est. 2020</p>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h4 className="text-xl font-semibold text-white mb-2">Quick Links</h4>
              <div className="flex flex-wrap justify-center gap-4 text-slate-300">
                {[
                  { label: "Home", href: "/" },
                  { label: "Activities", href: "/recentActivities" },
                  { label: "Achievements", href: "/achievements" },
                  { label: "Team", href: "/team" },
                ].map((link, index) => (
                  <motion.div key={link.label} whileHover={{ scale: 1.05 }}>
                    <Link href={link.href} className="hover:text-cyan-400 transition-colors duration-300 relative group">
                      {link.label}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Media Links */}
            <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
              <h4 className="text-xl font-semibold text-white mb-2">Connect With Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gradient-to-r ${social.gradient} rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 group`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.8, delay: 0.6 }} />

          {/* Bottom Section */}
          <motion.div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
            <div className="text-center md:text-left">
              <p className="text-sm">© 2024 Concreate Club, IIT Indore. All rights reserved.</p>
              <p className="text-xs mt-1">Designed with ❤️ by the Concreate Team</p>
            </div>

            <div className="flex gap-6 text-sm">
              <motion.a href="#" className="hover:text-sky-400 transition-colors duration-300" whileHover={{ scale: 1.05 }}>
                Privacy Policy
              </motion.a>
              <motion.a href="#" className="hover:text-sky-400 transition-colors duration-300" whileHover={{ scale: 1.05 }}>
                Terms of Service
              </motion.a>
              <motion.a href="#" className="hover:text-sky-400 transition-colors duration-300" whileHover={{ scale: 1.05 }}>
                Contact
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none"></div>
      </footer>
    </motion.div>
  )
}

export default Footer
