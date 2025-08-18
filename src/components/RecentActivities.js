"use client"

import React from "react"
import { motion } from "framer-motion"
import { SparklesPreview } from "./SparklesPreview"
import Activities from "./Activities"

const RecentActivities = () => {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Recent Activities
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Discover our latest projects, competitions, and innovations in civil engineering
          </motion.p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>
      </motion.div>

      {/* Sparkles Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="relative z-10">
        <SparklesPreview />
      </motion.div>

      {/* Activities Section */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
        <Activities />
      </motion.div>

      {/* Bottom CTA Section */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 hover:border-cyan-400/50 transition-all duration-500">
            <motion.h3 className="text-3xl md:text-4xl font-bold text-white mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              Want to Participate?
            </motion.h3>
            <motion.p className="text-xl text-slate-300 mb-8 leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
              Join our upcoming events and competitions. Be part of the next generation of civil engineers making a difference.
            </motion.p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-400 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Get Involved
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default RecentActivities
