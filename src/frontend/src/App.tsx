import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { CartProvider } from "./contexts/CartContext";
import { AboutSection } from "./sections/AboutSection";
import { BestSellersSection } from "./sections/BestSellersSection";
import { BlogSection } from "./sections/BlogSection";
import { ContactSection } from "./sections/ContactSection";
import { HeroSection } from "./sections/HeroSection";
import { IngredientsSection } from "./sections/IngredientsSection";
import { ProductsSection } from "./sections/ProductsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

const queryClient = new QueryClient();

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <BestSellersSection />
        <TestimonialsSection />
        <IngredientsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </QueryClientProvider>
  );
}
