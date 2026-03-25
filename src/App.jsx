import React, { useEffect, useMemo, useState } from "react";
import logoDark from "./assets/logo.png";
import logoLight from "./assets/logo2.png";
import badgeAppStore from "./assets/badge-app-store.svg?url";
import badgeGooglePlay from "./assets/badge-google-play.svg?url";
import "./styles.css";

/** À la publication : remplacez par vos fiches App Store et Play Store. */
const APP_STORE_URL = "#inscription";
const GOOGLE_PLAY_URL = "#inscription";

function storeLinkProps(url) {
  return url.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

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
  { title: "Défis & objectifs", text: "Défis collectifs, rappels et fil d’énergie pour ne pas lâcher." },
  { title: "Avant / après", text: "Visualise ton évolution et célèbre chaque étape." },
  { title: "Matching coach", text: "Trouve l’accompagnement qui colle à ton niveau et ton style." },
];

const SHOWCASE_COACH = [
  { title: "Visibilité", text: "Ton profil mis en avant auprès de sportifs motivés." },
  { title: "Espace élèves", text: "Messagerie, planning et suivi — centralisés." },
  { title: "Lives & contenus", text: "Monétise tes séances et tes formats premium." },
  { title: "Communauté", text: "Anime ton audience et crée de l’engagement durable." },
  { title: "Tableau de bord", text: "Lis les progrès de tes élèves en un coup d’œil." },
  { title: "Outils pro", text: "Moins d’outils éparpillés, plus de temps pour coacher." },
  { title: "Coachs certifiés", text: "Profils vérifiés — la promesse UKAN : des coachs diplômés, pas du bricolage." },
  { title: "Certification", text: "Mise en avant réservée aux coachs certifiés — crédibilité immédiate." },
];

const SHOWCASE_NUTRITION = [
  { title: "Hub nutrition", text: "Une page principale claire : résumé + actions rapides." },
  { title: "Résumé du jour", text: "Calories + macros en cercles, lisible en 2 secondes." },
  { title: "Journal repas", text: "Jusqu’à 4 moments/jour pour suivre sans friction." },
  { title: "Base aliments FR", text: "2M+ aliments français pour saisir vite et juste." },
  { title: "Macros automatiques", text: "Calcul auto des macros pour éviter les erreurs." },
  { title: "Streak nutrition", text: "Une flamme animée pour tenir la régularité." },
  { title: "Conseil du jour", text: "Micro‑conseils simples pour progresser durablement." },
  { title: "Calculatrice nutrition", text: "LCD + unités : des repères concrets au quotidien." },
  { title: "Bibliothèque icônes aliments", text: "Repères visuels rapides pour mieux choisir et varier." },
  { title: "Planning semaine", text: "Vue 7 jours pour anticiper et rester constant." },
  { title: "Drag & drop repas", text: "Déplace tes repas d’un jour à l’autre en 1 geste." },
  { title: "Calories par jour", text: "Total automatique pour chaque journée de la semaine." },
  { title: "Liste de courses", text: "Génération automatique à partir de ton planning." },
  { title: "Validation semaine (coach)", text: "Validation des courses auto et ajustements côté coach." },
  { title: "Diète hebdomadaire coach", text: "Interface dédiée pour piloter la semaine nutrition des élèves." },
];

const SHOWCASE_SOCIAL = [
  { title: "Feed publications", text: "Tes abonnements : posts et actus au même endroit." },
  { title: "Explorer", text: "Découvrir de nouveaux profils et contenus pertinents." },
  { title: "Stories horizontales", text: "Un format rapide pour suivre et partager." },
  { title: "Créer une publication", text: "Publie en quelques secondes : texte, média, tags." },
  { title: "Interactions", text: "Like, commenter, partager, sauvegarder : simple et fluide." },
  { title: "Types de publications", text: "Séance, recette, avant/après, motivation : un feed complet." },
  { title: "Mes suivis", text: "Followers / following : garder le lien avec ta communauté." },
];

const SHOWCASE_RECETTES = [
  { title: "Recettes communauté", text: "Explorer des recettes utiles, fiables et inspirantes." },
  { title: "Mes recettes", text: "Créer et gérer tes recettes personnelles." },
  { title: "Livre de recettes", text: "Sauvegardes et favoris réunis au même endroit." },
  { title: "Recette personnalisée", text: "Créer une recette sur mesure selon tes besoins." },
  { title: "Partager au feed", text: "Publier une recette directement dans la communauté." },
];

