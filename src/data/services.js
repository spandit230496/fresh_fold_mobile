export const services = [
  {
    slug: "laundry",
    title: "Laundry",
    short: "Wash, dry & fold for everyday clothing.",
    description:
      "Everyday wash & fold and wash & iron, handled with fabric-safe detergents and careful sorting by colour and fabric type.",
    price: "₹79",
    priceUnit: "per kg",
    image: "laundry-basket-fresh-clothes",
    icon: "Shirt",
    features: ["Colour-safe sorting", "Fabric-safe detergents", "Wash & fold or wash & iron"],
  },
  {
    slug: "dry-cleaning",
    title: "Dry Cleaning",
    short: "Solvent cleaning for delicate & formal wear.",
    description:
      "Suits, sarees, lehengas and designer wear cleaned using low-moisture solvent methods that protect structure, colour and embellishment.",
    price: "₹149",
    priceUnit: "per piece",
    image: "dry-cleaning-suit-press",
    icon: "Sparkles",
    features: ["Solvent-safe process", "Embellishment protection", "Press & finish included"],
  },
  {
    slug: "shoe-care",
    title: "Shoe Care",
    short: "Deep cleaning & restoration for footwear.",
    description:
      "Sneaker deep-cleaning, leather treatment and colour restoration that brings shoes back to a like-new finish.",
    price: "₹249",
    priceUnit: "per pair",
    image: "sneaker-cleaning-restoration",
    icon: "Footprints",
    features: ["Deep sole cleaning", "Leather conditioning", "Colour restoration"],
  },
  {
    slug: "leather-care",
    title: "Leather Care",
    short: "Conditioning & repair for leather goods.",
    description:
      "Jackets, bags, wallets and belts cleaned and conditioned to keep leather supple and prevent cracking.",
    price: "₹399",
    priceUnit: "per item",
    image: "leather-jacket-care",
    icon: "Briefcase",
    features: ["Deep conditioning", "Colour touch-up", "Hardware polishing"],
  },
  {
    slug: "home-fabric-care",
    title: "Home Fabric Care",
    short: "Curtains, carpets, rugs & upholstery.",
    description:
      "Large-format home textiles cleaned on-site or in-facility, with careful handling for delicate weaves and antique pieces.",
    price: "₹15",
    priceUnit: "per sq. ft.",
    image: "curtains-carpet-cleaning",
    icon: "Sofa",
    features: ["On-site & in-facility options", "Delicate weave handling", "Odour treatment"],
  },
  {
    slug: "steam-ironing",
    title: "Steam Ironing",
    short: "Crisp, professional pressing for any garment.",
    description:
      "Steam-pressed finishing that removes creases without damaging fabric, delivered ready to hang or fold.",
    price: "₹19",
    priceUnit: "per piece",
    image: "steam-ironing-garment",
    icon: "Flame",
    features: ["Garment-specific heat settings", "Crease-free finish", "Ready to wear"],
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);
