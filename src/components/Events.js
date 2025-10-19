"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Modal from "./Modal"
import RegistrationModal from "./RegistrationModal"

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)
  const [registrationEvent, setRegistrationEvent] = useState(null)
  const [carouselIndices, setCarouselIndices] = useState({})
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [ongoingEvents, setOngoingEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/events")
      const data = await response.json()

      if (data.success) {
        const upcoming = data.data.filter((e) => e.type === "upcoming" && e.isActive)
        const ongoing = data.data.filter((e) => e.type === "ongoing" && e.isActive)
        const past = data.data.filter((e) => e.type === "past" && e.isActive)

        setUpcomingEvents(upcoming)
        setOngoingEvents(ongoing)
        setPastEvents(past)
      }
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterClick = (event) => {
    if (event.registrationEnabled && event.registrationForm?.length > 0) {
      setRegistrationEvent(event)
      setIsRegistrationModalOpen(true)
    }
  }

  const handleJoinClick = (event) => {
    if (event.registrationEnabled && event.registrationForm?.length > 0) {
      setRegistrationEvent(event)
      setIsRegistrationModalOpen(true)
    }
  }

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
                    <img src={event.images?.[0]?.url || "/recent/techexpo1.jpg"} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {event.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-sky-500/90 text-white text-sm font-semibold rounded-full">{event.category}</span>
                      </div>
                    )}
                    {event.registrations && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-black/70 text-white text-sm font-semibold rounded-full">{event.registrations} registered</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">{event.title}</h3>
                    <div className="space-y-2 mb-4 text-slate-300">
                      {event.date && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">{event.date}</span>
                        </div>
                      )}
                      {event.time && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">{event.time}</span>
                        </div>
                      )}
                      {event.venue && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">{event.venue}</span>
                        </div>
                      )}
                    </div>
                    {event.description && <p className="text-slate-400 text-sm mb-4 leading-relaxed">{event.description}</p>}
                    <div className="flex gap-3">
                      {event.registrationEnabled && (
                        <motion.button
                          onClick={() => handleRegisterClick(event)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Register Now
                        </motion.button>
                      )}
                      <motion.button
                        onClick={() => {
                          setSelectedEvent(event)
                          setIsModalOpen(true)
                        }}
                        className={`${event.registrationEnabled ? "flex-1" : "w-full"} px-4 py-2 border border-sky-400/50 text-sky-400 font-semibold rounded-lg hover:bg-sky-400/10 transition-all duration-300`}
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
                      {event.registrationEnabled && (
                        <motion.button
                          onClick={() => handleJoinClick(event)}
                          className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Join Now
                        </motion.button>
                      )}
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
                      <motion.div className="relative w-full h-full" animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <img src={event.images?.[carouselIndices[event._id] || 0]?.url || "/recent/Bimg1.jpg"} alt={event.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                        {/* Year and Outcome Badges */}
                        {event.year && (
                          <div className="absolute top-6 left-6">
                            <span className="px-4 py-2 bg-sky-500/90 text-white text-lg font-bold rounded-full">{event.year}</span>
                          </div>
                        )}
                        {event.outcome && (
                          <div className="absolute top-6 right-6">
                            <span className="px-4 py-2 bg-green-500/90 text-white text-sm font-semibold rounded-full">{event.outcome}</span>
                          </div>
                        )}

                        {/* Title and Date Overlay */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">{event.title}</h3>
                          {event.date && <p className="text-sky-300 text-lg font-semibold">{event.date}</p>}
                        </div>
                      </motion.div>

                      {/* Previous Button */}
                      {event.images && event.images.length > 1 && (
                        <motion.button
                          onClick={() => prevSlide(event._id, event.images.length)}
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
                      {event.images && event.images.length > 1 && (
                        <motion.button
                          onClick={() => nextSlide(event._id, event.images.length)}
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
                    {event.images && event.images.length > 1 && (
                      <div className="flex justify-center gap-2 p-4 bg-slate-900/50">
                        {event.images.map((_, imgIndex) => (
                          <motion.button
                            key={imgIndex}
                            onClick={() => goToSlide(event._id, imgIndex)}
                            className={`h-2 rounded-full transition-all duration-300 ${(carouselIndices[event._id] || 0) === imgIndex ? "bg-sky-400 w-8" : "bg-slate-600 w-2 hover:bg-slate-500"}`}
                            whileHover={{ scale: 1.2 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Details Section */}
                  <div className="p-8">
                    {/* Event Info Grid */}
                    {(event.participants || event.venue || event.duration) && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {event.participants && (
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
                        )}
                        {event.venue && (
                          <div className="text-center md:text-left">
                            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                              <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-slate-400 text-sm font-medium">Venue</span>
                            </div>
                            <div className="text-lg font-semibold text-white">{event.venue}</div>
                          </div>
                        )}
                        {event.duration && (
                          <div className="text-center md:text-left">
                            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                              <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                              <span className="text-slate-400 text-sm font-medium">Duration</span>
                            </div>
                            <div className="text-lg font-semibold text-white">{event.duration}</div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    {event.description && (
                      <div className="mb-6">
                        <p className="text-slate-300 text-lg leading-relaxed">{event.description}</p>
                      </div>
                    )}

                    {/* Highlights */}
                    {event.highlights && event.highlights.length > 0 && (
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
                    )}

                    {/* Impact Section */}
                    {event.impact && (
                      <div className="border-t border-slate-700/50 pt-6">
                        <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Impact & Achievements
                        </h4>
                        <p className="text-slate-300 leading-relaxed bg-slate-800/30 p-4 rounded-xl border border-slate-700/30">{event.impact}</p>
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
            {selectedEvent.type === "upcoming" && (
              <>
                {selectedEvent.category && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 mb-2">Category</h3>
                    <p className="text-white text-lg">{selectedEvent.category}</p>
                  </div>
                )}
                {selectedEvent.date && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 mb-2">Date & Time</h3>
                    <p className="text-white text-lg">{selectedEvent.date}</p>
                    {selectedEvent.time && <p className="text-sky-400">{selectedEvent.time}</p>}
                  </div>
                )}
                {selectedEvent.venue && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 mb-2">Venue</h3>
                    <p className="text-white text-lg">{selectedEvent.venue}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Description</h3>
                  <p className="text-slate-300 leading-relaxed">{selectedEvent.description}</p>
                </div>
                {selectedEvent.registrations && (
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                    <p className="text-sm text-slate-400">
                      <span className="font-semibold text-sky-400">{selectedEvent.registrations}</span> students have already registered for this event!
                    </p>
                  </div>
                )}
                {selectedEvent.registrationEnabled && (
                  <motion.button
                    onClick={() => {
                      setIsModalOpen(false)
                      handleRegisterClick(selectedEvent)
                    }}
                    className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Register Now
                  </motion.button>
                )}
              </>
            )}

            {/* For Ongoing Events */}
            {selectedEvent.type === "ongoing" && (
              <>
                {selectedEvent.status && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 mb-2">Status</h3>
                    <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full border border-green-500/30">{selectedEvent.status}</span>
                  </div>
                )}
                {selectedEvent.endDate && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 mb-2">End Date</h3>
                    <p className="text-white text-lg">{selectedEvent.endDate}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Description</h3>
                  <p className="text-slate-300 leading-relaxed">{selectedEvent.description}</p>
                </div>
                {(selectedEvent.participants || selectedEvent.teams) && (
                  <div className="grid grid-cols-2 gap-4">
                    {selectedEvent.participants && (
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center">
                        <p className="text-sm text-slate-400 mb-1">Participants</p>
                        <p className="text-xl font-bold text-sky-400">{selectedEvent.participants}</p>
                      </div>
                    )}
                    {selectedEvent.teams && (
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center">
                        <p className="text-sm text-slate-400 mb-1">Teams</p>
                        <p className="text-xl font-bold text-sky-400">{selectedEvent.teams}</p>
                      </div>
                    )}
                  </div>
                )}
                {selectedEvent.registrationEnabled && (
                  <motion.button
                    onClick={() => {
                      setIsModalOpen(false)
                      handleJoinClick(selectedEvent)
                    }}
                    className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-400/25 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join Now
                  </motion.button>
                )}
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isRegistrationModalOpen} onClose={() => setIsRegistrationModalOpen(false)} event={registrationEvent} />
    </div>
  )
}

export default Events
