import { motion } from "motion/react";

const PILLARS = [
  { emoji: "🐰", label: "Cruelty Free" },
  { emoji: "🚫", label: "Paraben Free" },
  { emoji: "🔬", label: "Dermatologist Tested" },
  { emoji: "🌿", label: "Sustainably Sourced" },
  { emoji: "🌱", label: "Vegan Formulas" },
  { emoji: "✅", label: "GMP Certified" },
];

export function IngredientsSection() {
  return (
    <section id="ingredients" className="py-24 bg-velvet-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold font-body text-sm tracking-[0.25em] uppercase mb-4">
              Quality Assurance
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Pure. Proven.
              <br />
              <span className="italic">Premium.</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed text-base">
              Every Velvetura formula is crafted with clinically-proven,
              ethically-sourced ingredients. We are cruelty-free, paraben-free,
              and committed to sustainable luxury. Our products undergo rigorous
              dermatological testing to ensure the highest safety and efficacy
              standards.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-gold font-heading italic">Est. 2018</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-2xl p-5 text-center shadow-card hover:shadow-luxury transition-shadow duration-200"
              >
                <div className="text-3xl mb-3">{p.emoji}</div>
                <p className="font-body text-sm font-medium">{p.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