const SHOWCASE_SEANCES = [
  { title: "Bibliothèque exercices", text: "9 groupes musculaires, structure claire et rapide." },
  { title: "Carte exercice", text: "Image, muscle, équipement, difficulté : tout est lisible." },
  { title: "Détail exercice", text: "Vidéo/GIF, instructions et variantes pour bien exécuter." },
  { title: "Recherche & filtres", text: "Trouver le bon exercice selon ton matériel." },
  { title: "Favoris", text: "Garder tes exercices préférés sous la main." },
  { title: "Séance en cours", text: "Timer global + exercice actuel : focus total." },
  { title: "Séries & répétitions", text: "Compteur simple pour suivre sans te disperser." },
  { title: "Repos automatique", text: "Timer de repos intégré pour rester dans le rythme." },
  { title: "Séance personnalisée", text: "Créer ton programme, à ta façon." },
  { title: "Calendrier séances", text: "Vue mois pour planifier et rester régulier." },
  { title: "Progression", text: "Historique par exercice pour voir les gains réels." },
  { title: "Stats volume", text: "Volume par groupe musculaire pour piloter l’équilibre." },
];

const SHOWCASE_SYSTEME = [
  { title: "Inscription / connexion", text: "Email, Google, Apple : entrée rapide et sécurisée." },
];

const SHOWCASE_INTERVAL_MS = 4200;

/** Onglets « univers » — rangée ticker (id = valeur de showcasePersona) */
const SHOWCASE_PERSONA_TABS = [
  { id: "sportif", label: "Côté sportif" },
  { id: "coach", label: "Côté coach" },
  { id: "nutrition", label: "Côté nutrition" },
  { id: "social", label: "Côté social" },
  { id: "recettes", label: "Côté recettes" },
  { id: "seances", label: "Côté séances" },
  { id: "systeme", label: "Côté système" },
];

const PRICING_STUDENT_MAX = 120;

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

function pricingPerStudent(plan, billing, studentsFollowed) {
  if (!plan.studentCount || !studentsFollowed) return null;
  const m = billing === "annual" ? plan.monthly * 0.8 : plan.monthly;
  const per = m / studentsFollowed;
  return per.toFixed(2).replace(".", ",");
}

/** Palier actif selon le nombre d’élèves suivis (bornes alignées sur PRICING_PLANS) */
function getPlanForStudentCount(n) {
  if (n <= 5) return PRICING_PLANS[0];
  if (n <= 20) return PRICING_PLANS[1];
  if (n <= 50) return PRICING_PLANS[2];
  if (n <= 100) return PRICING_PLANS[3];
  return PRICING_PLANS[4];
}

