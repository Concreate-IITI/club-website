import CivilEngineeringBackground from "../../components/CivilEngineeringBackground"
import Navbar from "../../components/Navbar"
import TeamMembers from "../../components/TeamMembers"
import Footer from "../../components/Footer"

export const metadata = {
  title: "Team Members - Concreate Club",
  description: "Meet the team members of the Concreate Club at IIT Indore",
}

export default function TeamPage() {
  return (
    <>
      <CivilEngineeringBackground />
      <Navbar />
      <TeamMembers />
      <Footer />
    </>
  )
}
