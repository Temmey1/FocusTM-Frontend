import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const heading = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "FocusTM Collection | Excellence Is The Standard",
  description:
    "FocusTM Collection — customized focus tops, shirts, caps and wears. Style meets confidence, elegance meets excellence. Explore. Shop. Elevate.",
  openGraph: {
    title: "FocusTM Collection",
    description: "Excellence Is The Standard.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${heading.variable}`}>
      <body className="bg-ftm-black text-ftm-white font-sans antialiased font-light">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#161616",
              color: "#f2f0ed",
              border: "1px solid #2e2e2e",
              fontSize: "11px",
              letterSpacing: "0.08em",
            },
          }}
        />
      </body>
    </html>
  );
}
