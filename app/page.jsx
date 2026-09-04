import Hero from "@/components/Hero";
import QueHacemos from "@/components/QueHacemos";
import Nichos from "@/components/Nichos";
import SobreMi from "@/components/SobreMi";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-ink">
      <Navbar />
      <Hero />
      <QueHacemos />
      <Nichos />
      <SobreMi />
      <Footer />
    </main>
  );
}