# Velvetura Cosmetics

## Current State
New project with no existing application files.

## Requested Changes (Diff)

### Add
- Full luxury cosmetic brand website for Velvetura Cosmetics
- Hero section with tagline and CTA button
- About Us section (brand story, mission, vision, values)
- Product catalog (skincare, makeup, body care) with sample products, prices, descriptions
- Best Sellers section highlighting top products
- Customer Reviews / Testimonials section
- Ingredients & Quality Assurance section
- Blog / Beauty Tips section with sample posts
- Contact Us section with form, email, phone, social media links
- Shopping cart with add/remove items, quantity management
- Checkout flow integrated with Stripe payments
- Admin panel for managing products (CRUD), orders, and blog posts
- User authentication via authorization component
- Image storage via blob-storage for product and blog images
- Smooth scroll animations and elegant UI transitions
- Responsive mobile-friendly layout

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: Products actor (CRUD with categories), Orders actor, Blog posts actor, Cart management, Stripe checkout integration, authorization for admin role
2. Frontend: Multi-section single-page layout with sticky navbar, hero, about, products grid, best sellers, testimonials, ingredients, blog, contact, footer
3. Shopping cart: Floating cart drawer with item management and Stripe checkout
4. Admin dashboard: Protected route for managing products, orders, blog posts
5. Sample seed data: 12 products across 3 categories, 5 testimonials, 3 blog posts
