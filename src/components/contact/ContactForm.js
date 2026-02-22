"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

/**
 * Form input field component
 */
const FormField = ({ label, name, type = "text", value, onChange, required, maxLength, placeholder, disabled, rows }) => {
  const baseClasses =
    "w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300"

  return (
    <div>
      <label className="block text-sm font-semibold text-white mb-2">
        {label} {required && "*"}
      </label>
      {type === "textarea" ? (
        <>
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows || 6}
            maxLength={maxLength}
            className={`${baseClasses} resize-none`}
            placeholder={placeholder}
            disabled={disabled}
          />
          {maxLength && (
            <div className="text-right mt-2">
              <span className="text-xs text-slate-500">
                {value.length}/{maxLength}
              </span>
            </div>
          )}
        </>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          className={baseClasses}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    </div>
  )
}

/**
 * Status message component
 */
const StatusMessage = ({ status }) => {
  if (!status.message) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-6 p-4 rounded-xl border ${
        status.type === "success"
          ? "bg-green-500/20 border-green-500/50 text-green-300"
          : "bg-red-500/20 border-red-500/50 text-red-300"
      }`}
    >
      <div className="flex items-center gap-2">
        {status.type === "success" ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {status.message}
      </div>
    </motion.div>
  )
}

/**
 * Submit button component
 */
const SubmitButton = ({ isSubmitting }) => (
  <motion.button
    type="submit"
    disabled={isSubmitting}
    className="w-full py-4 px-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 disabled:from-sky-800 disabled:to-blue-800 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-sky-400/25"
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
  >
    {isSubmitting ? (
      <>
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        Sending Message...
      </>
    ) : (
      <>
        Send Message
        <svg
          className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </>
    )}
  </motion.button>
)

/**
 * Contact form component
 */
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (submitStatus.message) {
      setSubmitStatus({ type: "", message: "" })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: "", message: "" })

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: data.message,
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        let errorMessage = data.message || "Failed to send message"
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          const errorDetails = data.errors.map((err) => err.message || err).join(", ")
          errorMessage = errorDetails
        }
        setSubmitStatus({
          type: "error",
          message: errorMessage,
        })
      }
    } catch (error) {
      console.error("Submit error:", error)
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-sky-400/50 transition-all duration-500">
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Send us a Message
        </motion.h3>

        <StatusMessage status={submitStatus} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="Your full name"
              disabled={isSubmitting}
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              disabled={isSubmitting}
            />
          </div>

          <FormField
            label="Phone (Optional)"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            maxLength={20}
            placeholder="+91 9876543210"
            disabled={isSubmitting}
          />

          <FormField
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            maxLength={200}
            placeholder="What's this about?"
            disabled={isSubmitting}
          />

          <FormField
            label="Message"
            name="message"
            type="textarea"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            maxLength={2000}
            placeholder="Tell us about your inquiry, project idea, or how you'd like to collaborate..."
            disabled={isSubmitting}
          />

          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </div>
    </motion.div>
  )
}

export default ContactForm
export { FormField, StatusMessage, SubmitButton }
