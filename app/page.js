import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProductHighlights } from "@/components/ProductHighlights";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProductHighlights />
      <Footer />
    </div>
  );
}
