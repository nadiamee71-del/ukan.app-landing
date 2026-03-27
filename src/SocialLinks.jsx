import React from "react";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function IconInstagram() {
  return (
    <svg className="lp-social__svg" viewBox="0 0 24 24" aria-hidden focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" {...stroke} />
      <circle cx="12" cy="12" r="4" {...stroke} />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg className="lp-social__svg" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-12h4v1.5a4 4 0 0 1 4-1.5zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        {...stroke}
      />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg className="lp-social__svg" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg className="lp-social__svg" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M4 6h16v12H4z" {...stroke} />
      <path d="M4 7l8 6 8-6" {...stroke} />
    </svg>
  );
}

const ICON_BY_ID = {
  instagram: IconInstagram,
  linkedin: IconLinkedIn,
  tiktok: IconTikTok,
  mail: IconMail,
};

/**
 * @param {{ links: { instagram: string, linkedin: string, tiktok: string, email: string } }} props
 */
export function SocialLinks({ links }) {
  const { instagram, linkedin, tiktok, email } = links;

  const items = [
    { id: "instagram", href: instagram, label: "UKAN sur Instagram" },
    { id: "linkedin", href: linkedin, label: "UKAN sur LinkedIn" },
    { id: "tiktok", href: tiktok, label: "UKAN sur TikTok" },
    { id: "mail", href: email, label: "Contacter UKAN par e-mail" },
  ];

  return (
    <div className="lp-footer__social" role="navigation" aria-label="Réseaux sociaux et contact">
      {items.map(({ id, href, label }) => {
        const Icon = ICON_BY_ID[id];
        const isHttp = String(href).startsWith("http");
        return (
          <a
            key={id}
            href={href}
            className="lp-social-link"
            aria-label={label}
            {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {Icon ? <Icon /> : null}
          </a>
        );
      })}
    </div>
  );
}
