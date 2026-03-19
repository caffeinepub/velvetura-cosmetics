import { ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Product } from "../contexts/CartContext";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Skincare: "bg-velvet-pink/60 text-foreground",
  Makeup: "bg-accent text-foreground",
  "Body Care": "bg-velvet-beige text-foreground",
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-luxury transition-shadow duration-300"
    >
      {product.isBestSeller && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-gold text-white text-xs font-body font-medium px-2.5 py-1 rounded-full">
          <Star className="w-3 h-3 fill-white" />
          Best Seller
        </div>
      )}

      <div className="relative overflow-hidden aspect-square bg-velvet-beige">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <span
          className={`text-xs font-body px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[product.category]}`}
        >
          {product.category}
        </span>
        <h3 className="font-heading text-base font-semibold mt-2 mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground font-body leading-relaxed mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg font-bold text-foreground">
            ${product.price}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            data-ocid={`product.${product.id}.button`}
            className="flex items-center gap-1.5 bg-foreground text-background text-xs font-body px-4 py-2 rounded-full hover:bg-gold hover:text-white transition-colors duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
