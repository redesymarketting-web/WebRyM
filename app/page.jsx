import Hero from "@/components/Hero";
import QueHacemos from "@/components/QueHacemos";
import Nichos from "@/components/Nichos";
import SobreMi from "@/components/SobreMi";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { obtenerContenidoLanding } from "@/lib/publico/landing";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const { inicio, tarjetas, nichos, sobre } =
    await obtenerContenidoLanding();

  return (
    <main className="bg-ink">
      <Navbar />
      <Hero seccion={inicio} tarjetas={tarjetas} />
      <QueHacemos />
      <Nichos nichos={nichos} />
      <SobreMi contenido={sobre} />
      <Footer />
    </main>
  );
}