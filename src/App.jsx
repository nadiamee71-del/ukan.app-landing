import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
    text: "Entraînements structurés pour avancer sans te disperser.",
  },
  {
    role: "sportif",
    goals: ["Tout", "Trouver un coach"],
    title: "Trouver un coach",
    text: "Coachs certifiés, accompagnement à ta mesure.",
  },
  {
    role: "sportif",
    goals: ["Tout", "Rester motivé"],
    title: "Défis & progression",
    text: "Objectifs, défis et suivi de ton évolution.",
  },
  {
    role: "sportif",
    goals: ["Tout", "Mieux manger"],
    title: "Nutrition",
    text: "Apports et habitudes, plus simplement.",
  },
  {
    role: "sportif",
    goals: ["Tout", "Partager"],
    title: "Communauté",
    text: "Échange et motivation collective.",
  },
  {
    role: "sportif",
    goals: ["Tout", "Rester motivé"],
    title: "Transformation",
    text: "Avant / après et engagement sur la durée.",
  },
  {
    role: "coach",
    goals: ["Tout", "Trouver des clients"],
    title: "Visibilité",
    text: "Fais découvrir ton profil à de nouveaux sportifs.",
  },
  {
    role: "coach",
    goals: ["Tout", "Gérer mes élèves"],
    title: "Élèves",
    text: "Accompagnement et suivi au même endroit.",
  },
  {
    role: "coach",
    goals: ["Tout", "Monétiser"],
    title: "Monétisation",
    text: "Lives, contenus, offres plus claires.",
  },
  {
    role: "coach",
    goals: ["Tout", "Animer"],
    title: "Lives",
    text: "Anime ta communauté en direct.",
  },
  {
    role: "coach",
    goals: ["Tout", "Suivre la progression"],
    title: "Suivi",
    text: "Progrès des élèves, vision plus pro.",
  },
  {
    role: "coach",
    goals: ["Tout", "Gérer mes élèves"],
    title: "Outils",
    text: "Moins d’outils dispersés au quotidien.",
  },
];

const ROLE_COPY = {
  sportif: {
    kicker: "Pour toi",
    title: "Sportif",
    text: "Entraînement, nutrition, communauté et coachs — sans sauter d’une app à l’autre.",
    points: ["Coach", "Progression", "Motivation"],
  },
  coach: {
    kicker: "Pour toi",
    title: "Coach",
    text: "Visibilité, élèves et monétisation dans un flux unique.",
    points: ["Clients", "Suivi", "Croissance"],
  },
};

