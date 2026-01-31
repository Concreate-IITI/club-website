"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Modal from "./Modal"

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [allProjects, setAllProjects] = useState([])
  const [ongoingProjects, setOngoingProjects] = useState([])
  const [completedProjects, setCompletedProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/projects")
      const data = await response.json()

      if (data.success) {
        const active = data.data.filter((p) => p.isActive)
        const ongoing = data.data.filter((p) => p.type === "ongoing" && p.isActive)
        const completed = data.data.filter((p) => p.type === "completed" && p.isActive)

        setAllProjects(active)
        setOngoingProjects(ongoing)
        setCompletedProjects(completed)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setIsLoading(false)
    }
  }

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
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full"></div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="relative z-10 max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            onClick={() => setActiveTab("all")}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === "all" ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-400/25" : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-600/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Projects
            <span className={`px-2 py-1 rounded-full text-xs ${activeTab === "all" ? "bg-white/20" : "bg-slate-600/50"}`}>{allProjects.length}</span>
          </motion.button>
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
        {/* All Projects */}
        {activeTab === "all" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project, index) => (
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
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 text-white text-sm font-semibold rounded-full ${
                          project.type === "ongoing" ? "bg-green-500/90" : "bg-sky-500/90"
                        }`}>{project.type === "ongoing" ? "Ongoing" : "Completed"}</span>
                      </div>
                      {project.progress !== undefined && project.type === "ongoing" && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-black/70 text-white text-sm font-semibold rounded-full">{project.progress}% Complete</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">{project.title}</h3>

                    {/* Progress Bar for Ongoing */}
                    {project.progress !== undefined && project.type === "ongoing" && (
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

                    <motion.button
                      onClick={() => {
                        setSelectedProject(project)
                        setIsModalOpen(true)
                      }}
                      className="w-full px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Ongoing Projects */}
        {activeTab === "ongoing" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">{project.title}</h3>
                    {project.description && <p className="text-slate-400 text-sm mb-3 leading-relaxed line-clamp-2">{project.description}</p>}

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

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 bg-sky-500/20 text-sky-400 text-xs rounded-md border border-sky-500/30">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-md">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <motion.button
                      onClick={() => {
                        setSelectedProject(project)
                        setIsModalOpen(true)
                      }}
                      className="w-full px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Completed Projects */}
        {activeTab === "completed" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">{project.title}</h3>
                    {project.description && <p className="text-slate-400 text-sm mb-3 leading-relaxed line-clamp-2">{project.description}</p>}
                    {project.completionDate && (
                      <div className="flex items-center gap-2 mb-4 text-slate-300">
                        <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Completed: {project.completionDate}</span>
                      </div>
                    )}
                    {project.awards && project.awards.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.awards.slice(0, 2).map((award, idx) => (
                          <span key={idx} className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-md border border-amber-500/30">
                            {award}
                          </span>
                        ))}
                        {project.awards.length > 2 && (
                          <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-md">
                            +{project.awards.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                    <motion.button
                      onClick={() => {
                        setSelectedProject(project)
                        setIsModalOpen(true)
                      }}
                      className="w-full px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
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

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedProject?.title}>
        {selectedProject && (
          <div className="space-y-5">
            {/* Header with Status */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium tracking-wide uppercase rounded ${
                selectedProject.type === "ongoing" 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                  : "bg-slate-500/10 text-slate-300 border border-slate-500/20"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${selectedProject.type === "ongoing" ? "bg-emerald-400" : "bg-slate-400"}`}></span>
                {selectedProject.type === "ongoing" ? "In Progress" : "Completed"}
              </span>
              
              {/* Key metrics inline */}
              <div className="flex items-center gap-4 text-sm text-slate-400">
                {selectedProject.teamSize > 0 && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {selectedProject.teamSize}
                  </span>
                )}
                {selectedProject.publications > 0 && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {selectedProject.publications}
                  </span>
                )}
              </div>
            </div>

            {/* Progress for ongoing */}
            {selectedProject.progress > 0 && selectedProject.type === "ongoing" && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Progress</span>
                  <span className="text-sm font-semibold text-white">{selectedProject.progress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-sky-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${selectedProject.progress}%` }}></div>
                </div>
              </div>
            )}

            {/* Description */}
            {selectedProject.description && (
              <div>
                <p className="text-slate-300 leading-relaxed text-sm">{selectedProject.description}</p>
              </div>
            )}

            {/* Details Grid */}
            {(selectedProject.timeline || selectedProject.completionDate || selectedProject.funding) && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 py-4 border-y border-slate-700/50">
                {(selectedProject.timeline || selectedProject.completionDate) && (
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                      {selectedProject.type === "ongoing" ? "Timeline" : "Completed"}
                    </p>
                    <p className="text-sm text-white">{selectedProject.timeline || selectedProject.completionDate}</p>
                  </div>
                )}
                {selectedProject.funding && (
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Funding</p>
                    <p className="text-sm text-white">{selectedProject.funding}</p>
                  </div>
                )}
              </div>
            )}

            {/* Lead Members */}
            {selectedProject.leadMembers && selectedProject.leadMembers.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Project Leads</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.leadMembers.map((member, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-800/80 text-slate-200 text-sm rounded-md border border-slate-700/50">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {selectedProject.technologies && selectedProject.technologies.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-800/50 text-slate-300 text-xs font-medium rounded border border-slate-700/40">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Expected Outcomes (for ongoing) */}
            {selectedProject.expectedOutcomes && selectedProject.expectedOutcomes.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Expected Outcomes</p>
                <ul className="space-y-2">
                  {selectedProject.expectedOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-slate-800 text-slate-400 text-xs rounded mt-0.5">{idx + 1}</span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Results (for completed) */}
            {selectedProject.results && selectedProject.results.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Key Results</p>
                <ul className="space-y-2">
                  {selectedProject.results.map((result, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Impact */}
            {selectedProject.impact && (
              <div className="bg-slate-800/40 rounded-lg p-4 border-l-2 border-sky-500">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Impact</p>
                <p className="text-sm text-slate-300 leading-relaxed">{selectedProject.impact}</p>
              </div>
            )}

            {/* Awards */}
            {selectedProject.awards && selectedProject.awards.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Recognition</p>
                <div className="space-y-2">
                  {selectedProject.awards.map((award, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-slate-200">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Projects