/** Largeurs relatives des segments sur la barre (1–120 élèves) */
const PRICING_BAR_SEGMENTS = [
  { id: "starter", flex: 5 },
  { id: "pro", flex: 15 },
  { id: "growth", flex: 30 },
  { id: "scale", flex: 50 },
  { id: "elite", flex: 20 },
];

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [role, setRole] = useState("sportif");
  const [goal, setGoal] = useState("Tout");
  const [formRole, setFormRole] = useState("sportif");
  const [specialties, setSpecialties] = useState(() =>
    Object.fromEntries(COACH_SPECIALTIES.map((s) => [s, false]))
  );

  const [showcasePersona, setShowcasePersona] = useState("sportif");
  const [showcaseIdx, setShowcaseIdx] = useState(0);
  const [showcasePaused, setShowcasePaused] = useState(false);
  const [showcaseTickerPaused, setShowcaseTickerPaused] = useState(false);

  const [billingCycle, setBillingCycle] = useState("monthly");
  const [studentCount, setStudentCount] = useState(12);

  const showcaseSlides = useMemo(() => {
    switch (showcasePersona) {
      case "sportif":
        return SHOWCASE_SPORTIF;
      case "coach":
        return SHOWCASE_COACH;
      case "nutrition":
        return SHOWCASE_NUTRITION;
      case "social":
        return SHOWCASE_SOCIAL;
      case "recettes":
        return SHOWCASE_RECETTES;
      case "seances":
        return SHOWCASE_SEANCES;
      case "systeme":
        return SHOWCASE_SYSTEME;
      default:
        return SHOWCASE_SPORTIF;
    }
  }, [showcasePersona]);
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

  const activePricingPlan = useMemo(
    () => getPlanForStudentCount(studentCount),
    [studentCount]
  );

  const pricingPerDisplay = pricingPerStudent(
    activePricingPlan,
    billingCycle,
    studentCount
  );

  const goals = role === "sportif" ? SPORTIF_GOALS : COACH_GOALS;
  const currentCopy = ROLE_COPY[role];

  const filteredFeatures = useMemo(() => {
    return FEATURES.filter((item) => {
      const sameRole = item.role === role;
      const matchesGoal = goal === "Tout" || item.goals.includes(goal);
      return sameRole && matchesGoal;
    });
  }, [role, goal]);

  const logoSrc = theme === "dark" ? logoDark : logoLight;

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
              Reprends le contrôle de ton corps, tu n’es plus seul.
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
              <div
                className="lp-showcase__persona-ticker"
                onMouseEnter={() => setShowcaseTickerPaused(true)}
                onMouseLeave={() => setShowcaseTickerPaused(false)}
              >
                <div
                  className={`lp-showcase__persona-track${showcaseTickerPaused ? " is-paused" : ""}`}
                >
                  <div className="lp-showcase__persona" role="tablist" aria-label="Aperçu par univers">
                    {SHOWCASE_PERSONA_TABS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        role="tab"
                        aria-selected={showcasePersona === p.id}
                        className={showcasePersona === p.id ? "is-active" : ""}
                        onClick={() => setShowcasePersona(p.id)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  <div className="lp-showcase__persona lp-showcase__persona--clone" role="presentation">
                    {SHOWCASE_PERSONA_TABS.map((p) => (
                      <button
                        key={`clone-${p.id}`}
                        type="button"
                        tabIndex={-1}
                        className={showcasePersona === p.id ? "is-active" : ""}
                        onClick={() => setShowcasePersona(p.id)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
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
                    key={`${showcasePersona}-${i}`}
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

        <section className="lp-section lp-section--features" id="fonctionnalites">
          <div className="lp-wrap">
            <header className="lp-features-hero">
              <p className="lp-features-hero__eyebrow">Personnalisation live</p>
              <h2 className="lp-h2 lp-features-hero__title">Fonctionnalités qui s’adaptent à vous</h2>
              <p className="lp-sub lp-sub--features-intro">
                Un clic sur votre profil et votre objectif : la grille se recompose — même contenu,
                présentation premium.
              </p>
            </header>

            <div className="lp-features-toolbar-glass">
              <div className="lp-toggle lp-toggle--glass" role="group" aria-label="Profil">
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
              <div className="lp-goals lp-goals--glass" role="group" aria-label="Objectif">
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
            </div>

            <div className="lp-focus lp-focus--wow">
              <div className="lp-focus--wow__shine" aria-hidden="true" />
              <h3 className="lp-focus__title">{currentCopy.title}</h3>
              <p className="lp-focus__text">{currentCopy.text}</p>
              <ul className="lp-focus__bullets">
                {currentCopy.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="lp-ft-bento-wrap">
              <p className="lp-ft-bento__label" id="features-list-label">
                Ce qui vous attend dans l’app
                {filteredFeatures.length > 0 ? (
                  <span className="lp-ft-bento__count">
                    {" "}
                    · {filteredFeatures.length} point
                    {filteredFeatures.length > 1 ? "s" : ""}
                  </span>
                ) : null}
              </p>
              {filteredFeatures.length === 0 ? (
                <p className="lp-features-empty" role="status">
                  Aucun point pour cette combinaison — choisissez « Tout » ou un autre objectif.
                </p>
              ) : (
                <ul
                  key={`${role}-${goal}`}
                  className="lp-ft-bento"
                  aria-labelledby="features-list-label"
                >
                  {filteredFeatures.map((f, i) => (
                    <li
                      key={`${f.role}-${f.title}`}
                      className="lp-ft-card"
                      style={{ "--ft-i": i }}
                    >
                      <span className="lp-ft-card__accent" aria-hidden="true" />
                      <h4 className="lp-ft-card__title">{f.title}</h4>
                      <p className="lp-ft-card__text">{f.text}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <section className="lp-section lp-section--pricing" id="tarifs">
          <div className="lp-wrap">
            <div className="lp-pricing-header">
              <h2 className="lp-h2 lp-h2--pricing-main">
                Un abonnement qui évolue avec votre succès.
              </h2>
              <p className="lp-pricing-tagline">Pas de forfait figé. Juste ce qu’il vous faut.</p>
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

            <div className="lp-pricing-bar" aria-labelledby="pricing-bar-label">
              <p className="lp-pricing-bar__label" id="pricing-bar-label">
                Nombre d’élèves suivis
              </p>
              <div className="lp-pricing-bar__value-row">
                <output className="lp-pricing-bar__value" htmlFor="pricing-students-range">
                  {studentCount}
                  {studentCount >= PRICING_STUDENT_MAX ? "+" : ""}
                </output>
                <span className="lp-pricing-bar__hint">élève{studentCount > 1 ? "s" : ""}</span>
              </div>

              <input
                id="pricing-students-range"
                className="lp-pricing-range"
                type="range"
                min={1}
                max={PRICING_STUDENT_MAX}
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                aria-valuemin={1}
                aria-valuemax={PRICING_STUDENT_MAX}
                aria-valuenow={studentCount}
                aria-valuetext={`${studentCount} élèves — formule ${activePricingPlan.name}`}
              />

              <div className="lp-pricing-bar__segments" aria-hidden="true">
                {PRICING_BAR_SEGMENTS.map((seg) => (
                  <div
                    key={seg.id}
                    className={`lp-pricing-bar__segment ${activePricingPlan.id === seg.id ? "is-active" : ""}`}
                    style={{ flex: seg.flex }}
                  >
                    <span className="lp-pricing-bar__segment-name">
                      {PRICING_PLANS.find((p) => p.id === seg.id)?.name ?? seg.id}
                    </span>
                  </div>
                ))}
              </div>

              <article
                className={`lp-pricing-dynamic lp-pricing-card lp-pricing-card--${activePricingPlan.accent} ${activePricingPlan.featured ? "lp-pricing-card--featured" : ""}`}
              >
                {activePricingPlan.recommended && (
                  <span className="lp-pricing-card__badge">Recommandé</span>
                )}
                <h3 className="lp-pricing-card__name">{activePricingPlan.name}</h3>
                <p className="lp-pricing-card__price">
                  {pricingDisplayEuros(activePricingPlan.monthly, billingCycle)}
                  <span className="lp-pricing-card__period">/mois</span>
                </p>
                {pricingPerDisplay && (
                  <p className="lp-pricing-card__per">
                    ≈ {pricingPerDisplay}€ / élève / mois (à {studentCount} élève
                    {studentCount > 1 ? "s" : ""})
                  </p>
                )}
                {activePricingPlan.eliteSubline && (
                  <p className="lp-pricing-card__elite">{activePricingPlan.eliteSubline}</p>
                )}
                <ul className="lp-pricing-card__features">
                  {activePricingPlan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a
                  href="#inscription"
                  className={
                    activePricingPlan.featured && !activePricingPlan.contactOnly
                      ? "lp-pricing-card__cta lp-pricing-card__cta--primary"
                      : "lp-pricing-card__cta lp-pricing-card__cta--outline"
                  }
                >
                  {activePricingPlan.contactOnly ? "Nous contacter" : "Choisir ce plan"}
                </a>
              </article>
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
          <div className="lp-footer__stores">
            <p className="lp-footer__stores-label">
              Bientôt disponible sur{" "}
              <span className="lp-footer__stores-platforms">iOS et Android</span>
            </p>
            <div className="lp-footer__stores-badges">
              <a
                href={APP_STORE_URL}
                className="lp-store-badge lp-store-badge--footer"
                {...storeLinkProps(APP_STORE_URL)}
                aria-label="App Store — UKAN"
              >
                <img src={badgeAppStore} alt="" width={120} height={40} decoding="async" />
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                className="lp-store-badge lp-store-badge--footer"
                {...storeLinkProps(GOOGLE_PLAY_URL)}
                aria-label="Google Play — UKAN"
              >
                <img src={badgeGooglePlay} alt="" width={155} height={60} decoding="async" />
              </a>
            </div>
          </div>
          <span className="lp-footer__copy">
            © {new Date().getFullYear()} UKAN — Sport, nutrition & coaching certifié.
          </span>
        </div>
      </footer>
    </div>
  );
}
