import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-quality sound with noise cancellation technology",
    price: "$299.99",
    image: "/premium-wireless-headphones.png",
    rating: 4.8,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your health and fitness goals with advanced sensors",
    price: "$199.99",
    image: "/smart-fitness-watch.png",
    rating: 4.6,
    badge: "New",
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    description: "Comfortable seating solution for long work sessions",
    price: "$449.99",
    image: "/ergonomic-office-chair.png",
    rating: 4.9,
    badge: "Popular",
  },
]

export function ProductHighlights() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Featured Products</h2>
          <p className="mt-4 text-lg text-muted-foreground">Discover our most popular and highly-rated products</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden transition-all hover:shadow-lg">
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-64 w-full object-cover transition-transform group-hover:scale-105"
                />
                <Badge className="absolute top-4 left-4" variant="secondary">
                  {product.badge}
                </Badge>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <Button asChild>
                    <Link href={`/products/${product.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
