export const WARDROBE_CATEGORIES = {
  HEADWEAR: "headwear",
  UPPER: "upper",
  LOWER: "lower",
  FOOTWEAR: "footwear",
  ACCESSORIES: "accessories",
} as const;

export type WardrobeCategory =
  (typeof WARDROBE_CATEGORIES)[keyof typeof WARDROBE_CATEGORIES];

export const WARDROBE_CATEGORY_LIST = [
  { key: WARDROBE_CATEGORIES.HEADWEAR, label: "Headwear" },
  { key: WARDROBE_CATEGORIES.UPPER, label: "Upper Clothing" },
  { key: WARDROBE_CATEGORIES.LOWER, label: "Lower Clothing" },
  { key: WARDROBE_CATEGORIES.FOOTWEAR, label: "Footwear" },
  { key: WARDROBE_CATEGORIES.ACCESSORIES, label: "Accessories" },
] as const;
