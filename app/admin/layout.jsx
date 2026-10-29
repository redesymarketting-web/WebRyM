export const dynamic = "force-dynamic";

export const metadata = {
  title: {
    default: "Panel administrativo",
    template: "%s | Panel administrativo",
  },
  description: "Panel privado de administración de Redes y Marketting.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-ink text-snow">{children}</div>;
}
