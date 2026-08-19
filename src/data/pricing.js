export const pricingCategories = [
  {
    key: "laundry",
    label: "Laundry",
    items: [
      { item: "Shirt", service: "Wash & Fold", regular: 25, express: 40 },
      { item: "Shirt", service: "Wash & Iron", regular: 35, express: 55 },
      { item: "Trouser", service: "Wash & Iron", regular: 40, express: 60 },
      { item: "T-Shirt", service: "Wash & Fold", regular: 20, express: 32 },
      { item: "Bedsheet (Single)", service: "Wash & Fold", regular: 60, express: 90 },
      { item: "Bedsheet (Double)", service: "Wash & Fold", regular: 90, express: 130 },
    ],
  },
  {
    key: "dry-cleaning",
    label: "Dry Cleaning",
    items: [
      { item: "Shirt", service: "Dry Clean", regular: 89, express: 129 },
      { item: "Suit (2-piece)", service: "Dry Clean", regular: 349, express: 499 },
      { item: "Blazer", service: "Dry Clean", regular: 199, express: 289 },
      { item: "Saree", service: "Dry Clean", regular: 249, express: 349 },
      { item: "Lehenga (3-piece)", service: "Dry Clean", regular: 599, express: 849 },
      { item: "Woollen Coat", service: "Dry Clean", regular: 329, express: 469 },
    ],
  },
  {
    key: "shoes",
    label: "Shoes",
    items: [
      { item: "Sneakers", service: "Deep Clean", regular: 249, express: 349 },
      { item: "Leather Shoes", service: "Clean & Polish", regular: 299, express: 399 },
      { item: "Suede Shoes", service: "Deep Clean", regular: 329, express: 449 },
      { item: "Sports Shoes", service: "Deep Clean", regular: 229, express: 329 },
    ],
  },
  {
    key: "leather",
    label: "Leather",
    items: [
      { item: "Leather Jacket", service: "Clean & Condition", regular: 599, express: 849 },
      { item: "Handbag", service: "Clean & Condition", regular: 399, express: 549 },
      { item: "Wallet", service: "Clean & Condition", regular: 149, express: 219 },
      { item: "Belt", service: "Clean & Condition", regular: 129, express: 189 },
    ],
  },
  {
    key: "home-care",
    label: "Home Care",
    items: [
      { item: "Curtain (per panel)", service: "Wash & Press", regular: 149, express: 219 },
      { item: "Carpet (per sq. ft.)", service: "Deep Clean", regular: 15, express: 22 },
      { item: "Sofa (per seat)", service: "Deep Clean", regular: 299, express: 429 },
      { item: "Blanket", service: "Wash & Fold", regular: 199, express: 289 },
    ],
  },
];
