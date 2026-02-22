"use client"

import React from "react"
import { motion } from "framer-motion"

/**
 * Individual reason card
 */
const ReasonCard = ({ reason, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center hover:border-sky-400/50 transition-all duration-500 group"
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {reason.icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
      {reason.title}
    </h3>
    <p className="text-slate-300 text-sm leading-relaxed">{reason.description}</p>
  </motion.div>
)

/**
 * Reasons section data
 */
export const REASONS_DATA = [
  {
    icon: "🤝",
    title: "Collaboration",
    description: "Partner with us on innovative civil engineering projects",
  },
  {
    icon: "💡",
    title: "Innovation",
    description: "Share your ideas and contribute to cutting-edge solutions",
  },
  {
    icon: "🎓",
    title: "Learning",
    description: "Join workshops, seminars, and skill development programs",
  },
  {
    icon: "🏗️",
    title: "Projects",
    description: "Get involved in real-world engineering challenges",
  },
]

/**
 * "Why Connect With Us" section
 */
const ReasonsSection = ({ reasons = REASONS_DATA }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10 py-16"
  >
    <div className="max-w-7xl mx-auto px-6">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Why Connect With Us?
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((reason, index) => (
          <ReasonCard key={index} reason={reason} index={index} />
        ))}
      </div>
    </div>
  </motion.div>
)

export default ReasonsSection
export { ReasonCard }
