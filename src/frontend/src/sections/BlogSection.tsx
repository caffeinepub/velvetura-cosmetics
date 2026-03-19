import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const POSTS = [
  {
    title: "5 Morning Skincare Rituals for Glowing Skin",
    excerpt:
      "Start your day right with these expert-approved steps that will leave your skin radiant and protected.",
    category: "Skincare Tips",
    readTime: "5 min read",
    emoji: "✨",
  },
  {
    title: "The Ultimate Guide to Choosing Your Foundation",
    excerpt:
      "From undertones to coverage levels, learn how to find your perfect foundation match.",
    category: "Makeup Guide",
    readTime: "7 min read",
    emoji: "💄",
  },
  {
    title: "Why Body Care Is the Missing Step in Your Routine",
    excerpt:
      "Discover why treating your body to the same luxury as your face makes all the difference.",
    category: "Body Care",
    readTime: "4 min read",
    emoji: "🌸",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-gold font-body text-sm tracking-[0.25em] uppercase mb-3">
            Beauty Tips
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold gold-underline inline-block">
            From Our Beauty Blog
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              data-ocid={`blog.item.${i + 1}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-luxury transition-shadow duration-300"
            >
              <div className="bg-velvet-beige h-52 flex items-center justify-center">
                <span className="text-7xl">{post.emoji}</span>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-body bg-velvet-pink/60 text-foreground px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground font-body">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5">
                  {post.excerpt}
                </p>
                <button
                  type="button"
                  data-ocid={`blog.read_more.button.${i + 1}`}
                  className="flex items-center gap-2 text-sm font-body text-gold hover:gap-3 transition-all duration-200 group-hover:text-gold/80"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
