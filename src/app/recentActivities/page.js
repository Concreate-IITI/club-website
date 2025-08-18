import CivilEngineeringBackground from "../../components/CivilEngineeringBackground"
import Navbar from "../../components/Navbar"
import RecentActivities from "../../components/RecentActivities"
import Footer from "../../components/Footer"

export const metadata = {
  title: "Recent Activities - Concreate Club",
  description: "Recent activities and events by the Concreate Club at IIT Indore",
}

export default function RecentActivitiesPage() {
  return (
    <>
      <CivilEngineeringBackground />
      <Navbar />
      <RecentActivities />
      <Footer />
    </>
  )
}
