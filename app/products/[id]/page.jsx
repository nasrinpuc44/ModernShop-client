"use client";

import { Navbar } from "@/components/Navbar";
import { ProductDetails } from "@/components/ProductDetails";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

// Mock product data - in a real app, this would come from a database

export default function ProductDetailsPage({ params }) {
  const [product, setproduct] = useState({});
  console.log(product); 
  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(
        `https://nextserver-black.vercel.app/product/${params.id}`
      );

      const data = await res.json();

      setproduct(data[0]);
    };

    getProduct();
  }, []);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetails product={product} />
      </div>
    </div>
  );
}
