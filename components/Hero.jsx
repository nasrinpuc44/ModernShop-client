import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Star, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-primary/20 transition-colors">
              Discover amazing products at great prices.{" "}
              <Link href="/products" className="font-semibold text-primary">
                <span className="absolute inset-0" aria-hidden="true" />
                Shop now <ArrowRight className="inline h-4 w-4" />
              </Link>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Your Modern <span className="text-primary">Shopping</span> Experience
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Discover a curated collection of premium products with seamless shopping experience. From electronics to
            fashion, find everything you need in one place.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="px-8">
              <Link href="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Premium Quality</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center">
                Carefully curated products from trusted brands
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Easy Shopping</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center">
                Intuitive interface for seamless browsing and purchasing
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Community Driven</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center">
                Join thousands of satisfied customers worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
