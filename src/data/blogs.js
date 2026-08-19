export const blogs = [
  {
    slug: "extend-life-of-your-clothes",
    title: "5 Simple Habits That Extend the Life of Your Clothes",
    category: "Laundry Tips",
    excerpt:
      "Small changes in how you wash, dry and store garments can add years to your favourite pieces.",
    author: "FreshFold Team",
    date: "2026-06-02",
    featured: true,
    content: [
      "Most clothing doesn't wear out from use — it wears out from careless washing. Sorting by fabric type and colour before every wash is the single biggest factor in keeping garments looking new.",
      "Turning knits and printed garments inside out before washing protects the outer surface from friction and fading. Cold water washes, wherever the fabric allows, also help preserve colour and elasticity over time.",
      "Air-drying delicate fabrics instead of machine-drying prevents shrinkage and fibre damage. When machine drying is necessary, a lower heat setting combined with a shorter cycle strikes a good balance between convenience and garment care.",
      "Finally, proper storage — breathable garment bags for special-occasion wear and cedar blocks for wool — keeps pests and musty odours away between wears.",
    ],
  },
  {
    slug: "dry-cleaning-myths",
    title: "Dry Cleaning Myths You Should Stop Believing",
    category: "Dry Cleaning",
    excerpt:
      "From 'dry cleaning uses no liquid' to 'it ruins delicate fabric' — we separate fact from fiction.",
    author: "FreshFold Team",
    date: "2026-05-18",
    featured: false,
    content: [
      "Dry cleaning isn't actually dry — it uses a liquid solvent instead of water, which is gentler on fibres that water and agitation would damage.",
      "A well-run dry cleaning process is one of the safest ways to clean structured and embellished garments, not a risk to them, provided the fabric is correctly tested beforehand.",
      "Not every 'dry clean only' label means the garment can't survive careful home washing — but without professional equipment, it's a real gamble on shape, colour and finish.",
    ],
  },
  {
    slug: "sneaker-care-guide",
    title: "The Sneakerhead's Guide to Keeping Kicks Fresh",
    category: "Shoe Care",
    excerpt: "Practical tips for keeping white sneakers white and suede looking sharp.",
    author: "FreshFold Team",
    date: "2026-04-30",
    featured: false,
    content: [
      "White midsoles yellow fastest from UV exposure and dirt buildup — wiping them down after every few wears prevents the discolouration from setting in.",
      "Suede needs a completely different approach to leather: a soft brush and suede eraser handle daily maintenance, while any liquid stain should be blotted, never rubbed.",
      "Rotating between two or three pairs, rather than wearing one pair daily, is the simplest way to extend sneaker lifespan significantly.",
    ],
  },
  {
    slug: "monsoon-fabric-care",
    title: "Monsoon-Proofing Your Wardrobe",
    category: "Fabric Care",
    excerpt: "How to protect leather, suede and delicate fabrics during India's rainy season.",
    author: "FreshFold Team",
    date: "2026-06-20",
    featured: false,
    content: [
      "Humidity accelerates mildew growth on natural fibres, so garments should be fully dry before being stored away in the monsoon months.",
      "Leather goods benefit from a waterproofing spray applied before the season starts, along with silica gel packets in storage areas to control moisture.",
      "Rotating out heavy wool and structured pieces for lighter, quick-dry fabrics reduces how often anything sits damp for extended periods.",
    ],
  },
  {
    slug: "organizing-a-home-linen-closet",
    title: "Organising a Home Linen Closet That Actually Works",
    category: "Home Care",
    excerpt: "A simple system for bedsheets, towels and curtains that keeps everything fresh.",
    author: "FreshFold Team",
    date: "2026-03-11",
    featured: false,
    content: [
      "Grouping linens by room rather than by type makes it far faster to grab a full set when you need one.",
      "Storing sheet sets inside their own matching pillowcase keeps pairs together and prevents the shelf from becoming a tangle.",
      "A light sachet of dried lavender or cedar keeps stored linens smelling fresh between uses without relying on synthetic fragrance sprays.",
    ],
  },
  {
    slug: "capsule-wardrobe-laundry-routine",
    title: "Building a Laundry Routine Around a Capsule Wardrobe",
    category: "Lifestyle",
    excerpt: "Fewer clothes means every wash cycle matters more — here's how to plan around that.",
    author: "FreshFold Team",
    date: "2026-02-25",
    featured: false,
    content: [
      "With a smaller rotation of garments, each item is worn more often — which makes fabric-appropriate washing even more important to prevent premature wear.",
      "Scheduling a weekly pickup, rather than washing reactively, keeps a capsule wardrobe in consistent rotation without last-minute gaps.",
      "Investing the time saved from laundry into garment maintenance — steaming, minor repairs, proper storage — keeps a small wardrobe looking sharp for longer.",
    ],
  },
];

export const getBlogBySlug = (slug) => blogs.find((b) => b.slug === slug);
