import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import logoDark from "./assets/logo.png";
import logoLight from "./assets/logo2.png";
import "./styles.css";

const SPORTIF_GOALS = [
  "Tout",
  "Progresser",
  "Trouver un coach",
  "Rester motivé",
  "Mieux manger",
  "Partager",
];

const COACH_GOALS = [
  "Tout",
  "Trouver des clients",
  "Gérer mes élèves",
  "Monétiser",
  "Animer",
  "Suivre la progression",
];

const COACH_SPECIALTIES = [
  "Musculation & force",
  "HIIT / cardio",
  "CrossTraining",
  "Nutrition sportive",
  "Running & endurance",
  "Yoga & mobilité",
  "Remise en forme",
  "Préparation physique",
];

/** Riche : filtres sportif/coach + objectif */
const FEATURES = [
  { role: "sportif", goals: ["Tout", "Progresser"], title: "Séances guidées", text: "Entraînements structurés, vidéos et progressions claires." },
  { role: "sportif", goals: ["Tout", "Trouver un coach"], title: "Coachs certifiés", text: "Profils vérifiés — la promesse UKAN : des coachs diplômés, pas du bricolage." },
  { role: "sportif", goals: ["Tout", "Rester motivé"], title: "Défis & objectifs", text: "Défis collectifs, rappels et fil d’énergie pour ne pas lâcher." },
  { role: "sportif", goals: ["Tout", "Mieux manger"], title: "Nutrition", text: "Suivi des apports et habitudes, sans tableur ni prise de tête." },
  { role: "sportif", goals: ["Tout", "Partager"], title: "Communauté", text: "Publications, entraide et profils — un vrai réseau sportif." },
  { role: "sportif", goals: ["Tout", "Rester motivé"], title: "Avant / après", text: "Visualise ton évolution et célèbre chaque étape." },
  { role: "sportif", goals: ["Tout", "Progresser"], title: "Bibliothèque d’exercices", text: "Mouvements expliqués pour t’entraîner partout." },
  { role: "sportif", goals: ["Tout", "Trouver un coach"], title: "Matching coach", text: "Trouve l’accompagnement qui colle à ton niveau et ton style." },
  { role: "coach", goals: ["Tout", "Trouver des clients"], title: "Visibilité", text: "Ton profil mis en avant auprès de sportifs motivés." },
  { role: "coach", goals: ["Tout", "Gérer mes élèves"], title: "Espace élèves", text: "Messagerie, planning et suivi — centralisés." },
  { role: "coach", goals: ["Tout", "Monétiser"], title: "Lives & contenus", text: "Monétise tes séances et tes formats premium." },
  { role: "coach", goals: ["Tout", "Animer"], title: "Communauté", text: "Anime ton audience et crée de l’engagement durable." },
  { role: "coach", goals: ["Tout", "Suivre la progression"], title: "Tableau de bord", text: "Lis les progrès de tes élèves en un coup d’œil." },
  { role: "coach", goals: ["Tout", "Gérer mes élèves"], title: "Outils pro", text: "Moins d’outils éparpillés, plus de temps pour coacher." },
  { role: "coach", goals: ["Tout", "Trouver des clients"], title: "Certification", text: "Mise en avant réservée aux coachs certifiés — crédibilité immédiate." },
];

/** Aperçu « une fonctionnalité à la fois » — section Pourquoi UKAN */
const SHOWCASE_SPORTIF = [
  { title: "Séances guidées", text: "Entraînements structurés, vidéos et progressions claires." },
  { title: "Coachs certifiés", text: "Profils vérifiés — la promesse UKAN : des coachs diplômés, pas du bricolage." },
  { title: "Défis & objectifs", text: "Défis collectifs, rappels et fil d’énergie pour ne pas lâcher." },
  { title: "Nutrition", text: "Suivi des apports et habitudes, sans tableur ni prise de tête." },
  { title: "Communauté", text: "Publications, entraide et profils — un vrai réseau sportif." },
  { title: "Avant / après", text: "Visualise ton évolution et célèbre chaque étape." },
  { title: "Bibliothèque d’exercices", text: "Mouvements expliqués pour t’entraîner partout." },
  { title: "Matching coach", text: "Trouve l’accompagnement qui colle à ton niveau et ton style." },
];

