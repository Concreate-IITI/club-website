"use client"

import React from "react"
import { motion } from "framer-motion"

/**
 * Individual contact info card
 */
const ContactInfoCard = ({ info, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-sky-400/50 transition-all duration-500 group"
    whileHover={{ scale: 1.02, x: 5 }}
  >
    <div className="flex items-start gap-4">
      <div
        className={`p-3 bg-gradient-to-r ${info.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}
      >
        <div className="text-white">{info.icon}</div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
          {info.title}
        </h3>
        <div className="space-y-1">
          {info.details.map((detail, idx) => (
            <p key={idx} className="text-slate-300 text-sm">
              {detail}
            </p>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)

/**
 * Contact info data
 */
export const CONTACT_INFO_DATA = [
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: "Our Location",
    details: ["IIT Indore, Simrol", "Indore, MP 453552", "India"],
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    ),
    title: "Email Us",
    details: ["concreate@iiti.ac.in", "General Inquiries", "Project Collaborations"],
    color: "from-green-400 to-green-600",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: "Response Time",
    details: ["24-48 hours", "Monday to Friday", "Quick Support"],
    color: "from-sky-400 to-cyan-600",
  },
]

/**
 * Contact information sidebar
 */
const ContactInfo = ({ contactInfo = CONTACT_INFO_DATA }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="space-y-8"
  >
    <div className="space-y-6">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Let's Build the Future Together
      </motion.h2>
      <motion.p
        className="text-lg text-slate-300 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Whether you're a fellow civil engineering enthusiast, industry professional, potential
        collaborator, or simply curious about our innovative projects, we're always excited to
        connect with passionate individuals who share our vision for the future of infrastructure.
      </motion.p>
    </div>

    <div className="space-y-6">
      {contactInfo.map((info, index) => (
        <ContactInfoCard key={index} info={info} index={index} />
      ))}
    </div>
  </motion.div>
)

export default ContactInfo
export { ContactInfoCard }
