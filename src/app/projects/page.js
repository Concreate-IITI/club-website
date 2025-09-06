import CivilEngineeringBackground from "../../components/CivilEngineeringBackground"
import Navbar from "../../components/Navbar"
import Projects from "../../components/Projects"
import Footer from "../../components/Footer"

export const metadata = {
  title: "Projects - Concreate Club",
  description: "Ongoing and completed projects by the Concreate Club at IIT Indore",
}

export default function ProjectsPage() {
  return (
    <>
      <CivilEngineeringBackground />
      <Navbar />
      <Projects />
      <Footer />
    </>
  )
}
