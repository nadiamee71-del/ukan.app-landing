import React from "react";

/**
 * Icônes aliments — style illustré type “cartoon premium” (dégradés, formes lisibles).
 * `size="lg"` : assiette / verre / zone dessert (plus grandes).
 */
export function FoodIcon({ name, size = "md" }) {
  const raw = React.useId();
  const id = raw.replace(/:/g, "");
  const gid = (s) => `fi-${id}-${s}`;
  const lg = size === "lg";

  switch (name) {
    case "broccoli":
      return (
        <svg
          viewBox="0 0 32 32"
          width="100%"
          height="100%"
          aria-hidden
          className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}
        >
          <defs>
            <linearGradient id={gid("stem")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#34a853" />
            </linearGradient>
            <radialGradient id={gid("fl1")} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#bbf7d0" />
              <stop offset="100%" stopColor="#34a853" />
            </radialGradient>
            <radialGradient id={gid("fl2")} cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#15803d" />
            </radialGradient>
            <radialGradient id={gid("fl3")} cx="45%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#4cd964" />
              <stop offset="100%" stopColor="#166534" />
            </radialGradient>
          </defs>
          <path d="M14 18h4v10c0 1.5-1 2.5-2 2.5s-2-1-2-2.5V18z" fill={`url(#${gid("stem")})`} opacity="0.95" />
          <circle cx="12" cy="12" r="4.2" fill={`url(#${gid("fl1")})`} />
          <circle cx="16" cy="9" r="4.8" fill={`url(#${gid("fl2")})`} />
          <circle cx="20" cy="12" r="4.2" fill={`url(#${gid("fl3")})`} />
          <ellipse cx="16" cy="13" rx="5" ry="3.5" fill="#34a853" opacity="0.35" />
        </svg>
      );

    case "chicken":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("meat")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="45%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <radialGradient id={gid("bone")} cx="50%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="100%" stopColor="#d6c4a8" />
            </radialGradient>
          </defs>
          <path
            d="M23.5 7.5c1.2 0.8 2 2.2 1.8 4-.3 3.5-3.8 7.5-8.8 10.8-4.5 3-9.5 4-12.8 2.8-2-.8-3-2.8-2-5.5 1.2-3.2 5.5-6.5 10.5-8.5 4-1.8 8-2.2 10.5-1.6z"
            fill={`url(#${gid("meat")})`}
          />
          <circle cx="24.5" cy="8.5" r="2.4" fill={`url(#${gid("bone")})`} />
          <ellipse cx="20" cy="14" rx="3.5" ry="2" fill="#f59e0b" opacity="0.35" />
        </svg>
      );

    case "rice":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("bowl")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <radialGradient id={gid("rice")} cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </radialGradient>
          </defs>
          <path d="M6 20c0-5 4.5-9 10-9s10 4 10 9c0 2.5-12 4.5-20 0z" fill={`url(#${gid("bowl")})`} />
          <ellipse cx="16" cy="17" rx="8.5" ry="5" fill={`url(#${gid("rice")})`} />
          <ellipse cx="16" cy="11" rx="6" ry="3.2" fill="#ffffff" opacity="0.85" />
        </svg>
      );

    case "spaghetti":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("bowl2")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id={gid("pasta")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <path d="M5 21c0-4.5 4-8.5 11-8.5s11 4 11 8.5v1H5v-1z" fill={`url(#${gid("bowl2")})`} />
          <path
            d="M9 14c2 0 3.5-1 5-2.5M11 16c2.5 0 4.5-0.8 6.5-2M10 18c3 0.5 6 0.5 9-0.5M9 20c3.5 0.8 7 0.5 10-0.8"
            fill="none"
            stroke={`url(#${gid("pasta")})`}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <ellipse cx="16" cy="12" rx="5" ry="2.5" fill="#ffc83d" opacity="0.9" />
        </svg>
      );

    case "fries":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("box")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id={gid("fry")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#ffc83d" />
            </linearGradient>
          </defs>
          <path d="M8 24h16l-2-14H10L8 24z" fill={`url(#${gid("box")})`} />
          <path d="M11 10l1 12M14 9l1 13M17 9.5l0.8 12.5M20 10l-0.5 12" stroke={`url(#${gid("fry")})`} strokeWidth="2" strokeLinecap="round" />
          <path d="M9 12h14" stroke="#fecaca" strokeWidth="0.8" opacity="0.5" />
        </svg>
      );

    case "milk":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("carton")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id={gid("liquid")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
            <linearGradient id={gid("accent")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <path d="M11 7h10l1.5 3v17H9.5V10L11 7z" fill={`url(#${gid("carton")})`} />
          <path d="M11 7h10v3H11z" fill={`url(#${gid("accent")})`} opacity="0.9" />
          <rect x="11" y="13" width="10" height="11" rx="1" fill={`url(#${gid("liquid")})`} />
        </svg>
      );

    case "soda":
    case "coca":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("can")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="50%" stopColor="#b91c1c" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
            <linearGradient id={gid("shine")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="10" y="6" width="12" height="20" rx="2.5" fill={`url(#${gid("can")})`} />
          <ellipse cx="16" cy="7.5" rx="5" ry="1.5" fill="#991b1b" />
          <rect x="11.5" y="9" width="3" height="14" rx="0.5" fill={`url(#${gid("shine")})`} />
          <path d="M12 18h8" stroke="#fecaca" strokeWidth="0.6" opacity="0.6" />
        </svg>
      );

    case "egg":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <radialGradient id={gid("shell")} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fffef7" />
              <stop offset="50%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fde68a" />
            </radialGradient>
            <linearGradient id={gid("shine2")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="7.5" ry="9.5" fill={`url(#${gid("shell")})`} />
          <ellipse cx="13.5" cy="13.5" rx="3" ry="4" fill={`url(#${gid("shine2")})`} opacity="0.5" />
        </svg>
      );

    case "banana":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("peel")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id={gid("tip")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a16207" />
              <stop offset="100%" stopColor="#713f12" />
            </linearGradient>
          </defs>
          <path
            d="M10.5 25.5c-1.2-0.5-1.8-1.8-1.2-3.2 1-3 4-7 8-11.5 4-4 8-6.5 11-7.5 2-0.8 3.8-0.5 4.8 1.2 1.2 2 0.5 5-2 8.5-2.5 3.5-6.5 7-10.5 9.5-3.5 2.2-7 3.5-9 3-0.8-0.2-1.3-0.4-1.8-0.8z"
            fill={`url(#${gid("peel")})`}
          />
          <ellipse cx="10" cy="25.5" rx="2" ry="2.2" fill={`url(#${gid("tip")})`} transform="rotate(-18 10 25.5)" />
        </svg>
      );

    case "steak":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("meat2")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="40%" stopColor="#ff4d4d" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="11" ry="7" fill={`url(#${gid("meat2")})`} />
          <path
            d="M8 16.5c3 0.8 6 1 9 0.3M9 14.5c2.5 0.5 5 0.6 7.5 0.2M10 19c2.5 0.4 5 0.5 8-0.2"
            fill="none"
            stroke="#fecdd3"
            strokeWidth="0.55"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      );

    case "fish":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("fish")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          <path
            d="M4 16c4-5 12-8 20-6 2 0.5 3.5 2 4 4-0.5 2-2 3.5-4 4-8 2-16-1-20-6z"
            fill={`url(#${gid("fish")})`}
          />
          <circle cx="22" cy="14" r="1.8" fill="#0c4a6e" />
          <path d="M6 15l-2 1.5 2 1.5" fill="#bae6fd" opacity="0.9" />
        </svg>
      );

    case "carrot":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("carrot")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <path d="M15 6c2 1 3.5 3 4 5.5L18 28c-0.5 1.5-2 2-3.5 1.5L10 8c0.5-2 2.5-3.5 5-2z" fill={`url(#${gid("carrot")})`} />
          <path d="M14 6l-1.5-3 2 1.5M16 5.5l0.5-3 1.5 2.5M18 6.5l2-2.5-1 3" stroke="#34a853" strokeWidth="1" fill="none" strokeLinecap="round" />
        </svg>
      );

    case "tomato":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <radialGradient id={gid("tom")} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#b91c1c" />
            </radialGradient>
          </defs>
          <ellipse cx="16" cy="18" rx="8" ry="7.5" fill={`url(#${gid("tom")})`} />
          <path d="M12 10c1.5-1 4-1 8 0 1 2-2 4-4 3-4-1-4-3-4-3z" fill="#15803d" />
        </svg>
      );

    case "zucchini":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("zuc")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#34a853" />
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="5" ry="11" fill={`url(#${gid("zuc")})`} transform="rotate(-12 16 17)" />
          <ellipse cx="16" cy="8" rx="2" ry="1.5" fill="#166534" />
        </svg>
      );

    case "chocolate":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("choc")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>
          <path d="M10 8h12l1 4v14H9V12l1-4z" fill={`url(#${gid("choc")})`} />
          <ellipse cx="16" cy="10" rx="6" ry="2" fill="#92400e" />
          <rect x="11" y="14" width="10" height="10" rx="1" fill="#3f2e1a" opacity="0.5" />
        </svg>
      );

    case "water":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("h2o")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          <path d="M11 6h10c1 0 2 1 2 2v16c0 2-1.5 3.5-3.5 3.5h-7C10.5 27.5 9 26 9 24V8c0-1 1-2 2-2z" fill={`url(#${gid("h2o")})`} opacity="0.85" />
          <path d="M12 10h8" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.5" />
        </svg>
      );

    case "coffee":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("caf")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#57534e" />
              <stop offset="100%" stopColor="#292524" />
            </linearGradient>
          </defs>
          <path d="M9 10h11v2c0 6-2 10-5.5 10S9 18 9 12v-2z" fill={`url(#${gid("caf")})`} />
          <path d="M20 12h3c2 0 3.5 1.5 3.5 3.5S25 19 23 19h-2" fill="none" stroke="#78716c" strokeWidth="1.5" />
          <ellipse cx="14.5" cy="9" rx="5" ry="1" fill="#d6d3d1" opacity="0.6" />
        </svg>
      );

    case "yogurt":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("yog")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="12" height="14" rx="2" fill={`url(#${gid("yog")})`} />
          <ellipse cx="16" cy="10" rx="6" ry="2" fill="#f8fafc" />
          <ellipse cx="16" cy="15" rx="4" ry="2" fill="#fef08a" opacity="0.5" />
        </svg>
      );

    case "fruit":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <radialGradient id={gid("ap")} cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#34a853" />
            </radialGradient>
          </defs>
          <circle cx="16" cy="18" r="8" fill={`url(#${gid("ap")})`} />
          <path d="M16 10v-4M14 6c2-1 4-1 6 0" stroke="#166534" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
      );

    case "cake":
    case "gateau":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("gat")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
          </defs>
          <rect x="8" y="18" width="16" height="8" rx="1" fill={`url(#${gid("gat")})`} />
          <rect x="10" y="12" width="12" height="7" rx="1" fill="#fcd34d" />
          <ellipse cx="16" cy="12" rx="6" ry="2" fill="#fef3c7" />
        </svg>
      );

    case "dessert":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("cake")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fce7f3" />
              <stop offset="40%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#be185d" />
            </linearGradient>
            <linearGradient id={gid("icing")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fbcfe8" />
            </linearGradient>
          </defs>
          <path d="M8 22h16v4c0 1-1 2-2 2H10c-1 0-2-1-2-2v-4z" fill={`url(#${gid("cake")})`} />
          <path d="M7 22l9-8 9 8" fill={`url(#${gid("icing")})`} />
          <circle cx="16" cy="12" r="2" fill="#f472b6" />
          <ellipse cx="16" cy="14" rx="8" ry="3" fill="#fbcfe8" opacity="0.9" />
        </svg>
      );

    case "potato":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <radialGradient id={gid("pot")} cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#a16207" />
            </radialGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="9" ry="7" fill={`url(#${gid("pot")})`} />
          <ellipse cx="12" cy="15" rx="2" ry="1.2" fill="#713f12" opacity="0.25" />
          <ellipse cx="19" cy="18" rx="1.5" ry="1" fill="#713f12" opacity="0.2" />
        </svg>
      );

    case "quinoa":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("bowlq")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e7e5e4" />
              <stop offset="100%" stopColor="#a8a29e" />
            </linearGradient>
          </defs>
          <path d="M6 20c0-4.5 4-8 10-8s10 3.5 10 8c0 2-12 3.5-20 0z" fill={`url(#${gid("bowlq")})`} />
          <circle cx="11" cy="16" r="1.1" fill="#fef3c7" />
          <circle cx="14" cy="15" r="1" fill="#e7e5e4" />
          <circle cx="17" cy="16" r="1.1" fill="#d6d3d1" />
          <circle cx="20" cy="15" r="1" fill="#fef3c7" />
          <circle cx="13" cy="18" r="1" fill="#d6d3d1" />
          <circle cx="19" cy="18" r="1.1" fill="#e7e5e4" />
        </svg>
      );

    case "semoule":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <path d="M7 22h18l-1.5-12H8.5L7 22z" fill="#d6d3d1" />
          <path d="M9 12h14" stroke="#a8a29e" strokeWidth="1" />
          <ellipse cx="16" cy="17" rx="7" ry="3.5" fill="#fef9c3" />
          <circle cx="12" cy="16" r="0.9" fill="#fde047" opacity="0.8" />
          <circle cx="16" cy="15.5" r="0.85" fill="#fde047" opacity="0.75" />
          <circle cx="20" cy="16" r="0.9" fill="#fde047" opacity="0.8" />
        </svg>
      );

    case "bread":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("loaf")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <path
            d="M10 20c0-5 2.5-9 6-9s6 4 6 9v4H10v-4z"
            fill={`url(#${gid("loaf")})`}
          />
          <path d="M12 14c2-2 6-2 8 0" fill="none" stroke="#a16207" strokeWidth="0.8" opacity="0.4" />
        </svg>
      );

    case "sweet_potato":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("sp")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="10" ry="6" fill={`url(#${gid("sp")})`} transform="rotate(-8 16 17)" />
          <path d="M10 12c2-2 5-2.5 8-1" stroke="#7c2d12" strokeWidth="0.6" fill="none" opacity="0.35" />
        </svg>
      );

    case "pepper":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("bell")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
          </defs>
          <path
            d="M16 7c3 0 6 3 6 8 0 6-2.5 11-6 11s-6-5-6-11c0-5 3-8 6-8z"
            fill={`url(#${gid("bell")})`}
          />
          <path d="M14 7v-2h4v2" fill="#166534" />
        </svg>
      );

    case "green_beans":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <path d="M10 8c2 4 3 10 3 16" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M14 7c1.5 5 2 11 1.5 17" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M18 9c0.5 5 0.5 10-0.5 15" stroke="#15803d" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );

    case "eggplant":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("eggpl")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#6b21a8" />
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="6" ry="10" fill={`url(#${gid("eggpl")})`} transform="rotate(8 16 17)" />
          <path d="M14 7h4l1 3h-6l1-3z" fill="#166534" />
        </svg>
      );

    case "cucumber":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <ellipse cx="16" cy="17" rx="5" ry="11" fill="#86efac" transform="rotate(-6 16 17)" />
          <path
            d="M13 10c0.5 2 0.5 4 0 6M16 9c0.5 2.5 0.5 5 0 7.5M19 10c0.5 2 0.5 4 0 6"
            stroke="#166534"
            strokeWidth="0.45"
            opacity="0.35"
            fill="none"
          />
        </svg>
      );

    case "turkey":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("turk")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e7e5e4" />
              <stop offset="50%" stopColor="#d6d3d1" />
              <stop offset="100%" stopColor="#78716c" />
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="10" ry="7" fill={`url(#${gid("turk")})`} />
          <ellipse cx="12" cy="15" rx="2" ry="1.5" fill="#a8a29e" opacity="0.5" />
        </svg>
      );

    case "salmon":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("sal")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="50%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
          </defs>
          <path
            d="M4 16c4-5 12-8 20-6 2 0.5 3.5 2 4 4-0.5 2-2 3.5-4 4-8 2-16-1-20-6z"
            fill={`url(#${gid("sal")})`}
          />
          <path d="M8 14h10" stroke="#fecdd3" strokeWidth="0.5" opacity="0.7" />
        </svg>
      );

    case "tuna":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <rect x="9" y="10" width="14" height="14" rx="2" fill="#1e3a5f" />
          <ellipse cx="16" cy="11" rx="6" ry="1.5" fill="#334155" />
          <path d="M11 16h10M11 19h8M12 22h8" stroke="#64748b" strokeWidth="0.75" />
          <circle cx="16" cy="16" r="2.5" fill="#0f172a" opacity="0.35" />
        </svg>
      );

    case "tofu":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("tof")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fefce8" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
          </defs>
          <path d="M10 12l6-3 6 3v10l-6 3-6-3V12z" fill={`url(#${gid("tof")})`} />
          <path d="M10 12l6 3 6-3" fill="none" stroke="#eab308" strokeWidth="0.6" opacity="0.5" />
        </svg>
      );

    case "juice":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("jus")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <path d="M11 8h10l1 3v15H10V11l1-3z" fill={`url(#${gid("jus")})`} opacity="0.9" />
          <ellipse cx="16" cy="10" rx="5" ry="1.5" fill="#fb923c" />
          <path d="M13 14h6" stroke="#fff7ed" strokeWidth="0.6" opacity="0.5" />
        </svg>
      );

    case "tea":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <path d="M10 12h9v10c0 2-1.5 3.5-3.5 3.5h-2C11.5 25.5 10 24 10 22V12z" fill="#78716c" />
          <path d="M19 14h3c1.5 0 2.5 1 2.5 2.5S23.5 19 22 19h-2" fill="none" stroke="#57534e" strokeWidth="1.2" />
          <ellipse cx="14.5" cy="11" rx="4" ry="1.2" fill="#86efac" opacity="0.6" />
        </svg>
      );

    case "smoothie":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("sm")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f9a8d4" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <path d="M11 9h10l-1 14c0 1.5-1 2.5-2.5 2.5h-3c-1.5 0-2.5-1-2.5-2.5L11 9z" fill={`url(#${gid("sm")})`} />
          <ellipse cx="16" cy="9" rx="5" ry="1.5" fill="#e9d5ff" />
        </svg>
      );

    case "energy_drink":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <defs>
            <linearGradient id={gid("en")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          <rect x="10" y="7" width="12" height="18" rx="2" fill={`url(#${gid("en")})`} />
          <path d="M13 11h6M13 15h6M14 19l2 3 2-3" stroke="#ecfeff" strokeWidth="0.9" fill="none" opacity="0.85" />
        </svg>
      );

    case "chocolate_bar":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <rect x="9" y="11" width="14" height="10" rx="1.5" fill="#451a03" />
          <path d="M9 14h14M12 11v10M16 11v10M20 11v10" stroke="#78350f" strokeWidth="0.8" />
          <rect x="11" y="13" width="3.5" height="2.5" rx="0.3" fill="#92400e" opacity="0.6" />
          <rect x="15.5" y="13" width="3.5" height="2.5" rx="0.3" fill="#92400e" opacity="0.6" />
        </svg>
      );

    case "ice_cream":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <path d="M11 22l5-14 5 14H11z" fill="#fde68a" />
          <circle cx="16" cy="10" r="5" fill="#fce7f3" />
          <circle cx="13" cy="9" r="2.5" fill="#fbcfe8" />
          <circle cx="19" cy="9" r="2.2" fill="#f9a8d4" />
          <path d="M13 22h6l-1 3h-4l-1-3z" fill="#d6d3d1" />
        </svg>
      );

    case "biscuit":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <circle cx="16" cy="16" r="8" fill="#d97706" />
          <circle cx="16" cy="16" r="5.5" fill="#fde68a" />
          <circle cx="16" cy="16" r="1.8" fill="#92400e" opacity="0.35" />
        </svg>
      );

    case "pancake":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <ellipse cx="16" cy="20" rx="9" ry="3" fill="#ca8a04" />
          <ellipse cx="16" cy="17" rx="9" ry="3" fill="#fde68a" />
          <ellipse cx="16" cy="14" rx="8.5" ry="2.8" fill="#fef3c7" />
          <ellipse cx="16" cy="11" rx="1.8" ry="0.8" fill="#fbbf24" />
        </svg>
      );

    case "muffin":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={`nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`}>
          <path d="M10 20h12v3c0 1-1 2-2 2H12c-1 0-2-1-2-2v-3z" fill="#92400e" />
          <path
            d="M10 20c0-4 2.5-8 6-8s6 4 6 8"
            fill="#d97706"
          />
          <circle cx="12" cy="14" r="1.5" fill="#78350f" />
          <circle cx="16" cy="12" r="1.8" fill="#78350f" />
          <circle cx="20" cy="14" r="1.4" fill="#78350f" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className="nc-food-icon-svg">
          <circle cx="16" cy="16" r="8" fill="#e2e8f0" />
        </svg>
      );
  }
}
