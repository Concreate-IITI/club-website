"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { InfiniteMovingCardsDemo } from "./InfiniteMovingCardsDemo"

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [pageSettings, setPageSettings] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Icon mapping
  const getIcon = (iconType) => {
    const icons = {
      beaker: (
        <svg className="w-12 h-12 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z"
          />
        </svg>
      ),
      lightning: (
        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      trophy: (
        <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
      users: (
        <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      heart: (
        <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      book: (
        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    }
    return icons[iconType] || icons.beaker
  }

  useEffect(() => {
    fetchPageSettings()
  }, [])

  const fetchPageSettings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/page-settings?page=home")
      const data = await response.json()

      if (data.success) {
        setPageSettings(data.data)
      }
    } catch (error) {
      console.error("Error fetching page settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const heroImages = pageSettings?.heroImages?.sort((a, b) => a.order - b.order).map((img) => img.url) || []
  const uniqueCards = pageSettings?.uniqueCards?.sort((a, b) => a.order - b.order) || []

  useEffect(() => {
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [heroImages.length])

  return (
    <div className="min-h-screen relative">
      {/* Modern Hero Section with Split Layout */}
      <div className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-4.5rem)] flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/50 to-transparent" />

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-4 lg:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[75vh]">
            {/* Left Side - Text Content */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="space-y-4 lg:space-y-6">
              {/* Main Heading */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="space-y-2 lg:space-y-3">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">{pageSettings?.heroSection?.title || "Concreate Club"}</h1>

                <h2 className="text-lg md:text-xl lg:text-2xl text-sky-300 font-medium">{pageSettings?.heroSection?.subtitle || "Civil Engineering Student Club - IIT Indore"}</h2>
              </motion.div>

              {/* Description */}
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
                {pageSettings?.heroSection?.description || "Driving hands-on learning, innovation, and collaboration. Through workshops, student-led projects, competitions, and the flagship CivilX Series, we bridge classroom knowledge with real-world engineering challenges."}
              </motion.p>

              {/* Stats */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="grid grid-cols-3 gap-6 lg:gap-8 py-2 lg:py-4">
                {[
                  { number: pageSettings?.heroSection?.studentsCount || "500+", label: "Students" },
                  { number: pageSettings?.heroSection?.projectsCount || "50+", label: "Projects" },
                  { number: pageSettings?.heroSection?.awardsCount || "25+", label: "Awards" },
                ].map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-sky-400">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Buttons */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4">
                <Link href="/team">
                  <motion.button className="px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300 group" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <span className="flex items-center gap-2">
                      Meet Our Team
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.button>
                </Link>
                <Link href="/message-us">
                  <motion.button className="px-8 py-4 border-2 border-sky-400/50 text-sky-400 font-semibold rounded-xl hover:bg-sky-400/10 backdrop-blur-sm transition-all duration-300" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                    Get In Touch
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Image Gallery */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.4 }} className="relative h-[300px] md:h-[350px] lg:h-[400px]">
              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-sky-500/20 to-blue-600/20 backdrop-blur-sm border border-white/10">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(56, 189, 248, 0.3) 1px, transparent 0)`,
                      backgroundSize: "24px 24px",
                    }}
                  ></div>
                </div>

                {/* Image Slider */}
                <div className="relative w-full h-full">
                  {heroImages.map((image, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{
                        opacity: index === currentImageIndex ? 1 : 0,
                        scale: index === currentImageIndex ? 1 : 1.05,
                      }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    >
                      <img src={image} alt={`Civil Engineering Project ${index + 1}`} className="w-full h-full object-cover rounded-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent rounded-2xl" />
                    </motion.div>
                  ))}
                </div>

                {/* Navigation Dots */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {heroImages.map((_, index) => (
                    <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? "bg-sky-400 w-8 shadow-lg shadow-sky-400/50" : "bg-white/40 hover:bg-white/60"}`} />
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-sky-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>

              {/* Thumbnail Selectors Below Image */}
              <div className="mt-3 lg:mt-4 flex justify-center space-x-2 lg:space-x-3">
                {heroImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-14 h-10 lg:w-16 lg:h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${index === currentImageIndex ? "border-sky-400 shadow-lg shadow-sky-400/30" : "border-white/30 hover:border-white/60"}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                    {index === currentImageIndex && <div className="absolute inset-0 bg-sky-400/20" />}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 text-sky-400">
            <span className="text-xs uppercase tracking-wider">Scroll Down</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-6 h-10 border-2 border-sky-400/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-sky-400 rounded-full mt-2"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What Makes Us Unique</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uniqueCards.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.6 }} className="group">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:border-sky-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/15">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{getIcon(feature.iconType)}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 hover:border-sky-400/50 transition-all duration-500">
            <motion.h3 className="text-3xl md:text-4xl font-bold text-white mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              Ready to Shape the Future?
            </motion.h3>
            <motion.p className="text-xl text-gray-300 mb-8 leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
              Join our community of innovative civil engineers and be part of groundbreaking projects that build tomorrow's sustainable infrastructure. From concept to construction, we're building the future together.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
              <Link href="/achievements">
                <motion.button className="px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Explore Our Work
                </motion.button>
              </Link>
              <Link href="/recentActivities">
                <motion.button className="px-8 py-4 border-2 border-sky-400/50 text-sky-400 font-semibold rounded-full hover:bg-sky-400/10 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Recent Activities
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Iconic Civil Engineering Marvels Section */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Iconic Civil Engineering Marvels
          </motion.h2>
          <motion.p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            Discover the world's most remarkable civil engineering achievements that continue to inspire our work and vision for the future.
          </motion.p>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full mb-8"></div>
        </div>
        <InfiniteMovingCardsDemo />
      </motion.div>
    </div>
  )
}

export default Home
