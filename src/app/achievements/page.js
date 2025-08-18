import CivilEngineeringBackground from "../../components/CivilEngineeringBackground"
import Navbar from "../../components/Navbar"
import Achievements from "../../components/Achievements"
import Footer from "../../components/Footer"

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
