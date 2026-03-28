import React from "react";

const EMOJI = {
  /* Féculents */
  rice: "🍚",
  spaghetti: "🍝",
  fries: "🍟",
  potato: "🥔",
  quinoa: "🥣",
  semoule: "🥣",
  bread: "🍞",
  sweet_potato: "🍠",
  /* Légumes */
  broccoli: "🥦",
  carrot: "🥕",
  tomato: "🍅",
  zucchini: "🥒",
  pepper: "🫑",
  green_beans: "🥬",
  eggplant: "🍆",
  cucumber: "🥒",
  /* Protéines */
  chicken: "🍗",
  steak: "🥩",
  fish: "🐟",
  egg: "🥚",
  turkey: "🍗",
  salmon: "🍣",
  tuna: "🥫",
  tofu: "🧈",
  /* Boissons */
  water: "💧",
  milk: "🥛",
  juice: "🧃",
  soda: "🥤",
  coffee: "☕",
  tea: "🍵",
  smoothie: "🥤",
  energy_drink: "⚡",
  /* Desserts */
  cake: "🎂",
  fruit: "🍌",
  yogurt: "🍨",
  chocolate_bar: "🍫",
  ice_cream: "🍦",
  biscuit: "🍪",
  pancake: "🥞",
  muffin: "🧁",
};

/**
 * Icônes aliments — émojis natifs pour un rendu cartoon 3D brillant.
 * `size="lg"` pour les contenants (assiette / verre / dessert).
 */
export function FoodIcon({ name, size = "md" }) {
  const emoji = EMOJI[name] || "🍽️";
  const lg = size === "lg";
  return (
    <span className={`nc-food-emoji${lg ? " nc-food-emoji--lg" : ""}`} aria-hidden>
      {emoji}
    </span>
  );
}
