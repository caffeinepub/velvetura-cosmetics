import { motion } from "motion/react";
import { ProductCard } from "../components/ProductCard";
import { BEST_SELLERS } from "../data/products";

export function BestSellersSection() {
  return (
    <section id="best-sellers" className="py-24 bg-velvet-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-gold font-body text-sm tracking-[0.25em] uppercase mb-3">
            Fan Favorites
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Our Best Sellers
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4 mb-6" />
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            The products our customers love most, time and time again.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {BEST_SELLERS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
