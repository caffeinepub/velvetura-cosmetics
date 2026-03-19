import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { ShoppingItem } from "../backend.d";
import { useCart } from "../contexts/CartContext";
import { useActor } from "../hooks/useActor";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } =
    useCart();
  const { actor } = useActor();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!actor || items.length === 0) return;
    setIsCheckingOut(true);
    try {
      const shoppingItems: ShoppingItem[] = items.map((i) => ({
        productName: i.product.name,
        currency: "inr",
        quantity: BigInt(i.quantity),
        priceInCents: BigInt(Math.round(i.product.price * 100)),
        productDescription: i.product.description,
      }));
      const successUrl = `${window.location.origin}?checkout=success`;
      const cancelUrl = `${window.location.origin}?checkout=cancel`;
      const url = await actor.createCheckoutSession(
        shoppingItems,
        successUrl,
        cancelUrl,
      );
      clearCart();
      window.location.href = url;
    } catch (err) {
      console.error("Checkout failed", err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            data-ocid="cart.sheet"
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="font-heading text-xl font-semibold">Your Cart</h2>
              <button
                type="button"
                onClick={onClose}
                data-ocid="cart.close_button"
                className="p-1 hover:opacity-70 transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div
                  data-ocid="cart.empty_state"
                  className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground"
                >
                  <div className="text-5xl">🛍️</div>
                  <p className="font-body text-sm">Your cart is empty</p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-sm text-gold hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map((item, idx) => (
                    <li
                      key={item.product.id}
                      data-ocid={`cart.item.${idx + 1}`}
                      className="flex gap-4"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg border border-border"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-heading text-sm font-semibold">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {item.product.category}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            data-ocid={`cart.delete_button.${idx + 1}`}
                            className="p-1 hover:text-destructive transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 border border-border rounded-full px-2 py-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                              className="p-0.5 hover:opacity-70"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              className="p-0.5 hover:opacity-70"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="font-semibold text-sm">
                            ₹
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-border">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-body text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="font-heading text-xl font-semibold">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  data-ocid="cart.submit_button"
                  disabled={isCheckingOut}
                  className="w-full bg-gold hover:bg-gold/90 text-white font-body tracking-wide py-3 h-auto rounded-full"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Processing...
                    </>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
