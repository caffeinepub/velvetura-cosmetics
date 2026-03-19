import { Heart, Leaf, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";

const VALUES = [
  {
    icon: Heart,
    label: "Purity",
    desc: "Only the finest, ethically-sourced ingredients.",
  },
  {
    icon: Sparkles,
    label: "Innovation",
    desc: "Science-backed formulas for real results.",
  },
  {
    icon: Leaf,
    label: "Sustainability",
    desc: "Eco-conscious from sourcing to packaging.",
  },
  {
    icon: Users,
    label: "Inclusivity",
    desc: "Beauty for every skin tone and type.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-velvet-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold font-body text-sm tracking-[0.25em] uppercase mb-4">
              Our Story
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Born from a Passion
              <br />
              <span className="italic">for Pure Beauty</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6 text-base">
              Velvetura Cosmetics was founded to bring luxurious, science-backed
              skincare and makeup to every woman. We believe beauty is
              confidence — and every woman deserves to feel radiant in her own
              skin.
            </p>
            <div className="space-y-4">
              <div className="border-l-2 border-gold pl-5">
                <p className="font-heading font-semibold mb-1">Our Mission</p>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  To empower every woman with premium beauty essentials that
                  nourish, protect, and enhance.
                </p>
              </div>
              <div className="border-l-2 border-gold pl-5">
                <p className="font-heading font-semibold mb-1">Our Vision</p>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  A world where every woman feels radiant and confident.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-5"
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                className="bg-card p-6 rounded-2xl shadow-card"
              >
                <div className="w-10 h-10 bg-velvet-pink rounded-xl flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{v.label}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
