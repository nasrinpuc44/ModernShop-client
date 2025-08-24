"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Plus,
  Minus,
} from "lucide-react";

export function ProductDetails({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary transition-colors">
          Products
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="h-9 w-9 p-0"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isWishlisted ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            <p className="text-muted-foreground mt-2">by {product.brand}</p>

            <div className="flex items-center space-x-2 mt-4">
              <div className="flex items-center">
                {[...Array(5)]?.map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-primary">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <p className="text-sm text-green-600">
                Save $
                {(
                  Number.parseFloat(product.originalPrice.slice(1)) -
                  Number.parseFloat(product.price.slice(1))
                ).toFixed(2)}
              </p>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            {product.inStock ? (
              <>
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-green-600 font-medium">In Stock</span>
                <span className="text-sm text-muted-foreground">
                  ({product.stockCount} available)
                </span>
              </>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          {product.inStock && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-9 w-9 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-3 py-2 text-sm font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockCount}
                    className="h-9 w-9 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  Buy Now
                </Button>
              </div>
            </div>
          )}

          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">
                  On orders over $100
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">2 Year Warranty</p>
                <p className="text-xs text-muted-foreground">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <RotateCcw className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">30-Day Returns</p>
                <p className="text-xs text-muted-foreground">
                  No questions asked
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
