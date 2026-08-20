import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import FollowSection from "@/components/FollowSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />

      {/* This wrapper sits above the fixed hero video, covering it on scroll */}
      <div className="relative z-10 bg-negro">
        <AboutSection />
        <EventsSection />
        <GallerySection />
        <FollowSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
