import { Star } from "lucide-react";
import { motion } from "motion/react";

const TESTIMONIALS = [
  {
    name: "Sophia L.",
    stars: 5,
    text: "The Radiance Serum transformed my skin in just 2 weeks. I've never felt more confident!",
    product: "Radiance Serum",
    initials: "SL",
  },
  {
    name: "Emma R.",
    stars: 5,
    text: "Velvetura's moisturizer is the most luxurious product I've ever used. Worth every penny.",
    product: "Velvet Moisturizer",
    initials: "ER",
  },
  {
    name: "Amara J.",
    stars: 5,
    text: "The Golden Hour Palette is stunning. I get compliments every time I wear it.",
    product: "Golden Hour Palette",
    initials: "AJ",
  },
  {
    name: "Claire M.",
    stars: 4,
    text: "Love the Rose Body Lotion — my skin feels so soft and smells incredible!",
    product: "Rose Body Lotion",
    initials: "CM",
  },
  {
    name: "Nina P.",
    stars: 5,
    text: "Finally a brand that delivers on its promises. Quality is exceptional.",
    product: "Multiple Products",
    initials: "NP",
  },
];

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_KEYS.map((key, i) => (
        <Star
          key={key}
          className={`w-3.5 h-3.5 ${
            i < count ? "fill-gold text-gold" : "text-muted-foreground/40"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-eyebrow mb-4">Testimonials</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold gold-underline inline-block">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              data-ocid={`reviews.item.${i + 1}`}
              className="bg-card rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-shadow duration-400 flex flex-col gap-5 border border-border/60"
            >
              <StarRating count={t.stars} />
              <p className="font-body text-sm text-foreground/70 leading-relaxed flex-1 luxury-quote">
                {t.text}
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                <div className="w-9 h-9 rounded-full bg-velvet-pink/70 flex items-center justify-center text-xs font-heading font-semibold text-gold">
                  {t.initials}
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold tracking-tight">
                    {t.name}
                  </p>
                  <p className="text-xs text-gold/80 font-body mt-0.5">
                    {t.product}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