const SCREENS = [
  { id: "accueil", label: "Accueil" },
  { id: "pourquoi", label: "Pourquoi" },
  { id: "parcours", label: "Parcours" },
  { id: "diff", label: "UKAN" },
  { id: "beta", label: "Bêta" },
];

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [role, setRole] = useState("sportif");
  const [goal, setGoal] = useState("Tout");
  const [activeScreen, setActiveScreen] = useState(0);

  const scrollRef = useRef(null);
  const screenRefs = useRef([]);

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
    }).slice(0, 4);
  }, [role, goal]);

  const logoSrc = theme === "dark" ? logoDark : logoLight;

  useLayoutEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = parseInt(entry.target.getAttribute("data-screen-index") || "", 10);
          if (!Number.isNaN(idx)) setActiveScreen(idx);
        });
      },
      { root, threshold: 0.5, rootMargin: "-12% 0px -12% 0px" }
    );

    screenRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goToScreen = useCallback((index) => {
    const el = screenRefs.current[index];
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="app-landing">
      <div className="app-device">
        <header className="app-topbar">
          <div className="app-topbar__row">
            <div className="app-brand">
              <img src={logoSrc} alt="UKAN" className="app-brand__logo" width={36} height={36} />
              <span className="app-brand__name">UKAN</span>
            </div>
            <button
              type="button"
              className="app-icon-btn"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label={theme === "dark" ? "Thème clair" : "Thème sombre"}
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
          </div>
        </header>

        <div className="app-scroll" ref={scrollRef} id="app-scroll">
          <section
            className="app-screen app-screen--welcome"
            id="accueil"
            data-screen-index={0}
            ref={(el) => {
              screenRefs.current[0] = el;
            }}
          >
            <div className="app-screen__inner">
              <p className="app-pill">Bêta privée</p>
              <h1 className="app-hero-title">
                Tout ton sport,
                <br />
                <span className="app-hero-accent">une seule app.</span>
              </h1>
              <p className="app-hero-sub">
                Entraînement, nutrition, communauté et coaching — comme dans une app native,
                avant tout le monde.
              </p>
              <div className="app-hero-visual" aria-hidden="true">
                <div className="app-hero-blob" />
              </div>
              <button type="button" className="app-btn app-btn--primary" onClick={() => goToScreen(4)}>
                Rejoindre la bêta
              </button>
              <button type="button" className="app-btn app-btn--ghost" onClick={() => goToScreen(2)}>
                Personnaliser mon parcours
              </button>
            </div>
          </section>

          <section
            className="app-screen"
            id="pourquoi"
            data-screen-index={1}
            ref={(el) => {
              screenRefs.current[1] = el;
            }}
          >
            <div className="app-screen__inner app-screen__inner--list">
              <h2 className="app-screen-title">Pourquoi UKAN</h2>
              <p className="app-screen-lead">Trois raisons de t’installer — quand on ouvre.</p>
              <ul className="app-list-group">
                <li className="app-list-row">
                  <span className="app-list-row__icon app-list-row__icon--green" />
                  <div className="app-list-row__text">
                    <span className="app-list-row__title">Zéro dispersion</span>
                    <span className="app-list-row__sub">Un flux, pas six apps différentes.</span>
                  </div>
                </li>
                <li className="app-list-row">
                  <span className="app-list-row__icon app-list-row__icon--gold" />
                  <div className="app-list-row__text">
                    <span className="app-list-row__title">Sportifs & coachs</span>
                    <span className="app-list-row__sub">Le même écosystème, deux chemins.</span>
                  </div>
                </li>
                <li className="app-list-row">
                  <span className="app-list-row__icon app-list-row__icon--soft" />
                  <div className="app-list-row__text">
                    <span className="app-list-row__title">Sur la durée</span>
                    <span className="app-list-row__sub">Pensé pour tenir, pas pour l’effet d’un jour.</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section
            className="app-screen"
            id="parcours"
            data-screen-index={2}
            ref={(el) => {
              screenRefs.current[2] = el;
            }}
          >
            <div className="app-screen__inner app-screen__inner--list">
              <h2 className="app-screen-title">Ton parcours</h2>
              <p className="app-screen-lead">Qui es-tu ? Qu’est-ce que tu veux ?</p>

              <div className="app-segment" role="group" aria-label="Profil">
                <button
                  type="button"
                  className={role === "sportif" ? "is-selected" : ""}
                  onClick={() => setRole("sportif")}
                >
                  Sportif
                </button>
                <button
                  type="button"
                  className={role === "coach" ? "is-selected" : ""}
                  onClick={() => setRole("coach")}
                >
                  Coach
                </button>
              </div>

              <div className="app-chips-scroll" role="group" aria-label="Objectif">
                <div className="app-chips">
                  {goals.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`app-chip ${goal === item ? "is-on" : ""}`}
                      onClick={() => setGoal(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="app-sheet">
                <p className="app-sheet__kicker">{currentCopy.kicker}</p>
                <p className="app-sheet__title">{currentCopy.title}</p>
                <p className="app-sheet__body">{currentCopy.text}</p>
                <div className="app-sheet__tags">
                  {currentCopy.points.map((p) => (
                    <span key={p} className="app-sheet__tag">
                      {p}
                    </span>
                  ))}
                </div>
                <p className="app-sheet__hint">
                  Objectif : <strong>{goal === "Tout" ? "Vue large" : goal}</strong>
                </p>
              </div>

              <ul className="app-list-group app-list-group--flush">
                {visibleFeatures.map((feature) => (
                  <li className="app-list-row app-list-row--compact" key={`${feature.role}-${feature.title}`}>
                    <div className="app-list-row__text">
                      <span className="app-list-row__title">{feature.title}</span>
                      <span className="app-list-row__sub">{feature.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section
            className="app-screen app-screen--accent"
            id="diff"
            data-screen-index={3}
            ref={(el) => {
              screenRefs.current[3] = el;
            }}
          >
            <div className="app-screen__inner app-screen__inner--center">
              <h2 className="app-screen-title app-screen-title--center">Pas une app en plus.</h2>
              <p className="app-screen-lead app-screen-lead--center">
                UKAN relie ton corps, ta communauté et ton ambition — dans un seul geste.
              </p>
              <ul className="app-bullets">
                <li>Un flux</li>
                <li>Un lieu</li>
                <li>Un élan</li>
              </ul>
            </div>
          </section>

          <section
            className="app-screen app-screen--beta"
            id="beta"
            data-screen-index={4}
            ref={(el) => {
              screenRefs.current[4] = el;
            }}
          >
            <div className="app-screen__inner">
              <h2 className="app-screen-title">Liste d’attente</h2>
              <p className="app-screen-lead">Sois prévenu·e en premier. Rien d’autre.</p>

              <form className="app-form" onSubmit={(e) => e.preventDefault()}>
                <div className="app-form__group">
                  <label className="app-field">
                    <span className="app-field__label">Rôle</span>
                    <select className="app-field__input" defaultValue="sportif">
                      <option value="sportif">Sportif</option>
                      <option value="coach">Coach</option>
                    </select>
                  </label>
                  <label className="app-field">
                    <span className="app-field__label">Prénom</span>
                    <input className="app-field__input" type="text" placeholder="Ton prénom" />
                  </label>
                  <label className="app-field">
                    <span className="app-field__label">Email</span>
                    <input className="app-field__input" type="email" placeholder="email@…" />
                  </label>
                </div>
                <button type="submit" className="app-btn app-btn--primary app-btn--block">
                  Rejoindre
                </button>
              </form>
              <p className="app-legal">Pas de spam. Un clic pour te désinscrire.</p>
            </div>
          </section>
        </div>

        <nav className="app-tabbar" aria-label="Navigation principale">
          {SCREENS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`app-tab ${activeScreen === i ? "is-active" : ""}`}
              onClick={() => goToScreen(i)}
            >
              <span className="app-tab__dot" />
              <span className="app-tab__label">{s.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
