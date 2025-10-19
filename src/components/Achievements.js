"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

const Achievements = () => {
  const [counters, setCounters] = useState({
    events: 0,
    wins: 0,
    projects: 0,
    students: 0,
  })

  // Counter animation effect
  useEffect(() => {
    const targets = { events: 75, wins: 25, projects: 150, students: 2000 }
    const duration = 2000 // 2 seconds
    const steps = 50
    const stepTime = duration / steps

    const intervalId = setInterval(() => {
      setCounters(prev => {
        const newCounters = { ...prev }
        let allReached = true

        Object.keys(targets).forEach(key => {
          if (newCounters[key] < targets[key]) {
            newCounters[key] = Math.min(
              newCounters[key] + Math.ceil(targets[key] / steps),
              targets[key]
            )
            allReached = false
          }
        })

        if (allReached) {
          clearInterval(intervalId)
        }

        return newCounters
      })
    }, stepTime)

    return () => clearInterval(intervalId)
  }, [])

  const statistics = [
    { 
      number: counters.events, 
      suffix: "+",
      label: "Events Organized", 
      icon: "🎯",
      description: "Technical workshops, competitions, and seminars"
    },
    { 
      number: counters.wins, 
      suffix: "+",
      label: "National/International Wins", 
      icon: "🏆",
      description: "Awards and recognitions at prestigious competitions"
    },
    { 
      number: counters.projects, 
      suffix: "+",
      label: "Research Projects", 
      icon: "🔬",
      description: "Student-led and faculty-mentored research initiatives"
    },
    { 
      number: counters.students, 
      suffix: "+",
      label: "Students Impacted", 
      icon: "👥",
      description: "Lives touched through our programs and initiatives"
    },
  ]

  const timelineAchievements = [
    {
      year: "2024",
      achievements: [
        {
          title: "National Civil Engineering Excellence Award",
          category: "Research Excellence",
          description: "Recognized for outstanding contributions to sustainable infrastructure development.",
          impact: "Industry partnership with 5 major construction companies"
        },
        {
          title: "Best Student Club - IIT Indore",
          category: "Leadership",
          description: "Awarded for exceptional leadership in organizing technical events.",
          impact: "500+ students directly benefited from our programs"
        },
        {
          title: "Smart City Innovation Challenge Winner",
          category: "Innovation",
          description: "First place in national-level smart infrastructure competition.",
          impact: "Patent filed for IoT-based structural health monitoring"
        }
      ]
    },
    {
      year: "2023",
      achievements: [
        {
          title: "Sustainability Champion Award",
          category: "Environmental Impact",
          description: "Leading initiatives in sustainable construction practices.",
          impact: "Reduced campus construction waste by 40%"
        },
        {
          title: "Inter-IIT Civil Conclave Champions",
          category: "Competition",
          description: "Overall winners in the prestigious inter-IIT civil engineering competition.",
          impact: "Team of 20 students represented IIT Indore"
        },
        {
          title: "Research Publication Milestone",
          category: "Academic Excellence",
          description: "Published 15 research papers in top-tier journals.",
          impact: "1000+ citations across all publications"
        }
      ]
    },
    {
      year: "2022",
      achievements: [
        {
          title: "Community Impact Award",
          category: "Social Responsibility",
          description: "Significant contributions to local infrastructure development.",
          impact: "10+ rural communities served"
        },
        {
          title: "Digital Innovation in Construction",
          category: "Technology",
          description: "Pioneered use of AI and ML in structural analysis.",
          impact: "3 software tools developed and open-sourced"
        }
      ]
    }
  ]

  const achievementFields = [
    {
      title: "Inter-IIT Civil Conclave",
      icon: "🏛️",
      description: "Leading national-level competition showcasing civil engineering excellence",
      achievements: ["Overall Champions 2023", "Best Innovation Award 2024", "3 consecutive finals"],
      color: "from-amber-400 to-orange-500"
    },
    {
      title: "Sustainability",
      icon: "🌱",
      description: "Pioneering eco-friendly solutions and sustainable construction practices",
      achievements: ["Green Building Certification", "40% Waste Reduction", "Solar Energy Integration"],
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Smart Solutions",
      icon: "🔧",
      description: "Innovative engineering solutions using cutting-edge technology",
      achievements: ["IoT Sensor Networks", "AI-Powered Analysis", "Automated Monitoring Systems"],
      color: "from-blue-400 to-indigo-500"
    },
    {
      title: "Smart City Planning",
      icon: "🏙️",
      description: "Urban development solutions for modern metropolitan challenges",
      achievements: ["Traffic Optimization", "Urban Heat Island Mitigation", "Smart Infrastructure Design"],
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "Machine Learning in Civil Engineering",
      icon: "🤖",
      description: "Applying AI and ML to solve complex civil engineering problems",
      achievements: ["Predictive Maintenance Models", "Structural Health Monitoring", "Construction Quality Control"],
      color: "from-cyan-400 to-teal-500"
    },
    {
      title: "Research & Innovation",
      icon: "🔬",
      description: "Cutting-edge research contributing to the advancement of civil engineering",
      achievements: ["25+ Research Papers", "5 Patents Filed", "International Collaborations"],
      color: "from-red-400 to-rose-500"
    }
  ]

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-16 pb-8"
      >
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
          <motion.p
            className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Celebrating excellence, innovation, and impact in civil engineering through student-led initiatives
          </motion.p>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full"></div>
        </div>
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-16"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Impact by Numbers
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full mb-12"></div>

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
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-white font-semibold mb-2">{stat.label}</div>
                <div className="text-slate-400 text-sm leading-relaxed">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Timeline Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-16"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Major Achievements Timeline
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full mb-12"></div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 to-blue-500"></div>
            
            <div className="space-y-12">
              {timelineAchievements.map((yearData, yearIndex) => (
                <motion.div
                  key={yearData.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: yearIndex * 0.2 }}
                  className="relative"
                >
                  {/* Year Marker */}
                  <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full border-4 border-slate-900 z-10 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{yearData.year}</span>
                  </div>
                  
                  {/* Achievements */}
                  <div className="ml-20 md:ml-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <span className="px-3 py-1 bg-sky-500/20 text-sky-400 text-xs font-semibold rounded-full border border-sky-500/30">
                              {achievement.category}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                            {achievement.title}
                          </h4>
                          <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                            {achievement.description}
                          </p>
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
        </div>
      </motion.div>

      {/* Achievement Fields Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-16"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {field.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                    {field.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {field.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white mb-3">Key Achievements:</h4>
                  {field.achievements.map((achievement, idx) => (
                    <motion.div
                      key={idx}
                      className={`px-4 py-2 bg-gradient-to-r ${field.color} bg-opacity-10 border border-current border-opacity-20 rounded-lg text-center`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className={`text-sm font-medium bg-gradient-to-r ${field.color} bg-clip-text text-transparent`}>
                        {achievement}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom CTA Section */}
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
              Join Our Legacy
            </motion.h3>
            <motion.p
              className="text-xl text-slate-300 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Be part of our journey to excellence. Contribute to groundbreaking research, 
              innovative solutions, and meaningful impact in civil engineering.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Our Research
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-sky-400/50 text-sky-400 font-semibold rounded-full hover:bg-sky-400/10 backdrop-blur-sm transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Projects
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Achievements
