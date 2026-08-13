import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import AboutSection from "@/components/AboutSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Callout from "@/components/Callout";
import SocialBar from "@/components/SocialBar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <AboutSection />
      <FeaturedProducts />
      <Callout />
      <SocialBar />
    </>
  );
}
