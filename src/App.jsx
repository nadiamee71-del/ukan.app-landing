import React, { useEffect, useMemo, useState } from "react";
import { FeatureIcon } from "./FeatureIcon.jsx";
import { SocialLinks } from "./SocialLinks.jsx";
import { NutritionCalculator } from "./NutritionCalculator.jsx";
import logoLight from "./assets/logo2.png";
import badgeAppStore from "./assets/badge-app-store.svg?url";
import badgeGooglePlay from "./assets/badge-google-play.svg?url";
import demoVideo from "../assets/ukan-kang2.mp4";
import "./styles.css";

/** À la publication : remplacez par vos fiches App Store et Play Store. */
const APP_STORE_URL = "#inscription";
const GOOGLE_PLAY_URL = "#inscription";

/** Réseaux & contact — à mettre à jour avec les URLs officielles UKAN */
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/ukan.app/",
  linkedin: "https://www.linkedin.com/company/ukan",
  tiktok: "https://www.tiktok.com/@ukan.app",
  /** Contact direct (icône enveloppe) — distinct du profil Instagram */
  email: "mailto:hello@ukan.app",
};

function storeLinkProps(url) {
  return url.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

const FEATURE_CATEGORIES = ["Tout", "Progresser", "Motivation", "Nutrition", "Social"];

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

const SPORTIF_OBJECTIFS = [
  "Perte de poids",
  "Prise de masse",
  "Remise en forme",
  "Performance sportive",
  "Bien-être général",
];

const SPORTIF_NIVEAUX = ["Débutant", "Intermédiaire", "Avancé"];

const FEATURES = [
  {
    role: "sportif",
    goals: ["Tout", "Motivation"],
    iconKey: "defis",
    title: "Défis",
    text: "Motivation quotidienne",
  },
  {
    role: "sportif",
    goals: ["Tout", "Nutrition"],
    iconKey: "nutrition",
    title: "Nutrition",
    text: "Suivi simple",
  },
  {
    role: "sportif",
    goals: ["Tout", "Progresser"],
    iconKey: "seances",
    title: "Séances",
    text: "Programmes guidés",
  },
  {
    role: "sportif",
    goals: ["Tout", "Social"],
    iconKey: "communaute",
    title: "Communauté",
    text: "Réseau sportif",
  },
  {
    role: "sportif",
    goals: ["Tout", "Progresser"],
    iconKey: "suivi",
    title: "Suivi",
    text: "Stats et progrès",
  },
  {
    role: "sportif",
    goals: ["Tout", "Motivation"],
    iconKey: "avantApres",
    title: "Avant / après",
    text: "Évolution visuelle",
  },
  {
    role: "coach",
    goals: ["Tout", "Social"],
    iconKey: "visibilite",
    title: "Visibilité",
    text: "Attire des sportifs qualifiés",
  },
  {
    role: "coach",
    goals: ["Tout", "Progresser"],
    iconKey: "suiviEleves",
    title: "Suivi élèves",
    text: "Programmes et progrès centralisés",
  },
  {
    role: "coach",
    goals: ["Tout", "Nutrition"],
    iconKey: "nutritionCoach",
    title: "Nutrition",
    text: "Plans alimentaires simples",
  },
  {
    role: "coach",
    goals: ["Tout", "Social"],
    iconKey: "communauteCoach",
    title: "Communauté",
    text: "Anime ton audience",
  },
  {
    role: "coach",
    goals: ["Tout", "Motivation"],
    iconKey: "challenges",
    title: "Challenges",
    text: "Garde tes élèves engagés",
  },
  {
    role: "coach",
    goals: ["Tout", "Progresser"],
    iconKey: "dashboard",
    title: "Tableau de bord",
    text: "Pilotage en un coup d'oeil",
  },
];

const SHOWCASE_SPORTIF = [
  { title: "Séances guidées", text: "Entraînements structurés, vidéos et progressions claires." },
  { title: "Défis & objectifs", text: "Défis collectifs, rappels et fil d’énergie pour ne pas lâcher." },
  { title: "Avant / après", text: "Visualise ton évolution et célèbre chaque étape." },
  { title: "Progression continue", text: "Des repères clairs pour rester régulier semaine après semaine." },
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

const HERO_COPY = {
  sportif: {
    title: (
      <>
        Reprends le <span className="lp-hero__accent">contrôle</span>.
        <br />
        Transforme ton corps.
      </>
    ),
    lead: <>Une app premium pour t’entraîner, manger mieux et tenir le rythme.</>,
  },
  coach: {
    title: (
      <>
        Scale ton <span className="lp-hero__accent">coaching</span>.
        <br />
        Plus d’élèves, moins d’outils.
      </>
    ),
    lead: <>Gagne du temps, structure ton suivi et monétise mieux.</>,
  },
};

/** Formules coach — carrousel (montants indicatifs) */
const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
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

const PRICING_SPORTIF_PLANS = [
  {
    id: "non-coaches",
    name: "NON COACHES",
    monthlyLabel: "4,99€",
    features: ["Accès de base UKAN", "Suivi personnel essentiel"],
  },
  {
    id: "basic",
    name: "BASIC",
    monthlyLabel: "14,99€",
    features: ["Fonctionnalités de progression", "Suivi nutrition simplifié"],
  },
  {
    id: "premium",
    name: "PREMIUM",
    monthlyLabel: "37€",
    features: ["Expérience avancée", "Outils premium inclus"],
  },
  {
    id: "illimite",
    name: "ILLIMITÉ",
    monthlyLabel: "70€",
    features: ["Accès illimité", "Toutes les fonctionnalités sportives"],
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

/** Affichage palier coach : chiffres d’élèves, +100 pour l’offre entreprise */
function coachStudentTierLabel(plan) {
  if (!plan) return "";
  return plan.studentCount != null ? String(plan.studentCount) : "+100";
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
  const [role, setRole] = useState("sportif");
  const [goal, setGoal] = useState("Tout");
  const [formRole, setFormRole] = useState("sportif");
  const [city, setCity] = useState("");
  const [detectedCountry, setDetectedCountry] = useState("");
  const [specialties, setSpecialties] = useState(() =>
    Object.fromEntries(COACH_SPECIALTIES.map((s) => [s, false]))
  );

  const [showcasePersona, setShowcasePersona] = useState("sportif");
  const [showcaseIdx, setShowcaseIdx] = useState(0);
  const [showcasePaused, setShowcasePaused] = useState(false);

  const [billingCycle, setBillingCycle] = useState("monthly");
  const [coachPlanIdx, setCoachPlanIdx] = useState(1);
  const [sportifPlanIdx, setSportifPlanIdx] = useState(0);

  const showcaseSlides = useMemo(() => {
    if (role === "sportif") {
      return SHOWCASE_SPORTIF;
    }
    if (role === "coach") {
      return SHOWCASE_COACH;
    }

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
  }, [role, showcasePersona]);
  const showcaseActive = showcaseSlides[showcaseIdx] ?? showcaseSlides[0];

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

  useEffect(() => {
    // Le switch Sportif/Coach pilote l'ensemble de la landing sans rechargement.
    setShowcasePersona(role);
    setFormRole(role);
  }, [role]);

  const activePricingPlan = PRICING_PLANS[coachPlanIdx] ?? PRICING_PLANS[0];
  const activeCoachStudentThreshold = activePricingPlan.studentCount;
  const activeSportifPlan = PRICING_SPORTIF_PLANS[sportifPlanIdx] ?? PRICING_SPORTIF_PLANS[0];

  const pricingPerDisplay = pricingPerStudent(
    activePricingPlan,
    billingCycle,
    activeCoachStudentThreshold
  );

  const goals = FEATURE_CATEGORIES;
  const heroCopy = HERO_COPY[role];

  const filteredFeatures = useMemo(() => {
    return FEATURES.filter((item) => {
      const sameRole = item.role === role;
      const matchesGoal = goal === "Tout" || item.goals.includes(goal);
      return sameRole && matchesGoal;
    });
  }, [role, goal]);

  const logoSrc = logoLight;

  const toggleSpecialty = (label) => {
    setSpecialties((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const detectCountryFromCity = async (cityValue) => {
    const cleanCity = cityValue.trim();
    if (!cleanCity) {
      setDetectedCountry("");
      return "";
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cleanCity)}&format=json&addressdetails=1&limit=1`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) return "";
      const data = await res.json();
      const country = data?.[0]?.address?.country ?? "";
      setDetectedCountry(country);
      return country;
    } catch {
      return "";
    }
  };

  return (
    <div className="lp">
      <header className="lp-header">
        <div className="lp-wrap lp-header__inner">
          <a href="#top" className="lp-brand">
            <img src={logoSrc} alt="UKAN" className="lp-brand__logo" width={64} height={64} />
            <div>
              <span className="lp-brand__name">UKAN</span>
              <span className="lp-brand__tag">Liste d’attente</span>
            </div>
          </a>
          <nav className="lp-nav" aria-label="Sections">
            <a href="#pourquoi">Pourquoi UKAN</a>
            <a href="#fonctionnalites">Fonctionnalités</a>
            {role === "coach" && <a href="#tarifs">Tarifs coach</a>}
            <a href="#inscription">S’inscrire</a>
          </nav>
          <div className="lp-theme" role="group" aria-label="Profil">
            <button
              type="button"
              className={role === "sportif" ? "is-on" : ""}
              onClick={() => setRole("sportif")}
            >
              Sportif
            </button>
            <button
              type="button"
              className={role === "coach" ? "is-on" : ""}
              onClick={() => setRole("coach")}
            >
              Coach
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="lp-hero">
          <div className="lp-wrap">
            <p className="lp-eyebrow lp-eyebrow--hero">Lancement — rejoignez l’avant-première</p>
            <h1 className="lp-hero__title">{heroCopy.title}</h1>
            <p className="lp-hero__lead">{heroCopy.lead}</p>
            <div className="lp-hero__cta">
              <a href="#inscription" className="lp-btn lp-btn--primary">
                Rejoindre la liste d’attente
              </a>
              <a href="#fonctionnalites" className="lp-btn lp-btn--ghost">
                Voir les fonctionnalités
              </a>
            </div>
            <div className="lp-hero__device-wrap" aria-label="Démonstration vidéo UKAN">
              <div className="lp-hero__device-glow" aria-hidden="true" />
              <div className="lp-hero__device">
                <div className="lp-hero__device-screen">
                  <video autoPlay muted loop playsInline preload="metadata">
                    <source src={demoVideo} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-band" id="pourquoi">
          <div className="lp-wrap">
            <h2 className="lp-h2">
              Pourquoi UKAN change la <span className="lp-txt-green">donne</span>
            </h2>
            <p className="lp-sub lp-sub--wow">
              <strong>Une app claire.</strong>
              <br />
              Une expérience simple, fluide et efficace.
            </p>

            <div className="lp-showcase">
              <div className="lp-showcase__persona-row">
                <div className="lp-showcase__persona" role="tablist" aria-label="Aperçu par univers">
                  {SHOWCASE_PERSONA_TABS.filter((p) => p.id === role).map((p) => (
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
              <h2 className="lp-h2 lp-features-hero__title">
                Fonctionnalités qui <span className="lp-hero__accent">s’adaptent</span> à vous
              </h2>
              <p className="lp-sub lp-sub--features-intro">
                Votre profil change. Les fonctionnalités s’adaptent.
              </p>
            </header>

            <div className="lp-goals lp-goals--glass" role="group" aria-label="Catégories fonctionnalités">
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

            <div className="lp-ft-bento-wrap">
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
                      <div className="lp-ft-card__head">
                        <span className="lp-ft-card__icon" aria-hidden="true">
                          <FeatureIcon name={f.iconKey} tone="gold" />
                        </span>
                        <h4 className="lp-ft-card__title">{f.title}</h4>
                      </div>
                      <p className="lp-ft-card__text">{f.text}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <section
          className="lp-section lp-section--nutri-calc"
          id="calculatrice-nutrition"
          aria-labelledby="nutri-calc-title"
        >
          <div className="lp-wrap">
            <h2 className="lp-h2 lp-nutri-calc__title" id="nutri-calc-title">
              Reprends le <span className="lp-hero__accent">contrôle</span> jusqu’à dans ton assiette
            </h2>
            <NutritionCalculator />
          </div>
        </section>

        <section className="lp-section lp-section--pricing lp-section--pricing-premium" id="tarifs">
          <div className="lp-wrap">
            <div className="lp-pricing-header">
              <h2 className="lp-h2 lp-h2--pricing-main">
                {role === "sportif" ? (
                  <>
                    Abonnement qui évolue avec votre <span className="lp-txt-gold">progrès</span>
                  </>
                ) : (
                  <>
                    Un abonnement qui évolue avec votre <span className="lp-txt-gold">succès</span>.
                  </>
                )}
              </h2>
              {role === "coach" ? (
                <>
                  <p className="lp-pricing-tagline">Des paliers simples, un prix clair.</p>
                  <div
                    className="lp-pricing-billing lp-pricing-billing--premium"
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
                  <p className="lp-pricing-note">Prix indicatifs avant lancement.</p>
                </>
              ) : null}
            </div>

            <div className="lp-pricing-bar" aria-labelledby="pricing-bar-label">
              {role === "coach" ? (
                <>
                  <p className="lp-pricing-bar__label lp-pricing-bar__label--premium" id="pricing-bar-label">
                    Élèves couverts par votre forfait
                  </p>
                  <div className="lp-pricing-bar__value-row lp-pricing-bar__value-row--premium-coach">
                    <output
                      className="lp-pricing-bar__value lp-pricing-bar__value--premium-coach"
                      htmlFor="pricing-students-range"
                    >
                      {coachStudentTierLabel(activePricingPlan)}
                    </output>
                    <span className="lp-pricing-bar__hint lp-pricing-bar__hint--premium">
                      {activeCoachStudentThreshold != null
                        ? "élèves maximum"
                        : "Offre entreprise — sur devis"}
                    </span>
                  </div>

                  <div className="lp-pricing-pills" role="tablist" aria-label="Nombre d’élèves par forfait">
                    {PRICING_PLANS.map((plan, i) => (
                      <button
                        key={plan.id}
                        type="button"
                        role="tab"
                        id={`coach-tier-tab-${i}`}
                        aria-selected={coachPlanIdx === i}
                        aria-controls="coach-pricing-panel"
                        className={`lp-pricing-pill ${coachPlanIdx === i ? "is-active" : ""}`}
                        onClick={() => setCoachPlanIdx(i)}
                        aria-label={
                          plan.studentCount != null
                            ? `Jusqu’à ${plan.studentCount} élèves`
                            : "Plus de 100 élèves — offre entreprise"
                        }
                      >
                        {coachStudentTierLabel(plan)}
                      </button>
                    ))}
                  </div>

                  <div className="lp-pricing-premium-track lp-pricing-premium-track--coach">
                    <input
                      id="pricing-students-range"
                      className="lp-pricing-range lp-pricing-range--premium"
                      type="range"
                      min={0}
                      max={PRICING_PLANS.length - 1}
                      step={1}
                      value={coachPlanIdx}
                      onChange={(e) => setCoachPlanIdx(Number(e.target.value))}
                      aria-valuemin={0}
                      aria-valuemax={PRICING_PLANS.length - 1}
                      aria-valuenow={coachPlanIdx}
                      aria-valuetext={`${coachStudentTierLabel(activePricingPlan)} élèves — ${activePricingPlan.name}`}
                      aria-labelledby="pricing-bar-label"
                    />
                  </div>

                  <div className="lp-pricing-bar__segments lp-pricing-bar__segments--premium" aria-hidden="true">
                    {PRICING_BAR_SEGMENTS.map((seg) => (
                      <div
                        key={seg.id}
                        className={`lp-pricing-bar__segment ${activePricingPlan.id === seg.id ? "is-active" : ""}`}
                        style={{ flex: seg.flex }}
                      >
                        <span className="lp-pricing-bar__segment-name">
                          {coachStudentTierLabel(PRICING_PLANS.find((p) => p.id === seg.id))}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="lp-pricing-premium-card-shell">
                    <article
                      key={coachPlanIdx}
                      id="coach-pricing-panel"
                      role="tabpanel"
                      aria-labelledby={`coach-tier-tab-${coachPlanIdx}`}
                      className="lp-pricing-dynamic lp-pricing-card lp-pricing-card--premium"
                    >
                      {activePricingPlan.recommended && (
                        <span className="lp-pricing-card__badge">Recommandé</span>
                      )}
                      <h3 className="lp-pricing-card__name lp-pricing-card__name--premium">{activePricingPlan.name}</h3>
                      <p className="lp-pricing-card__price lp-pricing-card__price--premium">
                        {pricingDisplayEuros(activePricingPlan.monthly, billingCycle)}
                        <span className="lp-pricing-card__period lp-pricing-card__period--premium">/mois</span>
                      </p>
                      {pricingPerDisplay && (
                        <p className="lp-pricing-card__per lp-pricing-card__per--premium">
                          ≈ {pricingPerDisplay}€ / élève / mois (à {activeCoachStudentThreshold} élève
                          {activeCoachStudentThreshold > 1 ? "s" : ""})
                        </p>
                      )}
                      {activePricingPlan.eliteSubline && (
                        <p className="lp-pricing-card__elite lp-pricing-card__elite--premium">
                          {activePricingPlan.eliteSubline}
                        </p>
                      )}
                      <ul className="lp-pricing-card__features lp-pricing-card__features--premium">
                        {activePricingPlan.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <a
                        href="#inscription"
                        className={
                          activePricingPlan.contactOnly
                            ? "lp-pricing-card__cta lp-pricing-card__cta--premium-outline"
                            : "lp-pricing-card__cta lp-pricing-card__cta--premium"
                        }
                      >
                        {activePricingPlan.contactOnly ? "Nous contacter" : "Choisir ce plan"}
                      </a>
                    </article>
                  </div>
                </>
              ) : (
                <>
                  <p className="lp-pricing-bar__label lp-pricing-bar__label--premium" id="pricing-bar-label">
                    Choisissez votre palier
                  </p>

                  <div className="lp-pricing-premium-track">
                    <input
                      id="pricing-sportif-range"
                      className="lp-pricing-range lp-pricing-range--premium"
                      type="range"
                      min={0}
                      max={PRICING_SPORTIF_PLANS.length - 1}
                      step={1}
                      value={sportifPlanIdx}
                      onChange={(e) => setSportifPlanIdx(Number(e.target.value))}
                      aria-valuemin={0}
                      aria-valuemax={PRICING_SPORTIF_PLANS.length - 1}
                      aria-valuenow={sportifPlanIdx}
                      aria-valuetext={`${activeSportifPlan.name} — ${activeSportifPlan.monthlyLabel} par mois`}
                      aria-labelledby="pricing-bar-label"
                    />
                  </div>

                  <div
                    className="lp-pricing-bar__segments lp-pricing-bar__segments--premium lp-pricing-bar__segments--sportif"
                    role="tablist"
                    aria-label="Paliers d’abonnement sportif"
                  >
                    {PRICING_SPORTIF_PLANS.map((plan, i) => (
                      <button
                        key={plan.id}
                        type="button"
                        role="tab"
                        id={`sportif-tier-${i}`}
                        aria-selected={sportifPlanIdx === i}
                        aria-controls="sportif-pricing-panel"
                        className={`lp-pricing-bar__segment ${sportifPlanIdx === i ? "is-active" : ""}`}
                        style={{ flex: 1 }}
                        onClick={() => setSportifPlanIdx(i)}
                      >
                        <span className="lp-pricing-bar__segment-name">{plan.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="lp-pricing-premium-card-shell">
                    <article
                      key={sportifPlanIdx}
                      id="sportif-pricing-panel"
                      role="tabpanel"
                      aria-labelledby={`sportif-tier-${sportifPlanIdx}`}
                      className="lp-pricing-dynamic lp-pricing-card lp-pricing-card--premium"
                    >
                      <h3 className="lp-pricing-card__name lp-pricing-card__name--premium">
                        {activeSportifPlan.name}
                      </h3>
                      <p className="lp-pricing-card__price lp-pricing-card__price--premium">
                        {activeSportifPlan.monthlyLabel}
                        <span className="lp-pricing-card__period lp-pricing-card__period--premium">/mois</span>
                      </p>
                      <ul className="lp-pricing-card__features lp-pricing-card__features--premium">
                        {activeSportifPlan.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <a
                        href="#inscription"
                        className="lp-pricing-card__cta lp-pricing-card__cta--premium"
                      >
                        Choisir ce plan
                      </a>
                    </article>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="lp-cta-block">
          <div className="lp-wrap">
            <h2 className="lp-h2 lp-h2--light">
              Prêt à faire partie de l’<span className="lp-hero__accent">histoire</span> UKAN ?
            </h2>
            <p className="lp-cta-block__text">Rejoignez la liste et accédez en priorité au lancement.</p>
          </div>
        </section>

        <section className="lp-section lp-section--form" id="inscription">
          <div className="lp-wrap lp-wrap--narrow lp-wrap--form">
            <header className="lp-form-intro">
              <h2 className="lp-h2 lp-form-intro__title">
                Liste <span className="lp-hero__accent">d’attente</span>
              </h2>
              <p className="lp-form-intro__lead">
                Quelques infos pour vous prévenir en priorité au lancement.
              </p>
            </header>

            <div className="lp-form-card">
              <form
                className="lp-form lp-form--premium"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const country = await detectCountryFromCity(city);
                  const form = e.currentTarget;
                  const payload = new FormData(form);
                  payload.set("ville", city.trim());
                  payload.set("pays", country || detectedCountry || "");
                }}
              >
                <input type="hidden" name="role" value={formRole} />

                <div className="lp-form-role" role="status">
                  <span className="lp-form-role__label">Profil</span>
                  <span className="lp-form-role__value">
                    {formRole === "coach" ? "Coach certifié" : "Sportif"}
                  </span>
                </div>

                <div className="lp-form__block">
                  <p className="lp-form__legend">Identité</p>
                  <div className="lp-form__grid">
                    <label className="lp-label">
                      Prénom
                      <input type="text" name="prenom" required placeholder="Camille" autoComplete="given-name" />
                    </label>
                    <label className="lp-label">
                      Nom
                      <input type="text" name="nom" required placeholder="Martin" autoComplete="family-name" />
                    </label>
                  </div>
                </div>

                <div className="lp-form__block">
                  <p className="lp-form__legend">Contact</p>
                  <label className="lp-label">
                    Email
                    <input type="email" name="email" required placeholder="vous@email.com" autoComplete="email" />
                  </label>

                  <label className="lp-label">
                    De quelle plateforme êtes-vous inscrit ?
                    <input
                      type="text"
                      name="plateforme_actuelle"
                      placeholder="Ex. Instagram, Basic-Fit, autre"
                      autoComplete="off"
                    />
                  </label>

                  <label className="lp-label">
                    Ville
                    <input
                      type="text"
                      name="ville"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onBlur={(e) => {
                        void detectCountryFromCity(e.target.value);
                      }}
                      placeholder="Votre ville"
                      autoComplete="address-level2"
                    />
                  </label>
                  <input type="hidden" name="pays" value={detectedCountry} />
                </div>

                {formRole === "sportif" && (
                  <div className="lp-form__block">
                    <p className="lp-form__legend lp-form__legend--sport">Votre profil sportif</p>
                    <label className="lp-label">
                      Objectif principal
                      <select name="objectif" defaultValue="" required>
                        <option value="" disabled>
                          Choisir un objectif
                        </option>
                        {SPORTIF_OBJECTIFS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="lp-label">
                      Niveau
                      <select name="niveau" defaultValue="" required>
                        <option value="" disabled>
                          Choisir un niveau
                        </option>
                        {SPORTIF_NIVEAUX.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                )}

                {formRole === "coach" && (
                  <fieldset className="lp-fieldset lp-fieldset--checks lp-fieldset--premium">
                    <legend className="lp-fieldset__title">Spécialités</legend>
                    <p className="lp-fieldset__hint">Cochez tout ce qui vous correspond.</p>
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

                <div className="lp-form__actions">
                  <button type="submit" className="lp-btn lp-btn--submit lp-btn--block">
                    Valider mon inscription
                  </button>
                  <p className="lp-form__foot">Aucun spam. Désinscription à tout moment.</p>
                </div>
              </form>
            </div>
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
          <SocialLinks links={SOCIAL_LINKS} />
          <nav className="lp-footer__legal" aria-label="Informations légales">
            <a href="/mentions-legales">Mentions légales</a>
            <span className="lp-footer__legal-sep" aria-hidden>
              ·
            </span>
            <a href="/politique-de-confidentialite">Confidentialité</a>
            <span className="lp-footer__legal-sep" aria-hidden>
              ·
            </span>
            <a href="/politique-cookies">Cookies</a>
            <span className="lp-footer__legal-sep" aria-hidden>
              ·
            </span>
            <a href="/cgu">CGU</a>
          </nav>
          <span className="lp-footer__copy">
            © {new Date().getFullYear()}{" "}
            <span className="lp-footer__copy-brand">UKAN</span>
            {" — "}
            {role === "coach" ? "Coaching, nutrition & activité pro." : "Sport, nutrition & progression."}
          </span>
        </div>
      </footer>
    </div>
  );
}
