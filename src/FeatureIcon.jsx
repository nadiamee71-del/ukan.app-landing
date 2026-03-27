import React from "react";

/**
 * Icônes stroke 24×24 — tons orange charte (#FF8A2B), section fonctionnalités incluse.
 */
export function FeatureIcon({ name, tone = "coral" }) {
  const uid = React.useId().replace(/:/g, "");
  const gradId = `ftg${uid}`;
  const grad =
    tone === "gold"
      ? { a: "#ff8a2b", b: "#e67316" }
      : { a: "#ff8a2b", b: "#e67316" };

  const common = {
    fill: "none",
    stroke: `url(#${gradId})`,
    strokeWidth: 1.65,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  let content = null;
  switch (name) {
    case "defis":
      content = (
        <>
          <path d="M13 2L3 14h8.5l-1 8L21 10h-8.5l1-8z" {...common} />
        </>
      );
      break;
    case "nutrition":
      content = (
        <>
          <path
            d="M11 20a7 7 0 0 1-1.2-13.8 15 15 0 0 0 11.2 9.8A7 7 0 0 1 11 20z"
            {...common}
          />
          <path d="M12 12c-2-3-1-7 2-9" {...common} />
        </>
      );
      break;
    case "seances":
      content = (
        <>
          <path d="M6.5 12h11" {...common} />
          <path d="M5 9v6M19 9v6" {...common} />
          <circle cx="5" cy="12" r="2.5" {...common} />
          <circle cx="19" cy="12" r="2.5" {...common} />
        </>
      );
      break;
    case "communaute":
      content = (
        <>
          <circle cx="9" cy="7" r="3.5" {...common} />
          <path d="M3 20v-1.5a4.5 4.5 0 0 1 4.5-4.5h3a4.5 4.5 0 0 1 4.5 4.5V20" {...common} />
          <path d="M16 11a3 3 0 1 0 0-6" {...common} />
          <path d="M21 20v-1a4 4 0 0 0-3-3.87" {...common} />
        </>
      );
      break;
    case "suivi":
      content = (
        <>
          <path d="M3 3v18h18" {...common} />
          <path d="M7 16l4-6 3 3 5-8" {...common} />
          <path d="M19 11v5h-5" {...common} />
        </>
      );
      break;
    case "avantApres":
      content = (
        <>
          <rect x="3" y="5" width="8" height="14" rx="2" {...common} />
          <rect x="13" y="7" width="8" height="10" rx="2" {...common} />
          <path d="M6 10l2 2 1.5-2" {...common} />
          <path d="M15 11h4M15 14h3" {...common} />
        </>
      );
      break;
    case "visibilite":
      content = (
        <>
          <path
            d="M3 11v4a2 2 0 0 0 2 2h2.5l4.5 2v-12L7.5 9H5a2 2 0 0 0-2 2z"
            {...common}
          />
          <path d="M18 6v12M15 9a3 3 0 0 0 0 6" {...common} />
        </>
      );
      break;
    case "suiviEleves":
      content = (
        <>
          <path
            d="M9 2h6l1 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3l1-2z"
            {...common}
          />
          <path d="M9 12h6M9 16h4" {...common} />
        </>
      );
      break;
    case "nutritionCoach":
      content = (
        <>
          <path d="M12 3c-2 4-4 7-4 10a4 4 0 0 0 8 0c0-3-2-6-4-10z" {...common} />
          <path d="M12 13v5M9 18h6" {...common} />
        </>
      );
      break;
    case "communauteCoach":
      content = (
        <>
          <path
            d="M21 15a4 4 0 0 1-4 4H8l-4 3V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z"
            {...common}
          />
          <path d="M8 10h8M8 14h5" {...common} />
        </>
      );
      break;
    case "challenges":
      content = (
        <>
          <circle cx="12" cy="12" r="9" {...common} />
          <circle cx="12" cy="12" r="5" {...common} />
          <circle cx="12" cy="12" r="1.2" fill={`url(#${gradId})`} stroke="none" />
        </>
      );
      break;
    case "dashboard":
      content = (
        <>
          <rect x="3" y="3" width="7" height="9" rx="1.5" {...common} />
          <rect x="14" y="3" width="7" height="5" rx="1.5" {...common} />
          <rect x="14" y="11" width="7" height="10" rx="1.5" {...common} />
          <rect x="3" y="15" width="7" height="6" rx="1.5" {...common} />
        </>
      );
      break;
    default:
      return null;
  }

  return (
    <svg
      className="lp-ft-icon"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor={grad.a} />
          <stop offset="1" stopColor={grad.b} />
        </linearGradient>
      </defs>
      {content}
    </svg>
  );
}
