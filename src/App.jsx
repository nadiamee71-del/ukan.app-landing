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

/** Tarifs coach indicatifs selon le nombre d’élèves suivis */
const PRICING_TIERS = [
  {
    id: "starter",
    name: "Starter",
    students: "Jusqu’à 10 élèves",
    price: "29 €",
    period: "/ mois",
    note: "Idéal pour démarrer ou tester UKAN en conditions réelles.",
    featured: false,
  },
  {
    id: "pro",
    name: "Pro",
    students: "11 à 50 élèves",
    price: "79 €",
    period: "/ mois",
    note: "Le sweet spot pour les coachs qui structurent leur cabinet.",
    featured: true,
  },
  {
    id: "scale",
    name: "Scale",
    students: "Plus de 50 élèves",
    price: "Sur devis",
    period: "",
    note: "Accompagnement et grille adaptée à votre volume.",
    featured: false,
  },
];

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [role, setRole] = useState("sportif");
  const [goal, setGoal] = useState("Tout");
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [formRole, setFormRole] = useState("sportif");
  const [specialties, setSpecialties] = useState(() =>
    Object.fromEntries(COACH_SPECIALTIES.map((s) => [s, false]))
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    setGoal("Tout");
  }, [role]);

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
            <p className="lp-sub">
              Une landing produit, pas un gadget : nous préparons une sortie soignée, avec vous.
            </p>
            <ul className="lp-pillars">
              <li>
                <span className="lp-pillars__n">01</span>
                <h3>Confiance</h3>
                <p>Coachs certifiés uniquement — zéro amateur sur la bannière « pro ».</p>
              </li>
              <li>
                <span className="lp-pillars__n">02</span>
                <h3>Clarté</h3>
                <p>Un seul lieu pour s’entraîner, suivre sa nutrition et échanger.</p>
              </li>
              <li>
                <span className="lp-pillars__n">03</span>
                <h3>Ambition</h3>
                <p>Pour les sportifs qui veulent du sérieux et les coachs qui veulent scaler proprement.</p>
              </li>
            </ul>
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
            <h2 className="lp-h2">Tarifs coach selon vos élèves</h2>
            <p className="lp-sub">
              Des abonnements qui évoluent avec votre nombre d’élèves suivis — transparents, sans
              surprise au lancement.
            </p>
            <p className="lp-pricing-note">
              Montants <strong>indicatifs</strong> ; confirmation et options finales communiquées
              aux inscrits avant l’ouverture publique.
            </p>
            <div className="lp-pricing">
              {PRICING_TIERS.map((tier) => (
                <article
                  key={tier.id}
                  className={`lp-price ${tier.featured ? "lp-price--featured" : ""}`}
                >
                  {tier.featured && <span className="lp-price__badge">Le plus choisi</span>}
                  <h3 className="lp-price__name">{tier.name}</h3>
                  <p className="lp-price__students">{tier.students}</p>
                  <p className="lp-price__amount">
                    {tier.price}
                    {tier.period && <small>{tier.period}</small>}
                  </p>
                  <p className="lp-price__note">{tier.note}</p>
                </article>
              ))}
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
