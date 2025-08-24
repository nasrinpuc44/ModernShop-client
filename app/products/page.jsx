import { Navbar } from "@/components/Navbar";
import { ProductsGrid } from "@/components/ProductGrid";
import { ProductsHeader } from "@/components/ProductsHeader";

 

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductsHeader />
        <ProductsGrid />
      </div>
    </div>
  )
}
