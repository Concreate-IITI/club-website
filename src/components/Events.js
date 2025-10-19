"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Modal from "./Modal"

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [carouselIndices, setCarouselIndices] = useState({})

  const goToSlide = (eventId, index) => {
    setCarouselIndices((prev) => ({
      ...prev,
      [eventId]: index,
    }))
  }

  const nextSlide = (eventId, totalImages) => {
    const currentIndex = carouselIndices[eventId] || 0
    goToSlide(eventId, (currentIndex + 1) % totalImages)
  }

  const prevSlide = (eventId, totalImages) => {
    const currentIndex = carouselIndices[eventId] || 0
    goToSlide(eventId, (currentIndex - 1 + totalImages) % totalImages)
  }

  const upcomingEvents = [
    {
      id: 1,
      title: "CivilX Series 2025: Smart Infrastructure",
      date: "March 15, 2025",
      time: "10:00 AM - 5:00 PM",
      venue: "IIT Indore Auditorium",
      description: "Annual flagship event focusing on smart city solutions and IoT applications in civil engineering.",
      image: "/recent/techexpo1.jpg",
      category: "Conference",
      registrations: "200+",
    },
    {
      id: 2,
      title: "Sustainable Construction Workshop",
      date: "February 28, 2025",
      time: "2:00 PM - 6:00 PM",
      venue: "Civil Engineering Lab",
      description: "Hands-on workshop on eco-friendly building materials and sustainable construction practices.",
      image: "/recent/techexpo2.jpg",
      category: "Workshop",
      registrations: "50",
    },
    {
      id: 3,
      title: "Inter-IIT Civil Conclave",
      date: "April 12-14, 2025",
      time: "9:00 AM - 8:00 PM",
      venue: "IIT Indore Campus",
      description: "Three-day national level competition featuring structural design, surveying, and innovation challenges.",
      image: "/recent/IITISOC1.jpg",
      category: "Competition",
      registrations: "500+",
    },
  ]

  const ongoingEvents = [
    {
      id: 1,
      title: "Hackathon 2025: Civil Tech Solutions",
      endDate: "January 31, 2025",
      description: "48-hour hackathon to develop innovative digital solutions for civil engineering challenges.",
      participants: "150",
      teams: "30",
      status: "Registration Open",
    },
    {
      id: 2,
      title: "Research Paper Competition",
      endDate: "February 15, 2025",
      description: "Annual research paper competition on emerging trends in civil engineering and sustainability.",
      participants: "80",
      teams: "40",
      status: "Submission Phase",
    },
  ]

  const pastEvents = [
    {
      id: 1,
      year: "2024",
      title: "CivilX Series 2024: Future of Infrastructure",
      date: "March 2024",
      description: "Successfully organized our flagship event with renowned speakers and innovative project showcases. This three-day event brought together industry leaders, academics, and students to explore the future of infrastructure development.",
      images: ["/recent/Bimg1.jpg", "/recent/techexpo1.jpg", "/recent/IITISOC1.jpg"],
      participants: "500+",
      outcome: "Best Student Event Award",
      highlights: ["5 Keynote Speakers", "50+ Project Displays", "Industry Networking", "3-Day Duration", "Live Streaming"],
      venue: "IIT Indore Auditorium",
      duration: "3 Days",
      impact: "Established partnerships with 10+ industry leaders and received national recognition",
    },
    {
      id: 2,
      year: "2024",
      title: "National Concrete Mix Design Competition",
      date: "November 2024",
      description: "Interstate competition focused on sustainable concrete technology and innovative mix designs. Teams from across India competed to develop the most sustainable and cost-effective concrete solutions.",
      images: ["/recent/Bimg2.jpg", "/recent/techexpo2.jpg", "/recent/IITISOC2.jpg"],
      participants: "200+",
      outcome: "2nd Place National",
      highlights: ["15 Teams Participated", "Industry Mentorship", "Research Publications", "Sustainability Focus", "Innovation Awards"],
      venue: "Civil Engineering Lab Complex",
      duration: "2 Days",
      impact: "Published 5 research papers and developed 3 patentable mix designs",
    },
    {
      id: 3,
      year: "2023",
      title: "Green Building Workshop Series",
      date: "September 2023",
      description: "Month-long workshop series on sustainable construction and green building certifications. Featured hands-on training with industry experts and certification programs.",
      images: ["/recent/Bimg3.jpg", "/Home/new/p1.jpg", "/Home/new/p2.jpg"],
      participants: "300+",
      outcome: "Certification Program",
      highlights: ["IGBC Partnership", "20+ Industry Experts", "Practical Training", "LEED Certification", "Green Materials"],
      venue: "Multiple Venues",
      duration: "1 Month",
      impact: "150+ students received green building certifications, 50+ projects implemented sustainable practices",
    },
    {
      id: 4,
      year: "2023",
      title: "Tech Expo: Civil Engineering Innovations",
      date: "May 2023",
      description: "Annual technology exhibition showcasing student projects and industry innovations. A platform for students to present their research and connect with industry professionals.",
      images: ["/recent/Bimg4.jpg", "/Home/new/p3.jpg", "/Home/new/p4.jpg"],
      participants: "400+",
      outcome: "Innovation Award",
      highlights: ["100+ Projects", "Live Demonstrations", "Startup Pitches", "Industry Panels", "Student Awards"],
      venue: "Campus Exhibition Hall",
      duration: "2 Days",
      impact: "Launched 5 student startups, secured funding for 10+ projects, established industry mentorship programs",
    },
  ]

  const tabs = [
    { id: "upcoming", label: "Upcoming Events", count: upcomingEvents.length },
    { id: "ongoing", label: "Ongoing Events", count: ongoingEvents.length },
    { id: "past", label: "Past Events", count: pastEvents.length },
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
            Events & Activities
          </motion.h1>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full"></div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="relative z-10 max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-400/25" : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-600/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
              <span className={`px-2 py-1 rounded-full text-xs ${activeTab === tab.id ? "bg-white/20" : "bg-slate-600/50"}`}>{tab.count}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
        {/* Upcoming Events */}
        {activeTab === "upcoming" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden hover:border-sky-400/50 transition-all duration-500 group"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-sky-500/90 text-white text-sm font-semibold rounded-full">{event.category}</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-black/70 text-white text-sm font-semibold rounded-full">{event.registrations} registered</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">{event.title}</h3>
                    <div className="space-y-2 mb-4 text-slate-300">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{event.venue}</span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">{event.description}</p>
                    <div className="flex gap-3">
                      <motion.button className="flex-1 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        Register Now
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setSelectedEvent(event)
                          setIsModalOpen(true)
                        }}
                        className="flex-1 px-4 py-2 border border-sky-400/50 text-sky-400 font-semibold rounded-lg hover:bg-sky-400/10 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Info
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Ongoing Events */}
        {activeTab === "ongoing" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Ongoing Events</h2>
            <div className="space-y-6">
              {ongoingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-sky-400/50 transition-all duration-500 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors">{event.title}</h3>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full border border-green-500/30">{event.status}</span>
                      </div>
                      <p className="text-slate-300 mb-4 leading-relaxed">{event.description}</p>
                      <div className="flex items-center gap-6 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span>Ends: {event.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM9 12a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M1 4a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm2 0h14v12H3V4z" clipRule="evenodd" />
                          </svg>
                          <span>
                            {event.participants} participants | {event.teams} teams
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Join Now
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setSelectedEvent(event)
                          setIsModalOpen(true)
                        }}
                        className="px-6 py-3 border border-sky-400/50 text-sky-400 font-semibold rounded-lg hover:bg-sky-400/10 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Past Events */}
        {activeTab === "past" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Past Events Gallery</h2>
            <div className="space-y-12">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden hover:border-sky-400/50 transition-all duration-500 group"
                  whileHover={{ y: -5 }}
                >
                  {/* Image Gallery Section */}
                  <div className="relative">
                    {/* Image Carousel */}
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", maxHeight: "500px" }}>
                      <motion.div
                        className="relative w-full h-full"
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          src={event.images[carouselIndices[event.id] || 0]}
                          alt={event.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Year and Outcome Badges */}
                        <div className="absolute top-6 left-6">
                          <span className="px-4 py-2 bg-sky-500/90 text-white text-lg font-bold rounded-full">{event.year}</span>
                        </div>
                        <div className="absolute top-6 right-6">
                          <span className="px-4 py-2 bg-green-500/90 text-white text-sm font-semibold rounded-full">{event.outcome}</span>
                        </div>
                        
                        {/* Title and Date Overlay */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">{event.title}</h3>
                          <p className="text-sky-300 text-lg font-semibold">{event.date}</p>
                        </div>
                      </motion.div>

                      {/* Previous Button */}
                      {event.images.length > 1 && (
                        <motion.button
                          onClick={() => prevSlide(event.id, event.images.length)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-lg backdrop-blur-sm transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </motion.button>
                      )}

                      {/* Next Button */}
                      {event.images.length > 1 && (
                        <motion.button
                          onClick={() => nextSlide(event.id, event.images.length)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-lg backdrop-blur-sm transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      )}
                    </div>

                    {/* Carousel Indicators */}
                    {event.images.length > 1 && (
                      <div className="flex justify-center gap-2 p-4 bg-slate-900/50">
                        {event.images.map((_, imgIndex) => (
                          <motion.button
                            key={imgIndex}
                            onClick={() => goToSlide(event.id, imgIndex)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              (carouselIndices[event.id] || 0) === imgIndex
                                ? "bg-sky-400 w-8"
                                : "bg-slate-600 w-2 hover:bg-slate-500"
                            }`}
                            whileHover={{ scale: 1.2 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Details Section */}
                  <div className="p-8">
                    {/* Event Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                          <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM9 12a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M1 4a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm2 0h14v12H3V4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-slate-400 text-sm font-medium">Participants</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{event.participants}</div>
                      </div>
                      <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                          <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-slate-400 text-sm font-medium">Venue</span>
                        </div>
                        <div className="text-lg font-semibold text-white">{event.venue}</div>
                      </div>
                      <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                          <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-slate-400 text-sm font-medium">Duration</span>
                        </div>
                        <div className="text-lg font-semibold text-white">{event.duration}</div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-slate-300 text-lg leading-relaxed">{event.description}</p>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-white mb-4">Key Highlights</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {event.highlights.map((highlight, idx) => (
                          <motion.div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/30 hover:border-sky-400/30 transition-colors duration-300" whileHover={{ scale: 1.02 }}>
                            <div className="w-2 h-2 bg-sky-400 rounded-full flex-shrink-0"></div>
                            <span className="text-slate-300 text-sm font-medium">{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Impact Section */}
                    <div className="border-t border-slate-700/50 pt-6">
                      <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Impact & Achievements
                      </h4>
                      <p className="text-slate-300 leading-relaxed bg-slate-800/30 p-4 rounded-xl border border-slate-700/30">{event.impact}</p>
                    </div>
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
              Ready to Join Our Community?
            </motion.h3>
            <motion.p className="text-xl text-slate-300 mb-8 leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
              Be part of exciting events, competitions, and workshops. Connect with fellow civil engineers and industry experts.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
              <Link href="/message-us">
                <motion.button className="px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Contact Us
                </motion.button>
              </Link>
              <Link href="/team">
                <motion.button className="px-8 py-4 border-2 border-sky-400/50 text-sky-400 font-semibold rounded-full hover:bg-sky-400/10 backdrop-blur-sm transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Meet the Team
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedEvent?.title}>
        {selectedEvent && (
          <div className="space-y-4">
            {/* For Upcoming Events */}
            {selectedEvent.category && (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Category</h3>
                  <p className="text-white text-lg">{selectedEvent.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Date & Time</h3>
                  <p className="text-white text-lg">{selectedEvent.date}</p>
                  <p className="text-sky-400">{selectedEvent.time}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Venue</h3>
                  <p className="text-white text-lg">{selectedEvent.venue}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Description</h3>
                  <p className="text-slate-300 leading-relaxed">{selectedEvent.description}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                  <p className="text-sm text-slate-400">
                    <span className="font-semibold text-sky-400">{selectedEvent.registrations}</span> students have already registered for this event!
                  </p>
                </div>
                <motion.button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Register Now
                </motion.button>
              </>
            )}

            {/* For Ongoing Events */}
            {selectedEvent.status && (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Status</h3>
                  <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full border border-green-500/30">{selectedEvent.status}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">End Date</h3>
                  <p className="text-white text-lg">{selectedEvent.endDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Description</h3>
                  <p className="text-slate-300 leading-relaxed">{selectedEvent.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-slate-400 mb-1">Participants</p>
                    <p className="text-xl font-bold text-sky-400">{selectedEvent.participants}</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-slate-400 mb-1">Teams</p>
                    <p className="text-xl font-bold text-sky-400">{selectedEvent.teams}</p>
                  </div>
                </div>
                <motion.button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Join Now
                </motion.button>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Events
