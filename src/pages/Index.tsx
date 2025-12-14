import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedDrones } from "@/components/FeaturedDrones";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedDrones />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
