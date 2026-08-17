import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";

const sans    = Inter({ subsets: ["latin"], weight: ["300","400","500"], variable: "--font-sans" });
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["300","400","600","700"], style: ["normal","italic"], variable: "--font-display" });
const heading = Bebas_Neue({ subsets: ["latin"], weight: ["400"], variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://focustm.com"),
  title: { default: "FocusTM Collection | Excellence Is The Standard", template: "%s | FocusTM Collection" },
  description: "FocusTM Collection — customized focus tops, shirts, caps and wears. Style meets confidence, elegance meets excellence. Explore. Shop. Elevate.",
  keywords: ["FocusTM", "Nigerian streetwear", "custom apparel Lagos", "customized shirts Nigeria", "luxury streetwear", "FTM collection"],
  openGraph: {
    title: "FocusTM Collection",
    description: "Excellence Is The Standard.",
    type: "website",
    siteName: "FocusTM Collection",
    images: ["/logo.png"],
  },
  twitter: { card: "summary_large_image", title: "FocusTM Collection", description: "Excellence Is The Standard." },
  icons: { icon: "/logo.png" },
};

// Runs before paint to avoid a flash of the wrong theme on load.
const noFlashScript = `
try {
  var t = localStorage.getItem('ftm-theme');
  if (t === 'light') document.documentElement.classList.add('light');
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${heading.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="bg-ftm-black text-ftm-white font-sans antialiased font-light">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster
              position="top-center"
              toastOptions={{ style: { background: "rgb(var(--ftm-charcoal))", color: "rgb(var(--ftm-white))", border: "1px solid rgb(var(--ftm-line))", fontSize: "11px", letterSpacing: "0.08em" } }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
