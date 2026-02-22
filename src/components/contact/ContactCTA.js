"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"

/**
 * Bottom CTA section for contact page
 */
const ContactCTA = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10 py-16"
  >
    <div className="max-w-4xl mx-auto px-6 text-center">
      <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 hover:border-cyan-400/50 transition-all duration-500">
        <motion.h3
          className="text-3xl md:text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Join Our Engineering Community
        </motion.h3>
        <motion.p
          className="text-xl text-slate-300 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Become part of a vibrant community of innovators, creators, and future leaders in civil
          engineering. Together, we're building tomorrow's infrastructure today.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link href="/projects">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Projects
            </motion.button>
          </Link>
          <Link href="/team">
            <motion.button
              className="px-8 py-4 border-2 border-sky-400/50 text-sky-400 font-semibold rounded-full hover:bg-sky-400/10 backdrop-blur-sm transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Meet Our Team
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  </motion.div>
)

export default ContactCTA