const SHOWCASE_COACH = [
  { title: "Visibilité", text: "Ton profil mis en avant auprès de sportifs motivés." },
  { title: "Espace élèves", text: "Messagerie, planning et suivi — centralisés." },
  { title: "Lives & contenus", text: "Monétise tes séances et tes formats premium." },
  { title: "Communauté", text: "Anime ton audience et crée de l’engagement durable." },
  { title: "Tableau de bord", text: "Lis les progrès de tes élèves en un coup d’œil." },
  { title: "Outils pro", text: "Moins d’outils éparpillés, plus de temps pour coacher." },
  { title: "Certification", text: "Mise en avant réservée aux coachs certifiés — crédibilité immédiate." },
];

const SHOWCASE_INTERVAL_MS = 4200;

const ROLE_COPY = {
  sportif: {
    title: "Pour les sportifs",
    text: "Progresser, manger mieux, trouver un coach certifié et rester dans le rythme — sans jongler entre cinq applications.",
    bullets: ["Coachs diplômés uniquement", "Nutrition & entraînement réunis", "Motivation qui dure"],
  },
  coach: {
    title: "Pour les coachs",
    text: "Développer ta visibilité, structurer tes élèves et monétiser tes offres — sur une plateforme qui valorise les profils certifiés.",
    bullets: ["Visibilité qualifiée", "Tarifs adaptés au volume d’élèves", "Image pro renforcée"],
  },
};

/** Formules coach — carrousel (montants indicatifs) */
const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    accent: "blue",
    monthly: 15,
    studentCount: 5,
    features: [
      "Jusqu’à 5 élèves",
      "Suivi des séances",
      "Messagerie in-app",
      "Tableau de bord coach",
      "Rapport mensuel",
    ],
    featured: false,
    contactOnly: false,
  },
  {
    id: "pro",
    name: "Pro",
    accent: "gold",
    monthly: 39,
    studentCount: 20,
    features: [
      "Jusqu’à 20 élèves",
      "Tout Starter",
      "Plans d’entraînement",
      "Statistiques avancées",
      "Hard Challenges",
      "Support prioritaire",
    ],
    featured: true,
    recommended: true,
    contactOnly: false,
  },
  {
    id: "growth",
    name: "Growth",
    accent: "purple",
    monthly: 71,
    studentCount: 50,
    features: [
      "Jusqu’à 50 élèves",
      "Tout Pro",
      "Cours collectifs live",
      "FoodScan IA",
      "Annotation vidéo",
      "Onboarding dédié",
    ],
    featured: false,
    contactOnly: false,
  },
  {
    id: "scale",
    name: "Scale",
    accent: "green",
    monthly: 119,
    studentCount: 100,
    features: [
      "Jusqu’à 100 élèves",
      "Tout Growth",
      "Alter ego IA",
      "Rapports personnalisés",
      "Accès API",
      "Account manager",
    ],
    featured: false,
    contactOnly: false,
  },
  {
    id: "elite",
    name: "Elite",
    accent: "red",
    monthly: 199,
    studentCount: null,
    eliteSubline: "Élèves illimités — valeur sur mesure",
    features: [
      "Tout Scale",
      "Marque blanche",
      "Intégrations sur mesure",
      "SLA garanti",
      "Coach success manager dédié",
    ],
    featured: false,
    contactOnly: true,
  },
];

function pricingDisplayEuros(monthly, billing) {
  const v = billing === "annual" ? Math.round(monthly * 0.8) : monthly;
  return `${v}€`;
}

