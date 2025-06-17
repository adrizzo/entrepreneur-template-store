import { ProductGrid } from "@/components/ProductGrid"
import { HeroSection } from "@/components/HeroSection"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <main className="container mx-auto px-4 py-12">
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <ProductGrid />
        </section>
      </main>
    </div>
  );
}
