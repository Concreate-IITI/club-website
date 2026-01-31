import CivilEngineeringBackground from "@/components/CivilEngineeringBackground"
import { Navbar, Footer } from "@/components/layout"
import Achievements from "@/components/Achievements"

export const metadata = {
  title: "Achievements - Concreate Club",
  description: "Achievements and accomplishments by the Concreate Club at IIT Indore",
}

export default function AchievementsPage() {
  return (
    <>
      <CivilEngineeringBackground />
      <Navbar />
      <Achievements />
      <Footer />
    </>
  )
}
