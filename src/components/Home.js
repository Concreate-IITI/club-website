"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ImagesSliderDemo } from "./ImagesSliderDemo"
import { InfiniteMovingCardsDemo } from "./InfiniteMovingCardsDemo"

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate checking if ImagesSliderDemo is ready
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Adjust timing as needed

    return () => clearTimeout(timer)
  }, [])

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
            Concreate Club
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Building the Future of Civil Engineering at IIT Indore
          </motion.p>

          {/* Stats Section */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
            {[
              { number: "500+", label: "Students Engaged" },
              { number: "50+", label: "Projects Completed" },
              { number: "10+", label: "Industry Partners" },
            ].map((stat, index) => (
              <motion.div key={index} className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Image Slider Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="relative z-10">
        {isLoading ? (
          <div className="flex items-center justify-center h-64 w-full">
            <motion.div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
            <p className="ml-4 text-xl text-slate-300">Loading experiences...</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10 pointer-events-none"></div>
            <ImagesSliderDemo />
          </div>
        )}
      </motion.div>

      {/* Moving Cards Section */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            What Our Members Say
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-8"></div>
        </div>
        <InfiniteMovingCardsDemo />
      </motion.div>

      {/* Call to Action Section */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 hover:border-cyan-400/50 transition-all duration-500">
            <motion.h3 className="text-3xl md:text-4xl font-bold text-white mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              Ready to Build the Future?
            </motion.h3>
            <motion.p className="text-xl text-slate-300 mb-8 leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
              Join our community of innovative civil engineers and be part of groundbreaking projects that shape tomorrow's infrastructure.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
              <motion.button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-400 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Join Our Club
              </motion.button>
              <motion.button className="px-8 py-4 border-2 border-cyan-400/50 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400/10 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Home
