import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1600x900.jpg')",
        }}
      />
      {/* Overlay — deeper gradient for more contrast and drama */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/60" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="section-eyebrow text-white/75 mb-8"
        >
          Luxury Beauty · Est. 2020
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-heading text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-[1.05] mb-8 tracking-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          Discover Your
          <br />
          <span
            className="italic font-normal"
            style={{ color: "oklch(0.86 0.09 78)" }}
          >
            Radiance
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="font-body text-white/80 text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed font-light"
        >
          Luxury skincare and beauty crafted for the modern woman
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#products"
            data-ocid="hero.primary_button"
            className="bg-gold hover:bg-gold-deep text-white font-body text-xs tracking-[0.2em] uppercase px-12 py-4 rounded-full transition-all duration-300 hover:shadow-luxury font-medium"
          >
            Shop the Collection
          </a>
          <a
            href="#about"
            data-ocid="hero.secondary_button"
            className="border border-white/50 text-white hover:border-white/80 hover:bg-white/8 font-body text-xs tracking-[0.2em] uppercase px-12 py-4 rounded-full transition-all duration-300 font-medium"
          >
            Our Story
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-[0.6rem] font-body tracking-[0.35em] uppercase">
          Scroll
        </span>
        <div className="w-px h-14 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
