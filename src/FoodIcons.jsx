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

    default:
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className="nc-food-icon-svg">
          <circle cx="16" cy="16" r="8" fill="#e2e8f0" />
        </svg>
      );
  }
}
