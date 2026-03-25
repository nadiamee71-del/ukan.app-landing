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
    badge: "Pour les sportifs",
    title: "Une app pour progresser, tenir dans la durée et rester motivé.",
    text: "UKAN réunit entraînement, nutrition, communauté et progression dans une seule expérience plus claire et plus engageante.",
    points: [
      "Trouver un coach",
      "Suivre sa progression",
      "Mieux gérer sa nutrition",
      "Rester motivé sur la durée",
    ],
  },
  coach: {
    badge: "Pour les coachs",
    title: "Une plateforme pour accompagner, structurer et faire grandir votre activité.",
    text: "UKAN aide les coachs à gagner en clarté, en visibilité et en impact avec une vraie expérience pensée pour leur métier.",
    points: [
      "Gérer ses élèves",
      "Développer sa visibilité",
      "Monétiser ses formats",
      "Créer une relation durable",
    ],
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
    }).slice(0, 6);
  }, [role, goal]);

  const logoSrc = theme === "dark" ? logoDark : logoLight;

  return (
    <div className="landing-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand">
            <img src={logoSrc} alt="UKAN" className="brand-logo" />
            <div className="brand-text">
              <span className="brand-name">UKAN</span>
              <span className="brand-tag">bêta privée</span>
            </div>
          </a>

          <nav className="main-nav">
            <a href="#experience">Expérience</a>
            <a href="#features">Fonctionnalités</a>
            <a href="#beta">Accès bêta</a>
          </nav>

          <button
            type="button"
            className="theme-switch"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            aria-label="Changer de thème"
          >
            <span className={theme === "dark" ? "is-active" : ""}>Sombre</span>
            <span className={theme === "light" ? "is-active" : ""}>Clair</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">LANCEMENT BIENTÔT</span>

              <h1>
                Une seule app pour
                <span className="text-accent"> s’entraîner</span>,
                <span className="text-gold"> progresser</span>
                <br />
                et connecter coachs & sportifs.
              </h1>

              <p className="hero-lead">
                UKAN réunit entraînement, nutrition, motivation, communauté et outils
                coach dans une expérience premium, plus claire et plus vivante.
              </p>

              <div className="hero-actions">
                <a href="#beta" className="btn btn-primary">
                  Rejoindre la bêta
                </a>
                <a href="#features" className="btn btn-secondary">
                  Voir ce qui vous attend
                </a>
              </div>

              <div className="hero-proof">
                <div className="proof-item">
                  <strong>Sportifs</strong>
                  <span>pour progresser sans se disperser</span>
                </div>
                <div className="proof-item">
                  <strong>Coachs</strong>
                  <span>pour développer une vraie activité</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="phone-stack">
                <div className="phone-card phone-card-main">
                  <div className="phone-topline">
                    <span className="mini-dot" />
                    <span>UKAN Preview</span>
                  </div>

                  <div className="phone-panel phone-panel-highlight">
                    <span className="panel-kicker">Objectif de la semaine</span>
                    <h3>Rester régulier sans perdre l’élan</h3>
                    <p>
                      Défis, progression, séances, nutrition et communauté dans une seule
                      expérience.
                    </p>
                  </div>

                  <div className="phone-mini-grid">
                    <div className="mini-card">
                      <span>Défis</span>
                      <strong>Hard Challenge</strong>
                    </div>
                    <div className="mini-card">
                      <span>Nutrition</span>
                      <strong>Suivi simplifié</strong>
                    </div>
                    <div className="mini-card">
                      <span>Coachs</span>
                      <strong>Profils certifiés</strong>
                    </div>
                    <div className="mini-card">
                      <span>Social</span>
                      <strong>Communauté active</strong>
                    </div>
                  </div>
                </div>

                <div className="phone-card phone-card-side">
                  <span className="side-kicker">Pensé pour durer</span>
                  <strong>Moins d’apps dispersées.</strong>
                  <p>Plus de cohérence, plus de suivi, plus d’engagement.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section">
          <div className="container">
            <div className="section-head centered">
              <span className="eyebrow">UNE EXPÉRIENCE PLUS CLAIRE</span>
              <h2>Ce que UKAN change vraiment</h2>
              <p>
                Au lieu de passer d’une app à l’autre, tout se retrouve dans un seul
                écosystème pensé pour tenir dans le temps.
              </p>
            </div>

            <div className="experience-grid">
              <article className="experience-card">
                <span className="card-kicker">01</span>
                <h3>Pour les sportifs</h3>
                <p>
                  Progression, motivation, nutrition et coachs certifiés dans une seule
                  expérience plus simple à suivre.
                </p>
              </article>

              <article className="experience-card">
                <span className="card-kicker">02</span>
                <h3>Pour les coachs</h3>
                <p>
                  Un espace plus clair pour structurer son activité, gagner en
                  visibilité et mieux accompagner ses élèves.
                </p>
              </article>

              <article className="experience-card">
                <span className="card-kicker">03</span>
                <h3>Pour durer</h3>
                <p>
                  Défis, communauté, contenus, suivi et outils intelligents pour garder
                  un vrai engagement dans le temps.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">FONCTIONNALITÉS QUI S’ADAPTENT</span>
              <h2>Choisissez votre profil, puis ce que vous cherchez.</h2>
              <p>
                On ne vous affiche pas une liste interminable. UKAN met en avant ce qui
                compte selon votre besoin.
              </p>
            </div>

            <div className="feature-controls">
              <div className="role-switch">
                <button
                  type="button"
                  className={role === "sportif" ? "active" : ""}
                  onClick={() => setRole("sportif")}
                >
                  Je suis sportif
                </button>
                <button
                  type="button"
                  className={role === "coach" ? "active" : ""}
                  onClick={() => setRole("coach")}
                >
                  Je suis coach
                </button>
              </div>

              <div className="goal-pills">
                {goals.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={goal === item ? "active" : ""}
                    onClick={() => setGoal(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="feature-spotlight">
              <div className="spotlight-copy">
                <span className="spotlight-badge">{currentCopy.badge}</span>
                <h3>{currentCopy.title}</h3>
                <p>{currentCopy.text}</p>

                <ul className="spotlight-list">
                  {currentCopy.points.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="spotlight-panel">
                <span className="panel-label">
                  {role === "sportif" ? "Parcours sportif" : "Parcours coach"}
                </span>
                <strong>{goal === "Tout" ? "Vue d’ensemble" : goal}</strong>
                <p>
                  {role === "sportif"
                    ? "Une expérience conçue pour aider les sportifs à progresser sans se perdre."
                    : "Une plateforme pensée pour aider les coachs à mieux accompagner et mieux se développer."}
                </p>
              </div>
            </div>

            <div className="features-grid">
              {visibleFeatures.map((feature) => (
                <article className="feature-card" key={`${feature.role}-${feature.title}`}>
                  <span className="feature-role">
                    {feature.role === "sportif" ? "Sportif" : "Coach"}
                  </span>
                  <h4>{feature.title}</h4>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="difference-section">
          <div className="container">
            <div className="difference-card">
              <div className="difference-copy">
                <span className="eyebrow">LA DIFFÉRENCE UKAN</span>
                <h2>Bien plus qu’une app fitness.</h2>
                <p>
                  UKAN relie progression personnelle, motivation, communauté et business
                  coach dans une seule plateforme cohérente.
                </p>
              </div>

              <div className="difference-points">
                <div className="diff-point">
                  <strong>Une expérience unifiée</strong>
                  <span>Moins d’outils dispersés, plus de continuité.</span>
                </div>
                <div className="diff-point">
                  <strong>Une vraie dimension humaine</strong>
                  <span>Sportifs et coachs évoluent dans le même écosystème.</span>
                </div>
                <div className="diff-point">
                  <strong>Une vision pensée pour durer</strong>
                  <span>Motivation, suivi, social et progression réunis.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="beta" className="beta-section">
          <div className="container">
            <div className="beta-card">
              <div className="beta-copy">
                <span className="eyebrow">ACCÈS ANTICIPÉ</span>
                <h2>Rejoignez les premiers testeurs UKAN</h2>
                <p>
                  Inscrivez-vous pour découvrir la plateforme avant son lancement public
                  et faire partie des premiers retours.
                </p>
              </div>

              <form className="beta-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <select defaultValue="sportif">
                    <option value="sportif">Je suis sportif</option>
                    <option value="coach">Je suis coach</option>
                  </select>
                  <input type="text" placeholder="Votre prénom" />
                </div>

                <div className="form-row">
                  <input type="email" placeholder="Votre email" />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-full">
                    Rejoindre la liste d’attente
                  </button>
                </div>

                <p className="form-note">
                  Accès prioritaire au lancement, annonces bêta et informations en avant-première.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
