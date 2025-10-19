"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

const Achievements = () => {
  const [counters, setCounters] = useState({})
  const [statistics, setStatistics] = useState([])
  const [achievementFields, setAchievementFields] = useState([])
  const [timelineAchievements, setTimelineAchievements] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPageSettings()
    fetchAchievements()
  }, [])

  const fetchPageSettings = async () => {
    try {
      const response = await fetch("/api/page-settings?page=achievements")
      const data = await response.json()

      if (data.success) {
        // Set stats cards
        const sortedStats = (data.data.statsCards || []).sort((a, b) => a.order - b.order)
        setStatistics(sortedStats)

        // Initialize counters with target values
        const targets = {}
        sortedStats.forEach((stat, index) => {
          targets[`stat${index}`] = stat.number
        })

        // Set fields of excellence
        const sortedFields = (data.data.fieldsOfExcellence || []).sort((a, b) => a.order - b.order)
        setAchievementFields(sortedFields)

        // Start counter animation
        startCounterAnimation(targets)
      }
    } catch (error) {
      console.error("Error fetching page settings:", error)
    }
  }

  const startCounterAnimation = (targets) => {
    const duration = 2000 // 2 seconds
    const steps = 50
    const stepTime = duration / steps
    const initialCounters = {}

    Object.keys(targets).forEach((key) => {
      initialCounters[key] = 0
    })

    setCounters(initialCounters)

    const intervalId = setInterval(() => {
      setCounters((prev) => {
        const newCounters = { ...prev }
        let allReached = true

        Object.keys(targets).forEach((key) => {
          if (newCounters[key] < targets[key]) {
            newCounters[key] = Math.min(newCounters[key] + Math.ceil(targets[key] / steps), targets[key])
            allReached = false
          }
        })

        if (allReached) {
          clearInterval(intervalId)
        }

        return newCounters
      })
    }, stepTime)
  }

  const fetchAchievements = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/achievements")
      const data = await response.json()

      if (data.success) {
        // Group achievements by year
        const grouped = data.data.reduce((acc, achievement) => {
          const year = achievement.year
          if (!acc[year]) {
            acc[year] = {
              year: year,
              achievements: [],
            }
          }
          acc[year].achievements.push(achievement)
          return acc
        }, {})

        // Convert to array and sort by year descending
        const groupedArray = Object.values(grouped).sort((a, b) => b.year.localeCompare(a.year))
        setTimelineAchievements(groupedArray)
      }
    } catch (error) {
      console.error("Error fetching achievements:", error)
    } finally {
      setIsLoading(false)
    }
  }

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
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full"></div>
        </div>
      </motion.div>

      {/* Statistics Section */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-all duration-500 group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                  {counters[`stat${index}`] || 0}
                  {stat.suffix}
                </div>
                <div className="text-white font-semibold mb-2">{stat.label}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Timeline Section */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Major Achievements Timeline
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full mb-12"></div>

          {isLoading ? (
            <div className="text-center text-white text-xl py-12">Loading achievements...</div>
          ) : timelineAchievements.length === 0 ? (
            <div className="text-center text-gray-400 text-xl py-12">No achievements added yet.</div>
          ) : (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 to-blue-500"></div>

              <div className="space-y-12">
                {timelineAchievements.map((yearData, yearIndex) => (
                  <motion.div key={yearData.year} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: yearIndex * 0.2 }} className="relative">
                    {/* Year Marker */}
                    <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full border-4 border-slate-900 z-10 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{yearData.year}</span>
                    </div>

                    {/* Achievements */}
                    <div className="ml-20 md:ml-0">
                      <div className={`grid gap-6 ${yearData.achievements.length === 1 ? "grid-cols-1 md:grid-cols-1 lg:grid-cols-1 max-w-md mx-auto" : yearData.achievements.length === 2 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
                        {yearData.achievements.map((achievement, achievementIndex) => (
                          <motion.div
                            key={achievementIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: achievementIndex * 0.1 }}
                            className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 hover:border-sky-400/50 transition-all duration-500 group"
                            whileHover={{ y: -5 }}
                          >
                            <div className="mb-3">
                              <span className="px-3 py-1 bg-sky-500/20 text-sky-400 text-xs font-semibold rounded-full border border-sky-500/30">{achievement.category}</span>
                            </div>
                            <h4 className="text-lg font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">{achievement.title}</h4>
                            <p className="text-slate-300 text-sm mb-3 leading-relaxed">{achievement.description}</p>
                            <div className="border-t border-slate-700/50 pt-3">
                              <p className="text-xs text-slate-400">
                                <span className="text-sky-400 font-semibold">Impact:</span> {achievement.impact}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Achievement Fields Section */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Fields of Excellence
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievementFields.map((field, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-500 group"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">{field.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{field.description}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white mb-3">Key Achievements:</h4>
                  {field.achievements.map((achievement, idx) => (
                    <motion.div key={idx} className="px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-lg text-center" whileHover={{ scale: 1.05 }}>
                      <span className={`text-sm font-medium bg-gradient-to-r ${field.color} bg-clip-text text-transparent`}>{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Achievements
