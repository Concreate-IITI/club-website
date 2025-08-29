"use client"

import React from "react"
import { motion } from "framer-motion"
import { CoverDemo } from "./CoverDemo"
import { CardHoverEffectDemo } from "./CardHoverEffectDemo"

const Achievements = () => {
  const achievements = [
    {
      year: "2024",
      title: "National Civil Engineering Excellence Award",
      description: "Recognized for outstanding contributions to sustainable infrastructure development and innovative concrete technology research.",
      category: "Research Excellence",
      impact: "500+ students benefited",
    },
    {
      year: "2023",
      title: "Best Student Club - IIT Indore",
      description: "Awarded for exceptional leadership in organizing technical events and fostering engineering innovation among students.",
      category: "Leadership",
      impact: "25+ successful events",
    },
    {
      year: "2023",
      title: "Innovation in Construction Technology",
      description: "Pioneered new methods in sustainable building materials and smart infrastructure solutions for urban development.",
      category: "Innovation",
      impact: "3 patents filed",
    },
    {
      year: "2022",
      title: "Community Impact Award",
      description: "Recognized for significant contributions to local infrastructure projects and community development initiatives.",
      category: "Social Impact",
      impact: "10+ communities served",
    },
  ]

  const stats = [
    { number: "50+", label: "Awards Won", icon: "🏆" },
    { number: "1000+", label: "Students Impacted", icon: "👥" },
    { number: "25+", label: "Research Papers", icon: "📄" },
    { number: "15+", label: "Industry Partners", icon: "🤝" },
  ]

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Our Achievements
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Celebrating excellence, innovation, and impact in civil engineering
          </motion.p>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full"></div>
        </div>
      </motion.div>

      {/* Cover Demo Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="relative z-10">
        <CoverDemo />
      </motion.div>

      {/* Stats Section */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Impact by Numbers
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-all duration-500 group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-slate-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Card Hover Effect Demo */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
        <CardHoverEffectDemo />
      </motion.div>

      {/* Detailed Achievements Timeline */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Achievement Timeline
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full mb-16"></div>

          <div className="space-y-12">
            {achievements.map((achievement, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.2 }} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                {/* Year Badge */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-sky-400/25">{achievement.year}</div>
                </div>

                {/* Achievement Content */}
                <div className="flex-1 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-cyan-400/50 transition-all duration-500">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-sky-400/20 to-blue-500/20 text-sky-300 rounded-full text-sm font-medium border border-sky-400/30">{achievement.category}</span>
                    <span className="text-slate-400 text-sm">{achievement.impact}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{achievement.title}</h3>

                  <p className="text-lg text-slate-300 leading-relaxed">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 hover:border-cyan-400/50 transition-all duration-500">
            <motion.h3 className="text-3xl md:text-4xl font-bold text-white mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              Be Part of Our Success Story
            </motion.h3>
            <motion.p className="text-xl text-slate-300 mb-8 leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
              Join us in creating the next chapter of achievements in civil engineering excellence and innovation.
            </motion.p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Join Our Journey
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Achievements
