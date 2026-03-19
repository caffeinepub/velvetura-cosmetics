import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  SiFacebook,
  SiInstagram,
  SiPinterest,
  SiTiktok,
  SiX,
} from "react-icons/si";
import { toast } from "sonner";

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll be in touch soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-velvet-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-gold font-body text-sm tracking-[0.25em] uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold gold-underline inline-block">
            Contact Us
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              data-ocid="contact.form"
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-2 block"
                  >
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    data-ocid="contact.name.input"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Your name"
                    required
                    className="bg-card border-border focus:border-gold rounded-xl font-body"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-2 block"
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    data-ocid="contact.email.input"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    required
                    className="bg-card border-border focus:border-gold rounded-xl font-body"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-subject"
                  className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-2 block"
                >
                  Subject
                </label>
                <Input
                  id="contact-subject"
                  data-ocid="contact.subject.input"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subject: e.target.value }))
                  }
                  placeholder="How can we help?"
                  required
                  className="bg-card border-border focus:border-gold rounded-xl font-body"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-2 block"
                >
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  data-ocid="contact.message.textarea"
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Write your message here..."
                  required
                  rows={5}
                  className="bg-card border-border focus:border-gold rounded-xl font-body resize-none"
                />
              </div>
              <Button
                type="submit"
                data-ocid="contact.submit_button"
                disabled={sending}
                className="w-full bg-gold hover:bg-gold/90 text-white font-body tracking-widest uppercase py-3 h-auto rounded-full"
              >
                {sending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@velvetura.com" },
                { icon: Phone, label: "Phone", value: "+1 (800) VELVETURA" },
                {
                  icon: MapPin,
                  label: "Address",
                  value: "Bangalore, 123 Sri Nagar, 560104",
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center flex-shrink-0 shadow-card">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-1">
                      {label}
                    </p>
                    <p className="font-body text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-4">
                Follow Us
              </p>
              <div className="flex gap-4">
                {[
                  { icon: SiInstagram, label: "Instagram" },
                  { icon: SiFacebook, label: "Facebook" },
                  { icon: SiX, label: "X" },
                  { icon: SiPinterest, label: "Pinterest" },
                  { icon: SiTiktok, label: "TikTok" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="https://velvetura.com"
                    aria-label={label}
                    data-ocid={`contact.${label.toLowerCase()}.link`}
                    className="w-10 h-10 bg-card rounded-xl flex items-center justify-center shadow-card hover:bg-gold hover:text-white transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-7 shadow-card">
              <p className="font-heading text-lg font-semibold mb-2">
                Visit Our Store
              </p>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                Monday – Saturday: 10am – 7pm
                <br />
                Sunday: 11am – 5pm
                <br />
                Free consultations available
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
