import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";

actor {
  // Access Control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Storage system
  include MixinStorage();

  // === Types ===
  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    priceInCents : Nat;
    category : Text;
    imageUrl : Text;
    stockQty : Nat;
    isBestSeller : Bool;
    isActive : Bool;
  };

  public type OrderItem = {
    productId : Nat;
    quantity : Nat;
    priceInCents : Nat;
  };

  public type Order = {
    id : Nat;
    customerName : Text;
    customerEmail : Text;
    items : [OrderItem];
    totalInCents : Nat;
    status : Text;
    createdAt : Int;
    userId : Principal;
  };

  public type BlogPost = {
    id : Nat;
    title : Text;
    excerpt : Text;
    content : Text;
    imageUrl : Text;
    author : Text;
    isPublished : Bool;
    createdAt : Int;
  };

  public type Testimonial = {
    id : Nat;
    customerName : Text;
    rating : Nat;
    reviewText : Text;
    productName : Text;
    isApproved : Bool;
  };

  public type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  // === Storage ===
  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();
  let blogPosts = Map.empty<Nat, BlogPost>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let carts = Map.empty<Principal, [CartItem]>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextProductId : Nat = 1;
  var nextOrderId : Nat = 1;
  var nextBlogPostId : Nat = 1;
  var nextTestimonialId : Nat = 1;

  // Stripe configuration state
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  // === Seed Data Generation ===
  public shared ({ caller }) func seedData() : async () {
    // Seed skincare products
    if (products.isEmpty()) {
      for (productData in [
        ("Hydrating Serum", "Deep hydration for all skin types", 4999, "skincare", "/images/serum.jpg", 50, true),
        ("Vitamin C Cream", "Brightening daily moisturizer", 5999, "skincare", "/images/cream.jpg", 40, false),
        ("Gentle Cleanser", "Mild foaming face wash", 2999, "skincare", "/images/cleanser.jpg", 60, true),
        ("Night Repair Oil", "Restorative overnight treatment", 6999, "skincare", "/images/oil.jpg", 30, false),
      ].values()) {
        let (name, desc, price, cat, img, stock, best) = productData;
        addProductInternal({
          id = nextProductId;
          name;
          description = desc;
          priceInCents = price;
          category = cat;
          imageUrl = img;
          stockQty = stock;
          isBestSeller = best;
          isActive = true;
        });
      };

      // Seed makeup and bodycare products
      for (productData in [
        ("Velvet Lipstick", "Long-lasting matte finish", 2499, "makeup", "/images/lipstick.jpg", 100, true),
        ("Flawless Foundation", "Full coverage liquid foundation", 4499, "makeup", "/images/foundation.jpg", 70, true),
        ("Eyeshadow Palette", "12 versatile shades", 3999, "makeup", "/images/eyeshadow.jpg", 45, false),
        ("Volumizing Mascara", "Dramatic lash volume", 1999, "makeup", "/images/mascara.jpg", 80, true),
        ("Luxe Body Butter", "Rich moisturizing cream", 3499, "bodycare", "/images/bodybutter.jpg", 55, false),
        ("Exfoliating Scrub", "Gentle body exfoliant", 2799, "bodycare", "/images/scrub.jpg", 65, true),
        ("Aromatic Body Oil", "Nourishing massage oil", 3999, "bodycare", "/images/bodyoil.jpg", 40, false),
        ("Hand Cream Set", "3-piece travel set", 1999, "bodycare", "/images/handcream.jpg", 90, true),
      ].values()) {
        let (name, desc, price, cat, img, stock, best) = productData;
        addProductInternal({
          id = nextProductId;
          name;
          description = desc;
          priceInCents = price;
          category = cat;
          imageUrl = img;
          stockQty = stock;
          isBestSeller = best;
          isActive = true;
        });
      };
    };

    // Seed testimonials
    if (testimonials.isEmpty()) {
      for (testimonialData in [
        ("Sarah Johnson", 5, "The Hydrating Serum changed my skin completely!", "Hydrating Serum", true),
        ("Emily Chen", 5, "Best lipstick I've ever used. Stays on all day!", "Velvet Lipstick", true),
        ("Maria Garcia", 4, "Love the body butter. Very moisturizing.", "Luxe Body Butter", true),
        ("Jessica Lee", 5, "The foundation is perfect for my skin tone!", "Flawless Foundation", true),
        ("Amanda White", 5, "Gentle cleanser that really works. Highly recommend!", "Gentle Cleanser", true),
      ].values()) {
        let (name, rating, review, product, approved) = testimonialData;
        addTestimonialInternal({
          id = nextTestimonialId;
          customerName = name;
          rating;
          reviewText = review;
          productName = product;
          isApproved = approved;
        });
      };
    };

    // Seed blog posts
    if (blogPosts.isEmpty()) {
      for (postData in [
        (
          "10 Skincare Tips for Glowing Skin",
          "Discover the secrets to radiant, healthy skin",
          "Achieving glowing skin requires consistency and the right products. Here are our top 10 tips...",
          "/images/blog1.jpg",
          "Dr. Emma Wilson"
        ),
        (
          "The Ultimate Makeup Guide for Beginners",
          "Learn the basics of makeup application",
          "Starting your makeup journey can be overwhelming. This guide will help you master the basics...",
          "/images/blog2.jpg",
          "Sophie Martinez"
        ),
        (
          "Winter Body Care Routine",
          "Keep your skin soft during cold months",
          "Winter can be harsh on your skin. Follow these steps to maintain soft, hydrated skin all season...",
          "/images/blog3.jpg",
          "Dr. Emma Wilson"
        ),
      ].values()) {
        let (title, excerpt, content, imageUrl, author) = postData;
        let post : BlogPost = {
          id = nextBlogPostId;
          title;
          excerpt;
          content;
          imageUrl;
          author;
          isPublished = true;
          createdAt = Time.now();
        };
        blogPosts.add(nextBlogPostId, post);
        nextBlogPostId += 1;
      };
    };
  };

  // === Internal Add Functions ===
  func addProductInternal(product : Product) {
    products.add(product.id, product);
    nextProductId += 1;
  };

  func addTestimonialInternal(testimonial : Testimonial) {
    testimonials.add(testimonial.id, testimonial);
    nextTestimonialId += 1;
  };

  // === Product Management ===
  public query func getProducts() : async [Product] {
    products.values().toArray();
  };

  public query func getProduct(id : Nat) : async ?Product {
    products.get(id);
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category });
  };

  public shared ({ caller }) func createProduct(product : Product) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    let id = nextProductId;
    products.add(id, { product with id });
    nextProductId += 1;
    id;
  };

  public shared ({ caller }) func updateProduct(id : Nat, product : Product) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (products.get(id)) {
      case (null) { false };
      case (?_) {
        products.add(id, { product with id });
        true;
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    products.remove(id);
  };

  // Stripe Management
  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set Stripe configuration");
    };
    stripeConfiguration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?config) { config };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
