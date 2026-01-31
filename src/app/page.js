import CivilEngineeringBackground from "@/components/CivilEngineeringBackground"
import { Navbar, Footer } from "@/components/layout"
import { HomePage } from "@/components/home"

export default function Home() {
  return (
    <>
      <CivilEngineeringBackground />
      <Navbar />
      <HomePage />
      <Footer />
    </>
  )
}
