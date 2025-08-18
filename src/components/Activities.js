"use client"

import React from "react"
import { motion } from "framer-motion"
import { LensDemo } from "./LensDemo"

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: "Bridge Making Competition",
      subtitle: "Engineering Excellence in Action",
      description:
        "The Bridge Making Competition at IIT Indore is an exciting and intellectually stimulating event that fosters creativity, engineering acumen, and teamwork among participants. This competition challenges students to apply theoretical knowledge in a practical setting, combining physics, structural engineering, and innovative design to construct durable, efficient bridges.",
      images: ["/recent/Bimg1.jpg", "/recent/Bimg2.jpg", "/recent/Bimg3.jpg", "/recent/Bimg4.jpg"],
      gradient: "from-cyan-400/20 to-blue-400/20",
    },
    {
      id: 2,
      title: "IITI Summer Of Code",
      subtitle: "Innovation Through Technology",
      description:
        "The IITI SOC Concrete Club successfully held its recent event, featuring workshops and discussions on innovative concrete technology. It was a great platform for students to engage and learn from industry experts, highlighting the importance of sustainable construction and future advancements in civil engineering.",
      images: ["/recent/IITISOC1.jpg", "/recent/IITISOC2.jpg"],
      gradient: "from-purple-400/20 to-pink-400/20",
    },
    {
      id: 3,
      title: "Technical Exhibition",
      subtitle: "Showcasing Future Technologies",
      description: "Our technical exhibition provides a platform for students to showcase their innovative projects and research in civil engineering. From sustainable building materials to smart infrastructure solutions, this event highlights the cutting-edge work being done by our club members.",
      images: ["/recent/techexpo1.jpg", "/recent/techexpo2.jpg"],
      gradient: "from-pink-400/20 to-cyan-400/20",
    },
  ]

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        {activities.map((activity, index) => (
          <motion.section key={activity.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.2 }} className="mb-24 last:mb-0">
            {/* Activity Header */}
            <div className="text-center mb-16">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-block">
                <span className="text-cyan-400 text-lg font-semibold tracking-wider uppercase mb-2 block">Activity {activity.id}</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{activity.title}</h2>
                <p className="text-xl text-purple-300 mb-6">{activity.subtitle}</p>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
              </motion.div>
            </div>

            {/* Content Container */}
            <div className={`bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 md:p-12 hover:border-cyan-400/50 transition-all duration-500 bg-gradient-to-br ${activity.gradient}`}>
              {/* Description */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-12">
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed text-center max-w-4xl mx-auto">{activity.description}</p>
              </motion.div>

              {/* Images Grid */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className={`grid gap-6 ${activity.images.length === 4 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`}>
                {activity.images.map((img, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="group">
                    <div className="relative overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300">
                      <LensDemo image={img} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Activity Stats or Features */}
              {activity.id === 1 && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Participants", value: "100+" },
                    { label: "Teams", value: "25+" },
                    { label: "Bridges Built", value: "50+" },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                      <div className="text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Separator */}
            {index < activities.length - 1 && <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="mt-16 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />}
          </motion.section>
        ))}
      </div>
    </div>
  )
}

export default Activities
