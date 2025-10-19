"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const Projects = () => {
  const [activeTab, setActiveTab] = useState("ongoing")
  const [ongoingProjects, setOngoingProjects] = useState([])
  const [completedProjects, setCompletedProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/projects")
      const data = await response.json()

      if (data.success) {
        const ongoing = data.data.filter((p) => p.type === "ongoing" && p.isActive)
        const completed = data.data.filter((p) => p.type === "completed" && p.isActive)

        setOngoingProjects(ongoing)
        setCompletedProjects(completed)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const projectStats = [
    { number: ongoingProjects.length, label: "Ongoing Projects", icon: "🚧" },
    { number: completedProjects.length, label: "Completed Projects", icon: "✅" },
    { number: "₹75L", label: "Total Funding", icon: "💰" },
    { number: "150+", label: "Students Involved", icon: "👨‍🎓" },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading projects...</div>
      </div>
    )
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
            Our Projects
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Innovative research and development projects driving the future of civil engineering
          </motion.p>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full"></div>
        </div>
      </motion.div>

      {/* Project Statistics */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectStats.map((stat, index) => (
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
                <div className="text-white font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="relative z-10 max-w-6xl mx-auto px-6 mb-12">
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={() => setActiveTab("ongoing")}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === "ongoing" ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-400/25" : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-600/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ongoing Projects
            <span className={`px-2 py-1 rounded-full text-xs ${activeTab === "ongoing" ? "bg-white/20" : "bg-slate-600/50"}`}>{ongoingProjects.length}</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("completed")}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === "completed" ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-400/25" : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-600/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Completed Projects
            <span className={`px-2 py-1 rounded-full text-xs ${activeTab === "completed" ? "bg-white/20" : "bg-slate-600/50"}`}>{completedProjects.length}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
        {/* Ongoing Projects */}
        {activeTab === "ongoing" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Ongoing Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {ongoingProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden hover:border-sky-400/50 transition-all duration-500 group"
                  whileHover={{ y: -5 }}
                >
                  {(project.image || (project.images && project.images.length > 0)) && (
                    <div className="relative h-48 overflow-hidden">
                      <img src={project.images && project.images.length > 0 ? project.images[0].url : project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      {project.status && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-green-500/90 text-white text-sm font-semibold rounded-full">{project.status}</span>
                        </div>
                      )}
                      {project.progress !== undefined && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-black/70 text-white text-sm font-semibold rounded-full">{project.progress}% Complete</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">{project.title}</h3>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">{project.description}</p>

                    {/* Progress Bar */}
                    {project.progress !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-slate-400">Progress</span>
                          <span className="text-xs text-sky-400 font-semibold">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-sky-400 to-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${project.progress}%` }}></div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3 mb-4">
                      {project.timeline && (
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span>Timeline: {project.timeline}</span>
                        </div>
                      )}
                      {project.funding && (
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Funding: {project.funding}</span>
                        </div>
                      )}
                    </div>

                    {project.leadMembers && project.leadMembers.length > 0 && (
                      <div className="space-y-3 mb-4">
                        <h4 className="text-sm font-semibold text-white">Lead Members:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.leadMembers.map((member, idx) => (
                            <span key={idx} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md">
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="space-y-3 mb-4">
                        <h4 className="text-sm font-semibold text-white">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="px-2 py-1 bg-sky-500/20 text-sky-400 text-xs rounded-md border border-sky-500/30">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.expectedOutcomes && project.expectedOutcomes.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-white">Expected Outcomes:</h4>
                        <ul className="space-y-1">
                          {project.expectedOutcomes.map((outcome, idx) => (
                            <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                              <span className="text-sky-400 mt-1">•</span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Completed Projects */}
        {activeTab === "completed" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Completed Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {completedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden hover:border-sky-400/50 transition-all duration-500 group"
                  whileHover={{ y: -5 }}
                >
                  {(project.image || (project.images && project.images.length > 0)) && (
                    <div className="relative h-48 overflow-hidden">
                      <img src={project.images && project.images.length > 0 ? project.images[0].url : project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      {project.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-green-500/90 text-white text-sm font-semibold rounded-full">{project.category}</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-black/70 text-white text-sm font-semibold rounded-full">Completed</span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">{project.title}</h3>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">{project.description}</p>

                    {(project.completionDate || project.teamSize) && (
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm text-slate-400">
                          {project.completionDate && <span>Completed: {project.completionDate}</span>}
                          {project.teamSize && <span>Team Size: {project.teamSize}</span>}
                        </div>
                        {(project.publications || (project.awards && project.awards.length > 0)) && (
                          <div className="flex items-center justify-between text-sm text-slate-400">
                            {project.publications && <span>Publications: {project.publications}</span>}
                            {project.awards && project.awards.length > 0 && <span>Awards: {project.awards.length}</span>}
                          </div>
                        )}
                      </div>
                    )}

                    {project.results && project.results.length > 0 && (
                      <div className="space-y-3 mb-4">
                        <h4 className="text-sm font-semibold text-white">Key Results:</h4>
                        <ul className="space-y-1">
                          {project.results.map((result, idx) => (
                            <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                              <span className="text-green-400 mt-1">✓</span>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project.impact && (
                      <div className="space-y-3 mb-4">
                        <h4 className="text-sm font-semibold text-white">Impact:</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{project.impact}</p>
                      </div>
                    )}

                    {project.awards.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-white">Awards:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.awards.map((award, idx) => (
                            <span key={idx} className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-md border border-amber-500/30">
                              {award}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom CTA Section */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 hover:border-cyan-400/50 transition-all duration-500">
            <motion.h3 className="text-3xl md:text-4xl font-bold text-white mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              Have a Project Idea?
            </motion.h3>
            <motion.p className="text-xl text-slate-300 mb-8 leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
              Join our research community and contribute to cutting-edge projects in civil engineering. Let's build the future together with innovative solutions.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
              <Link href="/message-us">
                <motion.button className="px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Propose a Project
                </motion.button>
              </Link>
              <Link href="/team">
                <motion.button className="px-8 py-4 border-2 border-sky-400/50 text-sky-400 font-semibold rounded-full hover:bg-sky-400/10 backdrop-blur-sm transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Join Our Team
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Projects
