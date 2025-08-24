"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

// Mock product data

export function ProductsGrid() {
  const [Products, setProducts] = useState([]);
  console.log(Products);
  useEffect(() => {
    const getProducts = async () => {
      const result = await fetch(
        "https://nextserver-black.vercel.app/product",
        {
          cache: "no-cache",
        }
      );

      const data = await result.json();

      setProducts(data);
    };

    getProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Products.map((product) => (
        <Card
          key={product.id}
          className="group overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="h-64 w-full object-cover transition-transform group-hover:scale-105"
            />
            {product.badge && (
              <Badge
                className="absolute top-4 left-4"
                variant={product.badge === "Sale" ? "destructive" : "secondary"}
              >
                {product.badge}
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <Badge variant="outline" className="bg-background">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg line-clamp-1">
                  {product.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {product.category}
                </p>
              </div>
              <div className="flex items-center space-x-1 ml-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{product.rating} 5</span>
                <span className="text-xs text-muted-foreground">
                  ({product.reviews})
                </span>
              </div>
            </div>
            <CardDescription className="line-clamp-2">
              {product.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-primary">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <Button asChild className="w-full" disabled={!product.inStock}>
              <Link href={`/products/${product._id}`}>
                {product.inStock ? (
                  <>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Out of Stock"
                )}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
