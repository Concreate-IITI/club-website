import CivilEngineeringBackground from "../../components/CivilEngineeringBackground"
import Navbar from "../../components/Navbar"
import NewMessageUs from "../../components/NewMessageUs"
import Footer from "../../components/Footer"

export const metadata = {
  title: "Contact Us - Concreate Club",
  description: "Get in touch with the Concreate Club at IIT Indore",
}

export default function MessageUsPage() {
  return (
    <>
      <CivilEngineeringBackground />
      <Navbar />
      <NewMessageUs />
      <Footer />
    </>
  )
}
