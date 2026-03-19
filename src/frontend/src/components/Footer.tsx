import {
  SiFacebook,
  SiInstagram,
  SiPinterest,
  SiTiktok,
  SiX,
} from "react-icons/si";

const SOCIAL = [
  { icon: SiInstagram, label: "Instagram" },
  { icon: SiFacebook, label: "Facebook" },
  { icon: SiX, label: "X" },
  { icon: SiPinterest, label: "Pinterest" },
  { icon: SiTiktok, label: "TikTok" },
];

const QUICK_LINKS = [
  "Home",
  "About",
  "Products",
  "Best Sellers",
  "Reviews",
  "Blog",
  "Contact",
];
const LEGAL_LINKS = [
  "Privacy Policy",
  "Terms of Service",
  "Cookie Policy",
  "Returns Policy",
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-heading text-3xl font-bold text-white mb-4">
              Velvetura
            </h3>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
              Luxury skincare and beauty crafted for the modern woman. Pure.
              Proven. Premium.
            </p>
            <div className="flex gap-4 mt-6">
              {SOCIAL.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="https://velvetura.com"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="font-body text-sm text-white/60 hover:text-gold transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((item) => (
                <li key={item}>
                  <a
                    href="https://velvetura.com/legal"
                    className="font-body text-sm text-white/60 hover:text-gold transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/50">
            &copy; {year} Velvetura Cosmetics. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/40">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
