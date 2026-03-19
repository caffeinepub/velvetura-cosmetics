import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import type { Product } from "../contexts/CartContext";
import { PRODUCTS } from "../data/products";

type CategoryFilter = "All" | "Skincare" | "Makeup" | "Body Care";

const CATEGORIES: CategoryFilter[] = ["All", "Skincare", "Makeup", "Body Care"];

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const filtered: Product[] =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-gold font-body text-sm tracking-[0.25em] uppercase mb-3">
            Explore
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold gold-underline inline-block">
            Our Collection
          </h2>
          <p className="mt-8 text-muted-foreground font-body max-w-xl mx-auto">
            Curated with the finest ingredients for skin that glows from within.
          </p>
        </motion.div>

        <div className="flex justify-center mb-10">
          <Tabs
            value={activeCategory}
            onValueChange={(v) => setActiveCategory(v as CategoryFilter)}
          >
            <TabsList className="bg-velvet-beige p-1 rounded-full h-auto gap-1">
              {CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  data-ocid={`products.${cat.toLowerCase().replace(" ", "-")}.tab`}
                  className="rounded-full text-sm font-body px-5 py-2 data-[state=active]:bg-gold data-[state=active]:text-white transition-all"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
