"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { PageHero } from "@/components/common"
import StatisticsSection from "./StatCard"
import AchievementTimeline from "./AchievementTimeline"
import FieldsOfExcellence from "./FieldsOfExcellence"

/**
 * Custom hook for counter animation
 */
const useCounterAnimation = (targets) => {
  const [counters, setCounters] = useState({})
  const animationIntervalRef = useRef(null)

  useEffect(() => {
    if (!targets || Object.keys(targets).length === 0) return

    const duration = 2000
    const steps = 50
    const stepTime = duration / steps
    const initialCounters = {}

    Object.keys(targets).forEach((key) => {
      initialCounters[key] = 0
    })

    setCounters(initialCounters)

    const intervalId = setInterval(() => {
      setCounters((prev) => {
        const newCounters = { ...prev }
        let allReached = true

        Object.keys(targets).forEach((key) => {
          if (newCounters[key] < targets[key]) {
            newCounters[key] = Math.min(
              newCounters[key] + Math.ceil(targets[key] / steps),
              targets[key]
            )
            allReached = false
          }
        })

        if (allReached) {
          clearInterval(intervalId)
          animationIntervalRef.current = null
        }

        return newCounters
      })
    }, stepTime)

    animationIntervalRef.current = intervalId

    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current)
      }
    }
  }, [targets])

  return counters
}

/**
 * Achievements page component
 */
const AchievementsPage = () => {
  const [statistics, setStatistics] = useState([])
  const [achievementFields, setAchievementFields] = useState([])
  const [timelineAchievements, setTimelineAchievements] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [counterTargets, setCounterTargets] = useState({})

  const counters = useCounterAnimation(counterTargets)

  useEffect(() => {
    fetchPageSettings()
    fetchAchievements()
  }, [])

  const fetchPageSettings = async () => {
    try {
      const response = await fetch("/api/page-settings?page=achievements")
      const data = await response.json()

      if (data.success) {
        // Set stats cards
        const sortedStats = (data.data.statsCards || []).sort((a, b) => a.order - b.order)
        setStatistics(sortedStats)

        // Build counter targets
        const targets = {}
        sortedStats.forEach((stat, index) => {
          targets[`stat${index}`] = stat.number
        })
        setCounterTargets(targets)

        // Set fields of excellence
        const sortedFields = (data.data.fieldsOfExcellence || []).sort((a, b) => a.order - b.order)
        setAchievementFields(sortedFields)
      }
    } catch (error) {
      console.error("Error fetching page settings:", error)
    }
  }

  const fetchAchievements = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/achievements")
      const data = await response.json()

      if (data.success) {
        // Group achievements by year
        const grouped = data.data.reduce((acc, achievement) => {
          const year = achievement.year
          if (!acc[year]) {
            acc[year] = {
              year: year,
              achievements: [],
            }
          }
          acc[year].achievements.push(achievement)
          return acc
        }, {})

        // Convert to array and sort by year descending
        const groupedArray = Object.values(grouped).sort((a, b) => b.year.localeCompare(a.year))
        setTimelineAchievements(groupedArray)
      }
    } catch (error) {
      console.error("Error fetching achievements:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      <PageHero title="Our Achievements" />

      <StatisticsSection statistics={statistics} counters={counters} />

      <AchievementTimeline timelineAchievements={timelineAchievements} isLoading={isLoading} />

      <FieldsOfExcellence achievementFields={achievementFields} />
    </div>
  )
}

export default AchievementsPage
