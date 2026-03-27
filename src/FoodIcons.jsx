import React from "react";

/**
 * Icônes aliments illustrées — style cohérent, dégradés doux, rendu premium (landing UKAN).
 * Chaque instance utilise useId pour des IDs de dégradé uniques.
 */
export function FoodIcon({ name }) {
  const raw = React.useId();
  const id = raw.replace(/:/g, "");
  const gid = (s) => `fi-${id}-${s}`;

  switch (name) {
    case "broccoli":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className="nc-food-icon-svg">
          <defs>
            <linearGradient id={gid("stem")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <radialGradient id={gid("fl1")} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#bbf7d0" />
              <stop offset="100%" stopColor="#16a34a" />
            </radialGradient>
            <radialGradient id={gid("fl2")} cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#15803d" />
            </radialGradient>
            <radialGradient id={gid("fl3")} cx="45%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#166534" />
            </radialGradient>
          </defs>
          <path
            d="M14 18h4v10c0 1.5-1 2.5-2 2.5s-2-1-2-2.5V18z"
            fill={`url(#${gid("stem")})`}
            opacity="0.95"
          />
          <circle cx="12" cy="12" r="4.2" fill={`url(#${gid("fl1")})`} />
          <circle cx="16" cy="9" r="4.8" fill={`url(#${gid("fl2")})`} />
          <circle cx="20" cy="12" r="4.2" fill={`url(#${gid("fl3")})`} />
          <ellipse cx="16" cy="13" rx="5" ry="3.5" fill="#22c55e" opacity="0.35" />
        </svg>
      );

    case "chicken":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className="nc-food-icon-svg">
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
          {/* Cuisse : silhouette reconnaissable + os */}
          <path
            d="M23.5 7.5c1.2 0.8 2 2.2 1.8 4-.3 3.5-3.8 7.5-8.8 10.8-4.5 3-9.5 4-12.8 2.8-2-.8-3-2.8-2-5.5 1.2-3.2 5.5-6.5 10.5-8.5 4-1.8 8-2.2 10.5-1.6z"
            fill={`url(#${gid("meat")})`}
          />
          <circle cx="24.5" cy="8.5" r="2.4" fill={`url(#${gid("bone")})`} />
          <ellipse cx="20" cy="14" rx="3.5" ry="2" fill="#f59e0b" opacity="0.35" />
          <path
            d="M14 17c2.5 1 5.5 0.8 8-0.5"
            fill="none"
            stroke="#b45309"
            strokeWidth="0.45"
            strokeLinecap="round"
            opacity="0.45"
          />
        </svg>
      );

    case "rice":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className="nc-food-icon-svg">
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
          <path
            d="M6 20c0-5 4.5-9 10-9s10 4 10 9c0 2.5-12 4.5-20 0z"
            fill={`url(#${gid("bowl")})`}
          />
          <ellipse cx="16" cy="17" rx="8.5" ry="5" fill={`url(#${gid("rice")})`} />
          <path
            d="M10 16.5c2-1.2 4.5-1.5 6-1M14 14c2-0.8 4-0.5 5.5 0M18 15.5c1.5-0.5 3.5-0.3 5 0.8"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="0.45"
            strokeLinecap="round"
            opacity="0.9"
          />
          <ellipse cx="16" cy="11" rx="6" ry="3.2" fill="#ffffff" opacity="0.85" />
        </svg>
      );

    case "milk":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className="nc-food-icon-svg">
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
          <path
            d="M13 16h6M13 19h4"
            stroke="#bae6fd"
            strokeWidth="0.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      );

    case "egg":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className="nc-food-icon-svg">
          <defs>
            <radialGradient id={gid("shell")} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fffef7" />
              <stop offset="50%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fde68a" />
            </radialGradient>
            <linearGradient id={gid("shine")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="7.5" ry="9.5" fill={`url(#${gid("shell")})`} />
          <ellipse cx="13.5" cy="13.5" rx="3" ry="4" fill={`url(#${gid("shine")})`} opacity="0.5" />
        </svg>
      );

    case "banana":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className="nc-food-icon-svg">
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
          <path
            d="M22 7.5c2 2.5 1.5 6-1 9.5"
            fill="none"
            stroke="#eab308"
            strokeWidth="0.55"
            strokeLinecap="round"
            opacity="0.45"
          />
          <ellipse cx="10" cy="25.5" rx="2" ry="2.2" fill={`url(#${gid("tip")})`} transform="rotate(-18 10 25.5)" />
        </svg>
      );

    case "steak":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className="nc-food-icon-svg">
          <defs>
            <linearGradient id={gid("meat")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="40%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
            <linearGradient id={gid("fat")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fecaca" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fecaca" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="11" ry="7" fill={`url(#${gid("meat")})`} />
          <path
            d="M8 16.5c3 0.8 6 1 9 0.3M9 14.5c2.5 0.5 5 0.6 7.5 0.2M10 19c2.5 0.4 5 0.5 8-0.2"
            fill="none"
            stroke="#fecdd3"
            strokeWidth="0.55"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M12 12.5c2-0.5 4-0.3 5.5 0.5"
            fill="none"
            stroke={`url(#${gid("fat")})`}
            strokeWidth="0.7"
            strokeLinecap="round"
          />
          <ellipse cx="16" cy="14" rx="6" ry="2.5" fill="#ffffff" opacity="0.12" />
        </svg>
      );

    default:
      return null;
  }
}