function pricingPerStudent(plan, billing) {
  if (!plan.studentCount) return null;
  const m = billing === "annual" ? plan.monthly * 0.8 : plan.monthly;
  const per = m / plan.studentCount;
  return per.toFixed(2).replace(".", ",");
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [role, setRole] = useState("sportif");
  const [goal, setGoal] = useState("Tout");
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [formRole, setFormRole] = useState("sportif");
  const [specialties, setSpecialties] = useState(() =>
    Object.fromEntries(COACH_SPECIALTIES.map((s) => [s, false]))
  );

  const [showcasePersona, setShowcasePersona] = useState("sportif");
  const [showcaseIdx, setShowcaseIdx] = useState(0);
  const [showcasePaused, setShowcasePaused] = useState(false);

  const [billingCycle, setBillingCycle] = useState("monthly");
  const [pricingCarouselIndex, setPricingCarouselIndex] = useState(0);
  const [pricingCarousel, setPricingCarousel] = useState({ step: 0, maxIdx: 0 });
  const pricingViewportRef = useRef(null);

  const showcaseSlides =
    showcasePersona === "sportif" ? SHOWCASE_SPORTIF : SHOWCASE_COACH;
  const showcaseActive = showcaseSlides[showcaseIdx] ?? showcaseSlides[0];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    setShowcaseIdx(0);
  }, [showcasePersona]);

  useEffect(() => {
    if (showcasePaused) return undefined;
    const id = window.setInterval(() => {
      setShowcaseIdx((i) => (i + 1) % showcaseSlides.length);
    }, SHOWCASE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [showcasePaused, showcaseSlides.length]);

  const showcaseGo = (dir) => {
    setShowcaseIdx((i) => {
      const len = showcaseSlides.length;
      if (dir === "next") return (i + 1) % len;
      return (i - 1 + len) % len;
    });
  };

  const showcaseJump = (index) => setShowcaseIdx(index);

  useEffect(() => {
    setGoal("Tout");
  }, [role]);

  useLayoutEffect(() => {
    const el = pricingViewportRef.current;
    if (!el) return undefined;
    const gap = 16;
    const measure = () => {
      const slide = el.querySelector(".lp-pricing-slide");
      if (!slide) return;
      const slideW = slide.offsetWidth;
      const vpW = el.clientWidth;
      if (slideW <= 0 || vpW <= 0) return;
      const perView = Math.max(1, Math.floor((vpW + gap) / (slideW + gap)));
      const maxIdx = Math.max(0, PRICING_PLANS.length - perView);
      setPricingCarousel({ step: slideW + gap, maxIdx });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setPricingCarouselIndex((i) => Math.min(i, pricingCarousel.maxIdx));
  }, [pricingCarousel.maxIdx]);

  const goals = role === "sportif" ? SPORTIF_GOALS : COACH_GOALS;
  const currentCopy = ROLE_COPY[role];

  const filteredFeatures = useMemo(() => {
    return FEATURES.filter((item) => {
      const sameRole = item.role === role;
      const matchesGoal = goal === "Tout" || item.goals.includes(goal);
      return sameRole && matchesGoal;
    });
  }, [role, goal]);

  const visibleFeatures = useMemo(() => {
    if (featuresOpen) return filteredFeatures;
    return filteredFeatures.slice(0, 5);
  }, [filteredFeatures, featuresOpen]);

  const logoSrc = theme === "dark" ? logoDark : logoLight;

  const pricingGo = (dir) => {
    setPricingCarouselIndex((i) => {
      const { maxIdx } = pricingCarousel;
      if (dir === "next") return Math.min(i + 1, maxIdx);
      return Math.max(i - 1, 0);
    });
  };

  const toggleSpecialty = (label) => {
    setSpecialties((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="lp">
      <header className="lp-header">
        <div className="lp-wrap lp-header__inner">
          <a href="#top" className="lp-brand">
            <img src={logoSrc} alt="UKAN" className="lp-brand__logo" width={48} height={48} />
            <div>
              <span className="lp-brand__name">UKAN</span>
              <span className="lp-brand__tag">Liste d’attente</span>
            </div>
          </a>
          <nav className="lp-nav" aria-label="Sections">
            <a href="#pourquoi">Pourquoi UKAN</a>
            <a href="#fonctionnalites">Fonctionnalités</a>
            <a href="#tarifs">Tarifs coach</a>
            <a href="#inscription">S’inscrire</a>
          </nav>
          <button
            type="button"
            className="lp-theme"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
          >
            <span className={theme === "dark" ? "is-on" : ""}>Sombre</span>
            <span className={theme === "light" ? "is-on" : ""}>Clair</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="lp-hero">
          <div className="lp-wrap">
            <p className="lp-eyebrow lp-eyebrow--gold">Lancement — rejoignez l’avant-première</p>
            <h1 className="lp-hero__title">
              La plateforme qui unit <span className="lp-txt-green">sport</span>,{" "}
              <span className="lp-txt-gold">nutrition</span> et{" "}
              <span className="lp-txt-green">coaching certifié</span>.
            </h1>
            <p className="lp-hero__lead">
              UKAN arrive pour ceux qui en ont assez des apps jetables : une expérience premium,
              pensée pour durer — et{" "}
              <strong>la seule en France à n’accepter que des coachs certifiés</strong>, pour que
              chaque accompagnement soit digne de confiance.
            </p>
            <p className="lp-hero__quote">
              « On ne vous vend pas un écran de plus. On vous ouvre l’accès à un écosystème où votre
              progression et votre métier comptent vraiment. »
            </p>
            <div className="lp-hero__cta">
              <a href="#inscription" className="lp-btn lp-btn--primary">
                Rejoindre la liste d’attente
              </a>
              <a href="#fonctionnalites" className="lp-btn lp-btn--ghost">
                Voir les fonctionnalités
              </a>
            </div>
          </div>
        </section>

        <section className="lp-band" id="pourquoi">
          <div className="lp-wrap">
            <h2 className="lp-h2">Pourquoi UKAN change la donne</h2>
            <p className="lp-sub lp-sub--wow">
              <strong>Une fonctionnalité à la fois, comme dans l’app.</strong> UKAN se déploie sous vos
              yeux : pas une liste figée — un aperçu vivant de ce qui vous attend au lancement.
            </p>

            <div className="lp-showcase">
              <div className="lp-showcase__persona" role="tablist" aria-label="Aperçu par profil">
                <button
                  type="button"
                  role="tab"
                  aria-selected={showcasePersona === "sportif"}
                  className={showcasePersona === "sportif" ? "is-active" : ""}
                  onClick={() => setShowcasePersona("sportif")}
                >
                  Côté sportif
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={showcasePersona === "coach"}
                  className={showcasePersona === "coach" ? "is-active" : ""}
                  onClick={() => setShowcasePersona("coach")}
                >
                  Côté coach
                </button>
              </div>

              <div
                className="lp-showcase__stage"
                onMouseEnter={() => setShowcasePaused(true)}
                onMouseLeave={() => setShowcasePaused(false)}
              >
                <div className="lp-showcase__glow" aria-hidden="true" />
                <article
                  className="lp-showcase__card"
                  key={`${showcasePersona}-${showcaseIdx}`}
                  aria-live="polite"
                >
                  <span className="lp-showcase__step">
                    {String(showcaseIdx + 1).padStart(2, "0")} /{" "}
                    {String(showcaseSlides.length).padStart(2, "0")}
                  </span>
                  <h3 className="lp-showcase__title">{showcaseActive.title}</h3>
                  <p className="lp-showcase__text">{showcaseActive.text}</p>
                  <div className="lp-showcase__progress" key={showcaseIdx} aria-hidden="true">
                    <div className="lp-showcase__progress-bar" />
                  </div>
                </article>

                <div className="lp-showcase__nav">
                  <button
                    type="button"
                    className="lp-showcase__arrow"
                    aria-label="Fonctionnalité précédente"
                    onClick={() => showcaseGo("prev")}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="lp-showcase__arrow"
                    aria-label="Fonctionnalité suivante"
                    onClick={() => showcaseGo("next")}
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="lp-showcase__dots" role="tablist" aria-label="Choisir une fonctionnalité">
                {showcaseSlides.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    role="tab"
                    aria-selected={i === showcaseIdx}
                    className={`lp-showcase__dot ${i === showcaseIdx ? "is-active" : ""}`}
                    onClick={() => showcaseJump(i)}
                    aria-label={`${s.title}, étape ${i + 1}`}
                  />
                ))}
              </div>
              <p className="lp-showcase__hint">
                {showcasePaused
                  ? "Pause : quittez la carte pour reprendre le défilement automatique."
                  : "Défilement automatique · pastilles et flèches pour naviguer."}
              </p>
            </div>
          </div>
        </section>

        <section className="lp-section" id="fonctionnalites">
          <div className="lp-wrap">
            <h2 className="lp-h2">Fonctionnalités qui s’adaptent à vous</h2>
            <p className="lp-sub">
              Choisissez votre profil et ce que vous cherchez : la liste se met à jour. Déployez pour
              voir l’ensemble des points correspondant à votre sélection.
            </p>

            <div className="lp-toggle" role="group" aria-label="Profil">
              <button
                type="button"
                className={role === "sportif" ? "is-active" : ""}
                onClick={() => setRole("sportif")}
              >
                Je suis sportif
              </button>
              <button
                type="button"
                className={role === "coach" ? "is-active" : ""}
                onClick={() => setRole("coach")}
              >
                Je suis coach
              </button>
            </div>

            <div className="lp-goals" role="group" aria-label="Objectif">
              {goals.map((g) => (
                <button
                  key={g}
                  type="button"
                  className={goal === g ? "is-active" : ""}
                  onClick={() => setGoal(g)}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="lp-focus">
              <h3 className="lp-focus__title">{currentCopy.title}</h3>
              <p className="lp-focus__text">{currentCopy.text}</p>
              <ul className="lp-focus__bullets">
                {currentCopy.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>

            <ul className="lp-features">
              {visibleFeatures.map((f) => (
                <li key={`${f.role}-${f.title}`}>
                  <strong>{f.title}</strong>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>

            {filteredFeatures.length > 5 && (
              <button
                type="button"
                className="lp-expand"
                onClick={() => setFeaturesOpen((v) => !v)}
                aria-expanded={featuresOpen}
              >
                {featuresOpen
                  ? "Replier la liste"
                  : `Afficher tout (${filteredFeatures.length} éléments)`}
              </button>
            )}
          </div>
        </section>

        <section className="lp-section lp-section--pricing" id="tarifs">
          <div className="lp-wrap">
            <div className="lp-pricing-header">
              <h2 className="lp-h2 lp-h2--pricing-split">
                <span className="lp-h2__line">Choisissez votre formule.</span>
                <span className="lp-h2__line lp-h2__line--gold">Développez votre activité.</span>
              </h2>
              <p className="lp-sub lp-sub--pricing">
                Plus votre structure grandit, plus le coût par élève diminue — des tarifs pensés pour
                les coachs.
              </p>
              <div
                className="lp-pricing-billing"
                role="group"
                aria-label="Période de facturation"
              >
                <button
                  type="button"
                  className={`lp-pricing-billing__btn ${billingCycle === "monthly" ? "lp-pricing-billing__btn--active" : ""}`}
                  onClick={() => setBillingCycle("monthly")}
                  aria-pressed={billingCycle === "monthly"}
                >
                  Mensuel
                </button>
                <button
                  type="button"
                  className={`lp-pricing-billing__btn ${billingCycle === "annual" ? "lp-pricing-billing__btn--active" : ""}`}
                  onClick={() => setBillingCycle("annual")}
                  aria-pressed={billingCycle === "annual"}
                >
                  Annuel –20%
                </button>
              </div>
              <p className="lp-pricing-note">
                Montants <strong>indicatifs</strong> ; confirmation et options finales aux inscrits
                avant l’ouverture publique.
              </p>
            </div>

            <div
              className="lp-pricing-carousel"
              role="region"
              aria-roledescription="carrousel"
              aria-label="Formules et tarifs coach UKAN"
            >
              <div className="lp-pricing-carousel__chrome">
                <button
                  type="button"
                  className="lp-pricing-carousel__arrow"
                  aria-label="Formules précédentes"
                  onClick={() => pricingGo("prev")}
                  disabled={pricingCarouselIndex <= 0}
                >
                  ‹
                </button>
                <div
                  className="lp-pricing-carousel__viewport"
                  ref={pricingViewportRef}
                >
                  <div
                    className="lp-pricing-carousel__track"
                    style={{
                      transform: `translate3d(-${pricingCarouselIndex * pricingCarousel.step}px, 0, 0)`,
                    }}
                  >
                    {PRICING_PLANS.map((plan) => {
                      const per = pricingPerStudent(plan, billingCycle);
                      const priceStr = pricingDisplayEuros(plan.monthly, billingCycle);
                      const ctaLabel = plan.contactOnly ? "Nous contacter" : "Choisir ce plan";
                      const ctaClass =
                        plan.featured && !plan.contactOnly
                          ? "lp-pricing-card__cta lp-pricing-card__cta--primary"
                          : "lp-pricing-card__cta lp-pricing-card__cta--outline";
                      return (
                        <article
                          key={plan.id}
                          className={`lp-pricing-slide lp-pricing-card lp-pricing-card--${plan.accent} ${plan.featured ? "lp-pricing-card--featured" : ""}`}
                        >
                          {plan.recommended && (
                            <span className="lp-pricing-card__badge">Recommandé</span>
                          )}
                          <h3 className="lp-pricing-card__name">{plan.name}</h3>
                          <p className="lp-pricing-card__price">
                            {priceStr}
                            <span className="lp-pricing-card__period">/mois</span>
                          </p>
                          {per && (
                            <p className="lp-pricing-card__per">≈ {per}€ / élève / mois</p>
                          )}
                          {plan.eliteSubline && (
                            <p className="lp-pricing-card__elite">{plan.eliteSubline}</p>
                          )}
                          <ul className="lp-pricing-card__features">
                            {plan.features.map((f) => (
                              <li key={f}>{f}</li>
                            ))}
                          </ul>
                          <a href="#inscription" className={ctaClass}>
                            {ctaLabel}
                          </a>
                        </article>
                      );
                    })}
                  </div>
                </div>
                <button
                  type="button"
                  className="lp-pricing-carousel__arrow"
                  aria-label="Formules suivantes"
                  onClick={() => pricingGo("next")}
                  disabled={pricingCarouselIndex >= pricingCarousel.maxIdx}
                >
                  ›
                </button>
              </div>
              <div className="lp-pricing-carousel__dots" role="group" aria-label="Pages du carrousel">
                {Array.from({ length: pricingCarousel.maxIdx + 1 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-current={i === pricingCarouselIndex ? "true" : undefined}
                    className={`lp-pricing-carousel__dot ${i === pricingCarouselIndex ? "lp-pricing-carousel__dot--active" : ""}`}
                    onClick={() => setPricingCarouselIndex(i)}
                    aria-label={`Afficher le groupe ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="lp-cta-block">
          <div className="lp-wrap">
            <h2 className="lp-h2 lp-h2--light">Prêt à faire partie de l’histoire UKAN ?</h2>
            <p className="lp-cta-block__text">
              Inscrivez-vous : vous serez informés en priorité du lancement, des tarifs définitifs et
              de la bêta. C’est gratuit, engagé, et sans promesses creuses.
            </p>
          </div>
        </section>

        <section className="lp-section lp-section--form" id="inscription">
          <div className="lp-wrap lp-wrap--narrow">
            <h2 className="lp-h2">Fiche d’inscription — liste d’attente</h2>
            <p className="lp-sub">
              Nom, prénom, rôle et, si vous êtes coach, vos spécialités : nous préparons une expérience
              sur mesure pour le jour J.
            </p>

            <form
              className="lp-form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="lp-form__grid">
                <label className="lp-label">
                  Prénom *
                  <input type="text" name="prenom" required placeholder="Camille" autoComplete="given-name" />
                </label>
                <label className="lp-label">
                  Nom *
                  <input type="text" name="nom" required placeholder="Martin" autoComplete="family-name" />
                </label>
              </div>

              <fieldset className="lp-fieldset">
                <legend>Vous êtes *</legend>
                <label className="lp-radio">
                  <input
                    type="radio"
                    name="role"
                    value="sportif"
                    checked={formRole === "sportif"}
                    onChange={() => setFormRole("sportif")}
                  />
                  Sportif
                </label>
                <label className="lp-radio">
                  <input
                    type="radio"
                    name="role"
                    value="coach"
                    checked={formRole === "coach"}
                    onChange={() => setFormRole("coach")}
                  />
                  Coach certifié
                </label>
              </fieldset>

              <label className="lp-label">
                Email *
                <input type="email" name="email" required placeholder="vous@email.com" autoComplete="email" />
              </label>

              {formRole === "coach" && (
                <fieldset className="lp-fieldset lp-fieldset--checks">
                  <legend>Vos spécialités (cochez tout ce qui vous correspond)</legend>
                  <div className="lp-checks">
                    {COACH_SPECIALTIES.map((s) => (
                      <label key={s} className="lp-check">
                        <input
                          type="checkbox"
                          checked={specialties[s]}
                          onChange={() => toggleSpecialty(s)}
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              <button type="submit" className="lp-btn lp-btn--primary lp-btn--block">
                Valider mon inscription
              </button>
              <p className="lp-form__foot">
                En vous inscrivant, vous acceptez d’être contacté·e pour le lancement UKAN. Pas de
                spam — désinscription possible à tout moment.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="lp-wrap lp-footer__inner">
          <span>© {new Date().getFullYear()} UKAN — Sport, nutrition & coaching certifié.</span>
        </div>
      </footer>
    </div>
  );
}
