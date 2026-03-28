import React from "react";

/**
 * Icônes aliments — style cartoon enfantin (formes rondes, reflets, couleurs vives).
 * `size="lg"` pour les contenants (assiette / verre / dessert).
 */
export function FoodIcon({ name, size = "md" }) {
  const raw = React.useId();
  const id = raw.replace(/:/g, "");
  const gid = (s) => `fi-${id}-${s}`;
  const lg = size === "lg";
  const cls = `nc-food-icon-svg ${lg ? "nc-food-icon-svg--lg" : ""}`;

  switch (name) {
    /* ═══════════ FÉCULENTS ═══════════ */
    case "rice":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("b")} cx="50%" cy="60%" r="55%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#94a3b8" />
            </radialGradient>
            <radialGradient id={gid("r")} cx="45%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </radialGradient>
          </defs>
          <ellipse cx="16" cy="22" rx="10" ry="5.5" fill={`url(#${gid("b")})`} />
          <path d="M6 20c0-4 4.5-7 10-7s10 3 10 7" fill={`url(#${gid("b")})`} />
          <ellipse cx="16" cy="16" rx="8.5" ry="4.8" fill={`url(#${gid("r")})`} />
          <ellipse cx="13" cy="15" rx="1.2" ry="0.7" fill="#fff" opacity="0.8" transform="rotate(-15 13 15)" />
          <ellipse cx="16.5" cy="14.5" rx="1" ry="0.6" fill="#fff" opacity="0.7" transform="rotate(10 16.5 14.5)" />
          <ellipse cx="19" cy="15.5" rx="1.1" ry="0.65" fill="#fff" opacity="0.75" />
          <ellipse cx="12" cy="13" rx="2.5" ry="1.5" fill="#fff" opacity="0.45" />
        </svg>
      );

    case "spaghetti":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("b")} cx="50%" cy="65%" r="50%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#64748b" />
            </radialGradient>
            <linearGradient id={gid("p")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="22" rx="10.5" ry="5" fill={`url(#${gid("b")})`} />
          <path d="M5.5 20c0-4 4.5-7.5 10.5-7.5s10.5 3.5 10.5 7.5" fill={`url(#${gid("b")})`} />
          <path d="M9 15c2.5-1 5-2 8-2M8 17c3-0.5 7-1 11-0.5M9 19c3 0.2 7 0.5 10 0M10 21c3 0.3 6 0.3 9 0" fill="none" stroke={`url(#${gid("p")})`} strokeWidth="1.4" strokeLinecap="round" />
          <ellipse cx="16" cy="14" rx="5.5" ry="2.8" fill="#fbbf24" opacity="0.7" />
          <circle cx="14" cy="13" r="1.8" fill="#dc2626" opacity="0.85" />
          <circle cx="17" cy="14" r="1.2" fill="#dc2626" opacity="0.7" />
          <ellipse cx="12" cy="13" rx="2" ry="1.2" fill="#fff" opacity="0.35" />
        </svg>
      );

    case "fries":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("box")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id={gid("f")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
          <path d="M9 26h14l-2.5-14h-9L9 26z" fill={`url(#${gid("box")})`} />
          <rect x="11.5" y="5" width="2.2" height="14" rx="1.1" fill={`url(#${gid("f")})`} transform="rotate(-4 12.6 12)" />
          <rect x="14.5" y="4" width="2.2" height="15" rx="1.1" fill={`url(#${gid("f")})`} />
          <rect x="17.5" y="4.5" width="2.2" height="14.5" rx="1.1" fill={`url(#${gid("f")})`} transform="rotate(3 18.6 11.75)" />
          <rect x="20" y="6" width="2" height="12" rx="1" fill={`url(#${gid("f")})`} transform="rotate(6 21 12)" />
          <rect x="9" y="7" width="2" height="12" rx="1" fill={`url(#${gid("f")})`} transform="rotate(-6 10 13)" />
          <ellipse cx="13" cy="17" rx="3" ry="1.5" fill="#fff" opacity="0.2" />
        </svg>
      );

    case "potato":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("p")} cx="38%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="60%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#92400e" />
            </radialGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="10" ry="7.5" fill={`url(#${gid("p")})`} />
          <ellipse cx="12" cy="14" rx="3" ry="2" fill="#fff" opacity="0.3" />
          <circle cx="12" cy="16" r="1" fill="#713f12" opacity="0.3" />
          <circle cx="18" cy="19" r="0.8" fill="#713f12" opacity="0.25" />
          <circle cx="14" cy="20" r="0.6" fill="#713f12" opacity="0.2" />
        </svg>
      );

    case "quinoa":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("b")} cx="50%" cy="60%" r="50%">
              <stop offset="0%" stopColor="#e7e5e4" />
              <stop offset="100%" stopColor="#78716c" />
            </radialGradient>
          </defs>
          <ellipse cx="16" cy="22" rx="10" ry="5" fill={`url(#${gid("b")})`} />
          <path d="M6 20c0-4 4.5-7 10-7s10 3 10 7" fill={`url(#${gid("b")})`} />
          <circle cx="11" cy="16.5" r="1.3" fill="#fef3c7" /><circle cx="14" cy="15.5" r="1.2" fill="#fde68a" />
          <circle cx="17" cy="16" r="1.3" fill="#e7e5e4" /><circle cx="20" cy="16.5" r="1.1" fill="#fef3c7" />
          <circle cx="12.5" cy="18.5" r="1.1" fill="#d6d3d1" /><circle cx="16" cy="18" r="1.2" fill="#fde68a" />
          <circle cx="19" cy="18.5" r="1.1" fill="#e7e5e4" />
          <ellipse cx="13" cy="14" rx="2" ry="1.2" fill="#fff" opacity="0.35" />
        </svg>
      );

    case "semoule":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("b")} cx="50%" cy="60%" r="50%">
              <stop offset="0%" stopColor="#e7e5e4" />
              <stop offset="100%" stopColor="#a8a29e" />
            </radialGradient>
          </defs>
          <ellipse cx="16" cy="22" rx="10" ry="5" fill={`url(#${gid("b")})`} />
          <path d="M6 20c0-4 4.5-7 10-7s10 3 10 7" fill={`url(#${gid("b")})`} />
          <ellipse cx="16" cy="17" rx="7.5" ry="4" fill="#fef9c3" />
          <circle cx="12" cy="16.5" r="0.9" fill="#fde047" opacity="0.8" />
          <circle cx="15" cy="15.8" r="0.85" fill="#fde047" opacity="0.75" />
          <circle cx="18" cy="16.2" r="0.9" fill="#fde047" opacity="0.8" />
          <circle cx="20" cy="17.5" r="0.7" fill="#fde047" opacity="0.7" />
          <ellipse cx="13" cy="14.5" rx="2" ry="1.2" fill="#fff" opacity="0.35" />
        </svg>
      );

    case "bread":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("l")} cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#b45309" />
            </radialGradient>
          </defs>
          <path d="M8 22c0-7 3.5-14 8-14s8 7 8 14c0 2-3.5 4-8 4s-8-2-8-4z" fill={`url(#${gid("l")})`} />
          <path d="M12 14c2-3 6-3 8 0" fill="none" stroke="#a16207" strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
          <ellipse cx="13" cy="14" rx="2.5" ry="2" fill="#fff" opacity="0.3" />
        </svg>
      );

    case "sweet_potato":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("s")} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="60%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#9a3412" />
            </radialGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="11" ry="6.5" fill={`url(#${gid("s")})`} transform="rotate(-8 16 17)" />
          <ellipse cx="12" cy="14" rx="2.5" ry="1.8" fill="#fff" opacity="0.3" />
        </svg>
      );

    /* ═══════════ LÉGUMES ═══════════ */
    case "broccoli":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("f1")} cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#bbf7d0" />
              <stop offset="100%" stopColor="#16a34a" />
            </radialGradient>
            <linearGradient id={gid("st")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
          </defs>
          <rect x="14" y="18" width="4" height="10" rx="2" fill={`url(#${gid("st")})`} />
          <circle cx="12" cy="13" r="4.5" fill={`url(#${gid("f1")})`} />
          <circle cx="16.5" cy="10" r="5" fill="#22c55e" />
          <circle cx="21" cy="13" r="4.2" fill="#15803d" />
          <ellipse cx="14" cy="14" rx="5.5" ry="3.5" fill="#16a34a" opacity="0.4" />
          <ellipse cx="12" cy="10" rx="2" ry="1.5" fill="#fff" opacity="0.4" />
          <ellipse cx="17" cy="8" rx="1.8" ry="1.2" fill="#fff" opacity="0.35" />
        </svg>
      );

    case "carrot":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("c")} x1="0.3" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <path d="M16 6c-3 0-5 2-5.5 5l-1 14c0 2 2.5 3 4.5 3h4c2 0 4.5-1 4.5-3l-1-14C21 8 19 6 16 6z" fill={`url(#${gid("c")})`} />
          <path d="M13 6l-2-3M16 5l0-3.5M19 6l2-3" stroke="#22c55e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <ellipse cx="13.5" cy="10" rx="2" ry="1.5" fill="#fff" opacity="0.35" />
          <path d="M12 15h3M11.5 19h4M12 23h3" stroke="#c2410c" strokeWidth="0.5" opacity="0.3" strokeLinecap="round" />
        </svg>
      );

    case "tomato":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("t")} cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </radialGradient>
          </defs>
          <circle cx="16" cy="18" r="8.5" fill={`url(#${gid("t")})`} />
          <path d="M12 9c2-1 5-1 8 0 1 2.5-2 4.5-4 3.5-3.5-1.5-4-3.5-4-3.5z" fill="#22c55e" />
          <ellipse cx="13" cy="14" rx="2.5" ry="1.8" fill="#fff" opacity="0.35" />
        </svg>
      );

    case "zucchini":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("z")} x1="0.3" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="5.5" ry="11.5" fill={`url(#${gid("z")})`} transform="rotate(-12 16 17)" />
          <ellipse cx="16" cy="8" rx="2.2" ry="1.5" fill="#166534" />
          <ellipse cx="13.5" cy="13" rx="1.8" ry="3" fill="#fff" opacity="0.25" transform="rotate(-12 13.5 13)" />
        </svg>
      );

    case "pepper":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("p")} cx="38%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#a16207" />
            </radialGradient>
          </defs>
          <path d="M16 8c4 0 7 4 7 10 0 7-3 12-7 12s-7-5-7-12c0-6 3-10 7-10z" fill={`url(#${gid("p")})`} />
          <rect x="14.5" y="4" width="3" height="4" rx="1.5" fill="#166534" />
          <ellipse cx="13" cy="14" rx="2" ry="3" fill="#fff" opacity="0.3" />
        </svg>
      );

    case "green_beans":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("g")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
          </defs>
          <path d="M8 8c1 5 2 11 2 17" stroke={`url(#${gid("g")})`} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M13 6c1.5 6 2 12 1.5 18" stroke="#22c55e" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M18 8c0.5 5.5 0.5 11-0.5 16" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M22 10c-0.5 5-1 10-2 14" stroke="#15803d" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <ellipse cx="12" cy="10" rx="1.5" ry="2.5" fill="#fff" opacity="0.25" />
        </svg>
      );

    case "eggplant":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("e")} cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#d8b4fe" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#581c87" />
            </radialGradient>
          </defs>
          <ellipse cx="16" cy="18" rx="6.5" ry="10.5" fill={`url(#${gid("e")})`} transform="rotate(8 16 18)" />
          <path d="M13 7h6l1.5 3.5h-9L13 7z" fill="#22c55e" />
          <ellipse cx="13" cy="14" rx="2" ry="3.5" fill="#fff" opacity="0.25" transform="rotate(8 13 14)" />
        </svg>
      );

    case "cucumber":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("cu")} x1="0.3" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="5" ry="11.5" fill={`url(#${gid("cu")})`} transform="rotate(-6 16 17)" />
          <ellipse cx="16" cy="17" rx="3" ry="8" fill="#bbf7d0" opacity="0.4" />
          <circle cx="15" cy="13" r="0.6" fill="#166534" opacity="0.3" />
          <circle cx="17" cy="16" r="0.5" fill="#166534" opacity="0.25" />
          <circle cx="15.5" cy="19" r="0.55" fill="#166534" opacity="0.28" />
          <ellipse cx="14" cy="12" rx="1.5" ry="2.5" fill="#fff" opacity="0.25" />
        </svg>
      );

    /* ═══════════ PROTÉINES ═══════════ */
    case "chicken":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("m")} cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#92400e" />
            </radialGradient>
            <radialGradient id={gid("bn")} cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="100%" stopColor="#d6d3d1" />
            </radialGradient>
          </defs>
          <path d="M9 12c0-3 2-5 5-5 4 0 7 3 8 8 1 5-0.5 10-4 12-3 2-7 1-9-2-1.5-2.5-1.5-5.5 0-8z" fill={`url(#${gid("m")})`} />
          <path d="M22 12c1-2 3-3 4.5-2.5 2 0.8 1.5 3 0.5 4.5l-3 3" fill={`url(#${gid("bn")})`} />
          <circle cx="26" cy="9" r="2.5" fill={`url(#${gid("bn")})`} />
          <ellipse cx="12" cy="12" rx="3" ry="2.5" fill="#fff" opacity="0.3" />
          <path d="M11 16c2 0.5 5 0 7-1" stroke="#b45309" strokeWidth="0.5" opacity="0.3" fill="none" strokeLinecap="round" />
        </svg>
      );

    case "steak":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("s")} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="40%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="11.5" ry="7.5" fill={`url(#${gid("s")})`} />
          <path d="M8 15c3 1 7 1 10 0M9 18c3 0.5 6 0.5 9 0M10 21c2 0.3 5 0.3 7 0" fill="none" stroke="#fecdd3" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
          <ellipse cx="12" cy="13" rx="3" ry="2" fill="#fff" opacity="0.25" />
        </svg>
      );

    case "fish":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("f")} cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>
          </defs>
          <path d="M5 16c4-6 11-9 18-7 2 0.5 4 2.5 4 4.5s-2 4-4 4.5c-7 2-14 0-18-7z" fill={`url(#${gid("f")})`} />
          <path d="M6.5 14.5l-2.5 2 2.5 2" fill="#7dd3fc" />
          <circle cx="22" cy="14" r="2" fill="#0c4a6e" />
          <circle cx="21.5" cy="13.5" r="0.7" fill="#fff" />
          <ellipse cx="14" cy="13" rx="3" ry="1.5" fill="#fff" opacity="0.3" />
        </svg>
      );

    case "egg":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("e")} cx="40%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#fffef7" />
              <stop offset="50%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fde68a" />
            </radialGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="8" ry="10" fill={`url(#${gid("e")})`} />
          <ellipse cx="13" cy="13" rx="2.5" ry="3" fill="#fff" opacity="0.5" />
        </svg>
      );

    case "turkey":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("t")} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f5f5f4" />
              <stop offset="50%" stopColor="#d6d3d1" />
              <stop offset="100%" stopColor="#78716c" />
            </radialGradient>
          </defs>
          <ellipse cx="16" cy="17" rx="10.5" ry="7.5" fill={`url(#${gid("t")})`} />
          <ellipse cx="12" cy="14" rx="2.5" ry="2" fill="#fff" opacity="0.3" />
          <path d="M10 18c3 0.5 7 0.5 10 0" stroke="#a8a29e" strokeWidth="0.5" opacity="0.35" fill="none" />
        </svg>
      );

    case "salmon":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("s")} cx="42%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fecdd3" />
              <stop offset="50%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#be123c" />
            </radialGradient>
          </defs>
          <path d="M5 16c4-6 12-9 19-7 2.5 0.8 4 3 3.5 5s-2 3.5-4.5 4c-7 2-14-1-18-7z" fill={`url(#${gid("s")})`} />
          <path d="M9 14h9M9 17h8" stroke="#fecdd3" strokeWidth="0.6" opacity="0.5" strokeLinecap="round" />
          <ellipse cx="14" cy="13" rx="3" ry="1.8" fill="#fff" opacity="0.25" />
        </svg>
      );

    case "tuna":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("c")} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </radialGradient>
          </defs>
          <rect x="8" y="9" width="16" height="16" rx="3" fill={`url(#${gid("c")})`} />
          <ellipse cx="16" cy="10.5" rx="7" ry="2" fill="#334155" />
          <circle cx="16" cy="17" r="4" fill="#fda4af" opacity="0.6" />
          <ellipse cx="13" cy="13" rx="2" ry="1.5" fill="#fff" opacity="0.15" />
        </svg>
      );

    case "tofu":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("t")} cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#fefce8" />
              <stop offset="100%" stopColor="#fef08a" />
            </radialGradient>
          </defs>
          <path d="M9 12l7-4 7 4v10l-7 4-7-4V12z" fill={`url(#${gid("t")})`} />
          <path d="M9 12l7 4 7-4" fill="none" stroke="#eab308" strokeWidth="0.7" opacity="0.4" />
          <path d="M16 16v10" fill="none" stroke="#eab308" strokeWidth="0.5" opacity="0.3" />
          <ellipse cx="13" cy="13" rx="2" ry="1.5" fill="#fff" opacity="0.4" />
        </svg>
      );

    /* ═══════════ BOISSONS ═══════════ */
    case "water":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("g")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <path d="M11 5h10l1.5 3v17c0 1.5-1.5 3-3.5 3h-6c-2 0-3.5-1.5-3.5-3V8L11 5z" fill={`url(#${gid("g")})`} />
          <path d="M11 5h10" stroke="#bae6fd" strokeWidth="1" />
          <ellipse cx="14" cy="10" rx="2" ry="3" fill="#fff" opacity="0.4" />
        </svg>
      );

    case "milk":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("c")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id={gid("a")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <path d="M11 6h10l1.5 3v16c0 1.5-1 2.5-2.5 2.5h-8C10.5 27.5 9.5 26.5 9.5 25V9L11 6z" fill={`url(#${gid("c")})`} />
          <rect x="11" y="6" width="10" height="4" rx="0.5" fill={`url(#${gid("a")})`} opacity="0.85" />
          <rect x="12" y="13" width="8" height="10" rx="1" fill="#fff" opacity="0.7" />
          <ellipse cx="13.5" cy="12" rx="1.8" ry="2.5" fill="#fff" opacity="0.35" />
        </svg>
      );

    case "juice":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("j")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <path d="M11 7h10l1 3.5v14c0 1.5-1 2.5-2.5 2.5h-7C11 27 10 26 10 24.5V10.5L11 7z" fill={`url(#${gid("j")})`} opacity="0.9" />
          <ellipse cx="16" cy="9.5" rx="5.5" ry="2" fill="#fb923c" />
          <ellipse cx="13.5" cy="12" rx="1.8" ry="2.5" fill="#fff" opacity="0.3" />
          <circle cx="18" cy="5" r="2.5" fill="#f97316" />
          <circle cx="18" cy="5" r="1" fill="#fdba74" />
        </svg>
      );

    case "soda":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("c")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#b91c1c" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
          </defs>
          <rect x="10" y="5" width="12" height="22" rx="3" fill={`url(#${gid("c")})`} />
          <ellipse cx="16" cy="6.5" rx="5.5" ry="1.8" fill="#991b1b" />
          <rect x="11.5" y="8" width="3" height="16" rx="1" fill="#fff" opacity="0.15" />
          <path d="M12 19h8" stroke="#fecaca" strokeWidth="0.7" opacity="0.5" />
          <ellipse cx="16" cy="14" rx="3" ry="1" fill="#fff" opacity="0.12" />
        </svg>
      );

    case "coffee":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("c")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#78716c" />
              <stop offset="100%" stopColor="#292524" />
            </linearGradient>
          </defs>
          <path d="M8 11h13v2c0 6.5-2.5 11-6.5 11S8 19.5 8 13v-2z" fill={`url(#${gid("c")})`} />
          <path d="M21 13h2.5c2 0 3.5 1.5 3.5 3.5S25.5 20 23.5 20H21" fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="14.5" cy="10" rx="5.5" ry="1.5" fill="#d6d3d1" opacity="0.6" />
          <path d="M12 6c0-2 1-3 1-3M15 5c0-2 1-3 1-3M18 6c0-2 1-3 1-3" stroke="#a8a29e" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4" />
          <ellipse cx="12" cy="14" rx="2" ry="2.5" fill="#fff" opacity="0.12" />
        </svg>
      );

    case "tea":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("t")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a8a29e" />
              <stop offset="100%" stopColor="#57534e" />
            </linearGradient>
          </defs>
          <path d="M9 12h11v10.5c0 2.5-2 4-5.5 4s-5.5-1.5-5.5-4V12z" fill={`url(#${gid("t")})`} />
          <path d="M20 14h2.5c1.5 0 3 1.2 3 3s-1.5 3-3 3H20" fill="none" stroke="#78716c" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="14.5" cy="11" rx="4.5" ry="1.5" fill="#86efac" opacity="0.55" />
          <path d="M12 7c0-1.5 0.5-2.5 0.5-2.5M15 6.5c0-1.5 0.5-2.5 0.5-2.5" stroke="#86efac" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.5" />
        </svg>
      );

    case "smoothie":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("s")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f9a8d4" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <path d="M11 8h10l-1 15c0 2-1.5 3-3.5 3h-3c-2 0-3.5-1-3.5-3L11 8z" fill={`url(#${gid("s")})`} />
          <ellipse cx="16" cy="8" rx="5.5" ry="2" fill="#e9d5ff" />
          <ellipse cx="13.5" cy="12" rx="1.5" ry="3" fill="#fff" opacity="0.2" />
          <line x1="16" y1="4" x2="16" y2="8" stroke="#e9d5ff" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="16" cy="3.5" r="1.5" fill="#22c55e" />
        </svg>
      );

    case "energy_drink":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("e")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          <rect x="10" y="5" width="12" height="22" rx="2.5" fill={`url(#${gid("e")})`} />
          <path d="M14 14l2 4 2-4" stroke="#ecfeff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="11.5" y="8" width="2.5" height="14" rx="0.5" fill="#fff" opacity="0.12" />
        </svg>
      );

    /* ═══════════ DESSERTS ═══════════ */
    case "cake":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("c")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            <linearGradient id={gid("f")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fce7f3" />
              <stop offset="100%" stopColor="#f9a8d4" />
            </linearGradient>
          </defs>
          <rect x="7" y="18" width="18" height="8" rx="2" fill={`url(#${gid("c")})`} />
          <rect x="9" y="12" width="14" height="7" rx="1.5" fill="#fcd34d" />
          <path d="M9 13c2 1.5 5 2 7 2s5-0.5 7-2" fill={`url(#${gid("f")})`} />
          <ellipse cx="16" cy="12" rx="7" ry="2.2" fill="#fef3c7" />
          <rect x="15" y="6" width="2" height="6" rx="1" fill="#fb923c" />
          <ellipse cx="16" cy="5.5" rx="1.5" ry="2" fill="#f59e0b" />
          <circle cx="16" cy="5" r="0.8" fill="#fde047" />
        </svg>
      );

    case "fruit":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("a")} cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#bbf7d0" />
              <stop offset="50%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </radialGradient>
          </defs>
          <circle cx="16" cy="18" r="9" fill={`url(#${gid("a")})`} />
          <path d="M16 9v-3M14 6c2-1.5 4.5-1.5 7 0" stroke="#166534" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M17 7c1.5-1 3-0.5 4 0.5" fill="#22c55e" opacity="0.8" />
          <ellipse cx="13" cy="14" rx="2.5" ry="3" fill="#fff" opacity="0.35" />
        </svg>
      );

    case "yogurt":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("y")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>
          <path d="M10 10h12l-0.5 13c0 2-2 3.5-5.5 3.5s-5.5-1.5-5.5-3.5L10 10z" fill={`url(#${gid("y")})`} />
          <ellipse cx="16" cy="10" rx="6.5" ry="2.5" fill="#e2e8f0" />
          <ellipse cx="16" cy="16" rx="4" ry="2" fill="#fbbf24" opacity="0.5" />
          <circle cx="14" cy="15.5" r="1" fill="#f87171" opacity="0.6" />
          <circle cx="18" cy="16" r="0.8" fill="#f87171" opacity="0.5" />
          <ellipse cx="13" cy="13" rx="1.5" ry="2" fill="#fff" opacity="0.35" />
        </svg>
      );

    case "chocolate_bar":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("ch")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>
          <rect x="7" y="10" width="18" height="12" rx="2" fill={`url(#${gid("ch")})`} />
          <path d="M7 14h18M7 18h18M12 10v12M17 10v12" stroke="#92400e" strokeWidth="0.8" opacity="0.6" />
          <ellipse cx="11" cy="13" rx="2" ry="1.5" fill="#fff" opacity="0.12" />
        </svg>
      );

    case "ice_cream":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("cn")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <path d="M11 17l5 13 5-13" fill={`url(#${gid("cn")})`} />
          <path d="M12 18l3 10M20 18l-3 10" stroke="#a16207" strokeWidth="0.4" opacity="0.4" />
          <circle cx="16" cy="12" r="5.5" fill="#fce7f3" />
          <circle cx="12.5" cy="10.5" r="3.2" fill="#f9a8d4" />
          <circle cx="19" cy="10.5" r="3" fill="#c084fc" />
          <ellipse cx="14" cy="9" rx="1.5" ry="1" fill="#fff" opacity="0.4" />
          <ellipse cx="18" cy="9" rx="1.2" ry="0.8" fill="#fff" opacity="0.35" />
        </svg>
      );

    case "biscuit":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("b")} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </radialGradient>
          </defs>
          <circle cx="16" cy="16" r="9" fill={`url(#${gid("b")})`} />
          <circle cx="12" cy="13" r="1.2" fill="#78350f" opacity="0.5" />
          <circle cx="17" cy="11" r="1" fill="#78350f" opacity="0.45" />
          <circle cx="19" cy="15" r="1.1" fill="#78350f" opacity="0.5" />
          <circle cx="14" cy="18" r="1" fill="#78350f" opacity="0.45" />
          <circle cx="18" cy="20" r="1.1" fill="#78350f" opacity="0.4" />
          <ellipse cx="12" cy="11" rx="2.5" ry="2" fill="#fff" opacity="0.25" />
        </svg>
      );

    case "pancake":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <linearGradient id={gid("p")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="22" rx="9.5" ry="3" fill="#b45309" />
          <ellipse cx="16" cy="19" rx="9.5" ry="3" fill="#ca8a04" />
          <ellipse cx="16" cy="16" rx="9" ry="2.8" fill="#fbbf24" />
          <ellipse cx="16" cy="13" rx="8.5" ry="2.6" fill="#fde68a" />
          <ellipse cx="16" cy="11" rx="2" ry="1" fill="#fbbf24" />
          <ellipse cx="13" cy="12" rx="2" ry="1.2" fill="#fff" opacity="0.3" />
        </svg>
      );

    case "muffin":
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className={cls}>
          <defs>
            <radialGradient id={gid("m")} cx="40%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </radialGradient>
          </defs>
          <path d="M9 20h14v4c0 1.5-1.5 2.5-3 2.5h-8c-1.5 0-3-1-3-2.5v-4z" fill="#92400e" />
          <path d="M9 20c0-5 3-10 7-10s7 5 7 10" fill={`url(#${gid("m")})`} />
          <circle cx="12" cy="15" r="1.2" fill="#78350f" opacity="0.5" />
          <circle cx="16" cy="13" r="1.4" fill="#78350f" opacity="0.55" />
          <circle cx="20" cy="15" r="1.1" fill="#78350f" opacity="0.5" />
          <ellipse cx="12.5" cy="13" rx="2" ry="2.5" fill="#fff" opacity="0.2" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden className="nc-food-icon-svg">
          <circle cx="16" cy="16" r="8" fill="#e2e8f0" />
          <circle cx="14" cy="14" r="2" fill="#fff" opacity="0.4" />
        </svg>
      );
  }
}
