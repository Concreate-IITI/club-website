"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

const ModernTeamCard = ({ member, index, isLeadership = false }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 ${isLeadership ? "p-8" : "p-6"} transition-all duration-500 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-400/20`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            />
          ))}
        </div>

        {/* Profile Image */}
        <div className="relative mb-6 mx-auto">
          <div className={`relative ${isLeadership ? "w-32 h-32" : "w-24 h-24"} mx-auto`}>
            {/* Rotating ring - behind the image */}
            <motion.div className="absolute inset-0 border-2 border-cyan-400/50 rounded-full z-0" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />

            {/* Image container with gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full p-0.5 z-10">
              <div className="w-full h-full bg-slate-900 rounded-full p-1">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "/team/default-avatar.jpg"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.h3 className={`font-bold text-white mb-2 ${isLeadership ? "text-2xl" : "text-xl"}`} animate={{ color: isHovered ? "#06b6d4" : "#ffffff" }} transition={{ duration: 0.3 }}>
            {member.name}
          </motion.h3>

          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-gradient-to-r from-cyan-400/20 to-purple-400/20 text-cyan-300 rounded-full border border-cyan-400/30">{member.position}</span>
          </div>

          <p className="text-slate-400 text-sm mb-4">{member.department}</p>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-1 mb-6">
            {member.skills &&
              member.skills.map((skill, skillIndex) => (
                <motion.span key={skillIndex} className="px-2 py-1 text-xs bg-slate-800/50 text-slate-300 rounded-md border border-slate-700/50" whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.1)" }}>
                  {skill}
                </motion.span>
              ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            {member.social?.insta && (
              <motion.a
                href={member.social.insta}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </motion.a>
            )}

            {member.social?.linkedin && (
              <motion.a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
            )}

            {member.social?.email && (
              <motion.a
                href={`mailto:${member.social.email}`}
                className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const TeamMembers = () => {
  const [activeSection, setActiveSection] = useState("leadership")
  const [teamMembers, setTeamMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    const sections = document.querySelectorAll('[id^="section-"]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/team")
      const data = await response.json()

      if (data.success) {
        console.log("Fetched team members:", data.data)

        setTeamMembers(data.data || [])
      } else {
        setError("Failed to fetch team members")
        // Use fallback data if available
        setTeamMembers([])
      }
    } catch (error) {
      console.error("Error fetching team members:", error)
      setError("Error loading team members")
      setTeamMembers([])
    } finally {
      setIsLoading(false)
    }
  }

  // Group team members by position
  const leadership = teamMembers.filter((member) => member.position.toLowerCase().includes("head") || member.position.toLowerCase().includes("president") || member.position.toLowerCase().includes("lead"))

  const coreMembers = teamMembers.filter((member) => member.position.toLowerCase().includes("core") || member.position.toLowerCase().includes("member"))

  const developers = teamMembers.filter((member) => member.position.toLowerCase().includes("developer"))

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-xl text-slate-400">Loading our amazing team...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">⚠️ {error}</div>
          <button onClick={fetchTeamMembers} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors duration-200">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Our Team
          </motion.h1>
          <motion.p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Meet the brilliant minds behind Concreate Club - innovators, builders, and visionaries shaping the future of civil engineering at IIT Indore.
          </motion.p>
        </motion.div>

        {/* Leadership Section */}
        {leadership.length > 0 && (
          <section id="section-leadership" className="mb-24">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Leadership</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {leadership.map((member, index) => (
                <ModernTeamCard key={member._id} member={member} index={index} isLeadership={true} />
              ))}
            </div>
          </section>
        )}

        {/* Core Members Section */}
        {coreMembers.length > 0 && (
          <section id="section-members" className="mb-24">
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Core Members</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {coreMembers.map((member, index) => (
                <ModernTeamCard key={member._id} member={member} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Developer Section */}
        {developers.length > 0 && (
          <section id="section-developer" className="mb-16">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Development Team</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {developers.map((member, index) => (
                <ModernTeamCard key={member._id} member={member} index={index} isLeadership={true} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {teamMembers.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">No team members found</div>
            <div className="text-gray-500 text-sm">Team information will be displayed here once available</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamMembers
