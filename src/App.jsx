import React, { useEffect, useMemo, useState } from "react";
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

const FEATURES = [
  {
    role: "sportif",
    goals: ["Tout", "Progresser"],
    title: "Séances guidées",
    text: "Retrouve des entraînements structurés pour avancer sans te disperser.",
  },
  {
    role: "sportif",
    goals: ["Tout", "Trouver un coach"],
    title: "Trouver un coach",
    text: "Découvre des coachs certifiés et choisis l’accompagnement qui te correspond.",
  },
  {
    role: "sportif",
    goals: ["Tout", "Rester motivé"],
    title: "Défis & progression",
    text: "Garde le rythme grâce aux objectifs, aux défis et au suivi de ton évolution.",
  },
  {
    role: "sportif",
    goals: ["Tout", "Mieux manger"],
    title: "Nutrition simplifiée",
    text: "Accède à des outils pour mieux gérer tes apports, tes habitudes et ta régularité.",
  },
  {
    role: "sportif",
    goals: ["Tout", "Partager"],
    title: "Communauté active",
    text: "Publie, échange, découvre d’autres profils et avance dans un vrai univers sportif.",
  },
  {
    role: "sportif",
    goals: ["Tout", "Rester motivé"],
    title: "Transformation visible",
    text: "Suis ton avant / après, garde une trace de tes efforts et reste engagé sur la durée.",
  },
  {
    role: "coach",
    goals: ["Tout", "Trouver des clients"],
    title: "Visibilité coach",
    text: "Développe ta présence et fais découvrir ton profil à de nouveaux sportifs.",
  },
  {
    role: "coach",
    goals: ["Tout", "Gérer mes élèves"],
    title: "Gestion des élèves",
    text: "Centralise l’accompagnement, la communication et le suivi dans un seul espace.",
  },
  {
    role: "coach",
    goals: ["Tout", "Monétiser"],
    title: "Monétisation",
    text: "Construis une offre plus claire avec lives, contenus et accès premium.",
  },
  {
    role: "coach",
    goals: ["Tout", "Animer"],
    title: "Lives & communauté",
    text: "Anime ton audience, lance des formats en direct et crée une vraie dynamique.",
  },
  {
    role: "coach",
    goals: ["Tout", "Suivre la progression"],
    title: "Suivi intelligent",
    text: "Observe les progrès de tes élèves et rends ton accompagnement plus clair et plus pro.",
  },
  {
    role: "coach",
    goals: ["Tout", "Gérer mes élèves"],
    title: "Outils coach réunis",
    text: "Moins d’outils dispersés, plus d’efficacité dans ton activité au quotidien.",
  },
];

const ROLE_COPY = {
  sportif: {
    kicker: "Sportifs",
    title: "Avancer sans se disperser.",
    text: "Une trajectoire claire : entraînement, nutrition, communauté et coachs — au même endroit.",
    points: ["Trouver un coach", "Tenir dans la durée", "Rester motivé"],
  },
  coach: {
    kicker: "Coachs",
    title: "Grandir avec méthode.",
    text: "Visibilité, élèves, monétisation : une présence professionnelle qui vous ressemble.",
    points: ["Être visible", "Structurer l’offre", "Fidéliser"],
  },
};

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [role, setRole] = useState("sportif");
  const [goal, setGoal] = useState("Tout");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    setGoal("Tout");
  }, [role]);

  const goals = role === "sportif" ? SPORTIF_GOALS : COACH_GOALS;
  const currentCopy = ROLE_COPY[role];

  const visibleFeatures = useMemo(() => {
    return FEATURES.filter((item) => {
      const sameRole = item.role === role;
      const matchesGoal = goal === "Tout" || item.goals.includes(goal);
      return sameRole && matchesGoal;
    }).slice(0, 3);
  }, [role, goal]);

  const logoSrc = theme === "dark" ? logoDark : logoLight;

  return (
    <div className="landing-shell">
      <header className="site-header">
        <div className="frame header-inner">
          <a href="#top" className="brand">
            <img src={logoSrc} alt="UKAN" className="brand-logo" />
            <span className="brand-word">UKAN</span>
          </a>

          <nav className="main-nav" aria-label="Navigation">
            <a href="#experience">Vision</a>
            <a href="#features">Vous</a>
            <a href="#beta">Bêta</a>
          </nav>

          <div className="header-meta">
            <button
              type="button"
              className="theme-text"
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              aria-label={`Passer en thème ${theme === "dark" ? "clair" : "sombre"}`}
            >
              {theme === "dark" ? "Clair" : "Sombre"}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="frame hero-layout">
            <div className="hero-copy">
              <p className="kicker">Lancement — bêta privée</p>
              <h1 className="hero-title">
                Le mouvement
                <br />
                <span className="hero-title-accent">recommence ici.</span>
              </h1>
              <p className="hero-dek">
                UKAN rassemble sport, nutrition et coaching dans une expérience unique.
                Rejoignez les premiers avant l’ouverture publique.
              </p>
              <div className="hero-cta">
                <a href="#beta" className="cta cta--solid">
                  Rejoindre la bêta
                </a>
                <a href="#features" className="cta cta--line">
                  Votre intention
                </a>
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="hero-art__orb hero-art__orb--a" />
              <div className="hero-art__orb hero-art__orb--b" />
              <div className="hero-art__orb hero-art__orb--c" />
              <div className="hero-art__arc" />
              <div className="hero-art__beam" />
              <p className="hero-art__caption">UKAN</p>
            </div>
          </div>
        </section>

        <section id="experience" className="strip strip--benefits">
          <div className="frame">
            <header className="block-head block-head--wide">
              <p className="kicker">Pourquoi</p>
              <h2 className="headline-lg">Moins de bruit. Plus d’élan.</h2>
              <p className="lead">
                Une marque pensée pour celles et ceux qui veulent tenir — côté salle comme côté métier.
              </p>
            </header>

            <div className="benefit-row">
              <article className="benefit">
                <span className="benefit-glyph" aria-hidden="true" />
                <h3 className="benefit-title">Clarté</h3>
                <p className="benefit-copy">
                  Une ligne directe entre vos objectifs et vos actions — sans enchaîner les apps.
                </p>
              </article>
              <article className="benefit">
                <span className="benefit-glyph benefit-glyph--gold" aria-hidden="true" />
                <h3 className="benefit-title">Connexion</h3>
                <p className="benefit-copy">
                  Sportifs et coachs partagent le même élan : progression, confiance, communauté.
                </p>
              </article>
              <article className="benefit">
                <span className="benefit-glyph benefit-glyph--soft" aria-hidden="true" />
                <h3 className="benefit-title">Durée</h3>
                <p className="benefit-copy">
                  Conçu pour la régularité — pas le coup d’éclat puis l’abandon.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="features" className="strip strip--features">
          <div className="frame">
            <header className="block-head">
              <p className="kicker">À votre image</p>
              <h2 className="headline-lg">Qui êtes-vous — et qu’est-ce qui vous anime ?</h2>
            </header>

            <div className="pickers">
              <div className="picker-line" role="group" aria-label="Profil">
                <button
                  type="button"
                  className={`picker-link ${role === "sportif" ? "is-on" : ""}`}
                  onClick={() => setRole("sportif")}
                >
                  Je suis sportif
                </button>
                <span className="picker-sep" aria-hidden="true">
                  /
                </span>
                <button
                  type="button"
                  className={`picker-link ${role === "coach" ? "is-on" : ""}`}
                  onClick={() => setRole("coach")}
                >
                  Je suis coach
                </button>
              </div>

              <div className="goal-row" role="group" aria-label="Ce que vous cherchez">
                {goals.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`goal-dot ${goal === item ? "is-on" : ""}`}
                    onClick={() => setGoal(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="editorial-block">
              <p className="editorial-kicker">{currentCopy.kicker}</p>
              <h3 className="editorial-title">{currentCopy.title}</h3>
              <p className="editorial-lead">{currentCopy.text}</p>
              <ul className="editorial-tags">
                {currentCopy.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="editorial-focus">
                <span className="editorial-focus-label">Intention</span>
                {goal === "Tout" ? "Vue large" : goal}
              </p>
            </div>

            {visibleFeatures.length > 0 && (
              <div className="feature-fragments">
                {visibleFeatures.map((feature) => (
                  <div className="fragment" key={`${feature.role}-${feature.title}`}>
                    <span className="fragment-name">{feature.title}</span>
                    <span className="fragment-line">{feature.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="strip strip--diff" id="difference">
          <div className="frame diff-frame">
            <p className="diff-kicker">Hors case</p>
            <h2 className="diff-title">Ni bruit. Ni superflu.</h2>
            <p className="diff-one">
              UKAN relie corps, communauté et ambition — pour jouer longtemps.
            </p>
            <ul className="diff-words">
              <li>Un seul élan</li>
              <li>Un même terrain</li>
              <li>Une marque qui dure</li>
            </ul>
          </div>
        </section>

        <section id="beta" className="strip strip--beta">
          <div className="frame beta-frame">
            <div className="beta-copy">
              <p className="kicker">Accès anticipé</p>
              <h2 className="headline-lg">Inscrivez-vous.</h2>
              <p className="lead">
                Soyez informés en premier. Pas de promesses creuses — uniquement le lancement et la bêta.
              </p>
            </div>

            <form className="beta-minimal" onSubmit={(e) => e.preventDefault()}>
              <label className="field-min">
                <span className="sr-only">Rôle</span>
                <select defaultValue="sportif">
                  <option value="sportif">Sportif</option>
                  <option value="coach">Coach</option>
                </select>
              </label>
              <label className="field-min">
                <span className="sr-only">Prénom</span>
                <input type="text" name="first" placeholder="Prénom" autoComplete="given-name" />
              </label>
              <label className="field-min field-min--grow">
                <span className="sr-only">Email</span>
                <input type="email" name="email" placeholder="Email" autoComplete="email" />
              </label>
              <button type="submit" className="cta cta--solid cta--send">
                Envoyer
              </button>
            </form>
            <p className="beta-foot">Pas de spam. Désinscription en un clic.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
