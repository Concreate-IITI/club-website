"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { InfiniteMovingCardsDemo } from "./InfiniteMovingCardsDemo"

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = ["/Home/new/p1.jpg", "/Home/new/p2.jpg", "/Home/new/p3.jpg", "/Home/new/p4.jpg", "/Home/new/p5.jpg", "/Home/new/p6.jpg"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <div className="min-h-screen relative">
      {/* Hero Section with Background Images */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${image})` }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === currentImageIndex ? 1 : 0,
                scale: index === currentImageIndex ? 1.05 : 1.1,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ))}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
        </div>

        {/* Hero Content */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative z-10 text-center max-w-6xl mx-auto px-6">
          {/* Text Background Blur */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-3xl" />

          <div className="relative z-10 py-12">
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Concreate Club
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Civil Engineering Student Club - IIT Indore</h2>
              <p className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Driving hands-on learning, innovation, and collaboration. Through workshops, student-led projects, competitions, and the flagship CivilX Series, we bridge classroom knowledge with real-world engineering challenges—preparing future engineers to shape sustainable and resilient
                infrastructures.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/team">
                <motion.button className="px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  Meet Our Team
                </motion.button>
              </Link>
              <Link href="/message-us">
                <motion.button className="px-8 py-4 border-2 border-sky-400/80 text-sky-400 font-semibold rounded-full hover:bg-sky-400/10 backdrop-blur-sm transition-all duration-300" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  Get In Touch
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? "bg-sky-400 w-8" : "bg-white/50 hover:bg-white/80"}`} />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What Makes Us Unique</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z"
                    />
                  </svg>
                ),
                title: "Hands-On Learning",
                description: "Practical workshops and lab sessions that bring theoretical concepts to life through real engineering applications.",
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Innovation Hub",
                description: "Student-led projects pushing the boundaries of civil engineering with cutting-edge technologies and sustainable solutions.",
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                ),
                title: "CivilX Series",
                description: "Our flagship competition series connecting students with industry challenges and fostering competitive excellence.",
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: "Industry Connect",
                description: "Strong partnerships with leading construction companies and engineering firms for internships and career opportunities.",
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Sustainable Focus",
                description: "Emphasis on green building technologies, sustainable infrastructure, and environmentally conscious engineering practices.",
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                ),
                title: "Knowledge Sharing",
                description: "Regular seminars, technical talks, and peer-to-peer learning sessions with experts from academia and industry.",
              },
            ].map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.6 }} className="group">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:border-sky-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/15">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
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

      {/* What Our Members Say Section - Kept from Original */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            What Our Members Say
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full mb-8"></div>
        </div>
        <InfiniteMovingCardsDemo />
      </motion.div>
    </div>
  )
}

export default Home
