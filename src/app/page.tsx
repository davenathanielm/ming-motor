import Image from "next/image";
import ProfilePage from "./profile/page";
import Topbar from "./components/layout/topbar";
import Navbar from "./components/layout/navbar";
import LayoutComponent from "./components/layout/layoutComponent";
import Dashboard from "./(pages)/dashboard/page";

export default function Home() {
  return (
      <Dashboard/>
  );
}
