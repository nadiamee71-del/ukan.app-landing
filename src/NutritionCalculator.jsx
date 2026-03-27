import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import "./nutrition-calculator.css";

/** kcal de référence pour 100 g (ou 100 ml pour le lait) */
const FOODS = [
  { id: "broccoli", name: "Brocoli", kcalPer100: 34, kcalLabel: "34" },
  { id: "chicken", name: "Cuisse de poulet", kcalPer100: 165, kcalLabel: "165" },
  { id: "rice", name: "Riz", kcalPer100: 130, kcalLabel: "130" },
  { id: "milk", name: "Lait", kcalPer100: 42, kcalLabel: "42", perVolume: true },
  { id: "egg", name: "Œuf", kcalPer100: 155, kcalLabel: "155" },
  { id: "banana", name: "Banane", kcalPer100: 89, kcalLabel: "89" },
  { id: "steak", name: "Steak", kcalPer100: 250, kcalLabel: "250" },
];

const UNITS = [
  { id: "g", label: "g", toGrams: (q) => q },
  { id: "kg", label: "kg", toGrams: (q) => q * 1000 },
  { id: "ml", label: "ml", toGrams: (q) => q },
  { id: "cl", label: "cl", toGrams: (q) => q * 10 },
];

function compute(a, op, b) {
  const x = Number(a);
  const y = Number(b);
  switch (op) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "×":
      return x * y;
    case "÷":
      return y === 0 ? NaN : x / y;
    default:
      return y;
  }
}

function formatNum(n) {
  if (Number.isNaN(n) || !Number.isFinite(n)) return "Erreur";
  const rounded = Math.round(n * 1e9) / 1e9;
  const s = String(rounded);
  if (s.length > 14) return String(n.toPrecision(10));
  return s;
}

/** Quantité exploitable pour l’ajout (affichage calculatrice → nombre > 0) */
function parseQuantityFromDisplay(display) {
  if (display === "Erreur" || display === undefined || display === "") return null;
  const trimmed = String(display).trim();
  if (trimmed === "") return null;
  const q = parseFloat(trimmed);
  if (Number.isNaN(q) || q <= 0) return null;
  return q;
}

const calcInitial = { display: "0", acc: null, op: null, fresh: true };

function calcReducer(state, action) {
  switch (action.type) {
    case "clear":
      return calcInitial;
    case "digit": {
      const d = action.d;
      if (state.display === "Erreur") {
        return { ...calcInitial, display: d === "." ? "0." : d, fresh: false };
      }
      if (state.fresh) {
        return { ...state, display: d === "." ? "0." : d, fresh: false };
      }
      if (d === "." && state.display.includes(".")) return state;
      if (state.display === "0" && d !== ".") return { ...state, display: d };
      return { ...state, display: state.display + d };
    }
    case "op": {
      const nextOp = action.op;
      const v = parseFloat(state.display);
      if (Number.isNaN(v)) return state;
      if (state.acc === null) {
        return { display: state.display, acc: v, op: nextOp, fresh: true };
      }
      if (state.fresh) {
        return { ...state, op: nextOp };
      }
      const r = compute(state.acc, state.op, v);
      if (Number.isNaN(r)) {
        return { display: "Erreur", acc: null, op: null, fresh: true };
      }
      const disp = formatNum(r);
      return { display: disp, acc: r, op: nextOp, fresh: true };
    }
    case "eq": {
      if (state.acc === null || state.op === null) return state;
      const v = parseFloat(state.display);
      if (Number.isNaN(v)) return state;
      const r = compute(state.acc, state.op, v);
      if (Number.isNaN(r)) {
        return { display: "Erreur", acc: null, op: null, fresh: true };
      }
      return { display: formatNum(r), acc: null, op: null, fresh: true };
    }
    default:
      return state;
  }
}

/** Compteur total avec interpolation douce (ease-out cubic) */
function useAnimatedKcal(target, durationMs = 480) {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);
  const rafRef = useRef(null);

  useEffect(() => {
    const from = valueRef.current;
    if (Math.abs(target - from) < 0.01) {
      setValue(target);
      valueRef.current = target;
      return;
    }
    const start = performance.now();
    const delta = target - from;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - t) ** 3;
      const next = from + delta * eased;
      valueRef.current = next;
      setValue(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        valueRef.current = target;
        setValue(target);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs]);

  return value;
}

function FoodIcon({ name }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "broccoli":
      return (
        <svg viewBox="0 0 32 32" aria-hidden>
          <path d="M16 6v4M12 10c-2 2-3 5-2 8h12c1-3 0-6-2-8" {...c} />
          <path d="M10 18h12v6H10z" {...c} />
          <path d="M14 24v4M18 24v4" {...c} />
        </svg>
      );
    case "chicken":
      return (
        <svg viewBox="0 0 32 32" aria-hidden>
          <path d="M10 22c-2-4 0-10 6-12 4-1 8 1 10 5 2 5-1 11-7 13-3 1-6 0-9-2" {...c} />
          <path d="M22 10l4-4M24 8l2 2" {...c} />
        </svg>
      );
    case "rice":
      return (
        <svg viewBox="0 0 32 32" aria-hidden>
          <ellipse cx="16" cy="20" rx="10" ry="6" {...c} />
          <path d="M10 18c2-4 4-6 6-6s4 2 6 6" {...c} />
        </svg>
      );
    case "milk":
      return (
        <svg viewBox="0 0 32 32" aria-hidden>
          <path d="M12 8h8l2 4v14H10V12l2-4z" {...c} />
          <path d="M14 8V6h4v2" {...c} />
        </svg>
      );
    case "egg":
      return (
        <svg viewBox="0 0 32 32" aria-hidden>
          <ellipse cx="16" cy="17" rx="7" ry="9" {...c} />
        </svg>
      );
    case "banana":
      return (
        <svg viewBox="0 0 32 32" aria-hidden>
          <path d="M10 22c4-6 8-14 10-18 2 2 3 5 2 8-1 4-5 8-10 10-3 1-5 0-2 0z" {...c} />
        </svg>
      );
    case "steak":
      return (
        <svg viewBox="0 0 32 32" aria-hidden>
          <ellipse cx="16" cy="17" rx="11" ry="7" {...c} />
          <path d="M8 17h16M11 14h10M11 20h10" {...c} />
        </svg>
      );
    default:
      return null;
  }
}

export function NutritionCalculator() {
  const [selectedId, setSelectedId] = useState(null);
  const [unitId, setUnitId] = useState("g");
  const [plate, setPlate] = useState([]);
  const [calc, dispatch] = useReducer(calcReducer, calcInitial);

  const selectedFood = useMemo(() => (selectedId ? FOODS.find((f) => f.id === selectedId) : null), [selectedId]);
  const unit = useMemo(() => UNITS.find((u) => u.id === unitId) ?? UNITS[0], [unitId]);
  const totalKcal = useMemo(() => plate.reduce((s, p) => s + p.kcal, 0), [plate]);
  const animatedTotal = useAnimatedKcal(totalKcal);
  /** Remplissage visuel de l’assiette (0 → 1), plafonné pour rester subtil */
  const plateFill = useMemo(() => Math.min(1, totalKcal / 650), [totalKcal]);

  const quantity = useMemo(() => parseQuantityFromDisplay(calc.display), [calc.display]);
  const canAdd = Boolean(selectedFood && quantity !== null);

  const clearPlate = useCallback(() => {
    setPlate([]);
    setSelectedId(null);
    setUnitId("g");
    dispatch({ type: "clear" });
  }, []);

  const addToPlate = useCallback(() => {
    if (!selectedFood) return;
    const qty = parseQuantityFromDisplay(calc.display);
    if (qty === null) return;
    const baseAmount = unit.toGrams(qty);
    const kcal = (selectedFood.kcalPer100 * baseAmount) / 100;
    const rounded = Math.round(kcal * 10) / 10;
    const label = `${selectedFood.name} · ${qty} ${unit.label}`;
    setPlate((p) => [
      ...p,
      {
        id: `${Date.now()}-${p.length}`,
        foodId: selectedFood.id,
        label,
        kcal: rounded,
      },
    ]);
    dispatch({ type: "clear" });
  }, [calc.display, selectedFood, unit]);

  const handleKey = (key) => {
    if (key === "C") dispatch({ type: "clear" });
    else if ("0123456789.".includes(key)) dispatch({ type: "digit", d: key });
    else if (key === "+" || key === "-" || key === "×" || key === "÷") dispatch({ type: "op", op: key });
    else if (key === "=") dispatch({ type: "eq" });
  };

  return (
    <div className="nc">
      <h2 className="nc__title" id="nutri-calc-title">
        Reprends le contrôle jusqu’à dans ton assiette
      </h2>

      <div className="nc-plate-card">
        <p className="nc-plate-card__total">
          Total : <strong className="nc-total-kcal">{Math.round(animatedTotal * 10) / 10}</strong> kcal
        </p>
        <div
          className={`nc-plate ${plate.length > 0 ? "nc-plate--has-food" : ""}`}
          style={{ "--nc-plate-fill": plateFill }}
          aria-hidden="true"
        >
          <div className="nc-plate__fill" />
          <div className="nc-plate__inner">
            {plate.length === 0 ? (
              <span className="nc-plate__hint">Ajoutez un aliment</span>
            ) : (
              <div
                className={`nc-plate-chips ${plate.length > 6 ? "nc-plate-chips--compact" : ""}`}
                role="list"
              >
                {plate.map((item) => (
                  <div key={item.id} className="nc-plate-chip" role="listitem" title={item.label}>
                    <span className="nc-plate-chip__icon" aria-hidden>
                      <FoodIcon name={item.foodId ?? "broccoli"} />
                    </span>
                    <span className="nc-plate-chip__kcal">{item.kcal}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <ul className="nc-plate-sr" aria-live="polite">
          {plate.map((item) => (
            <li key={item.id}>
              {item.label} : {item.kcal} kcal
            </li>
          ))}
        </ul>
        <button type="button" className="nc-btn-clear" onClick={clearPlate}>
          Vider l’assiette
        </button>
      </div>

      <div className="nc-foods" role="group" aria-label="Choisir un aliment">
        {FOODS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`nc-food ${selectedId === f.id ? "is-selected" : ""}`}
            onClick={() => setSelectedId(f.id)}
            aria-pressed={selectedId === f.id}
            aria-label={`${f.name}, ${f.kcalLabel} kcal pour 100 ${f.perVolume ? "ml" : "g"}`}
          >
            <span className="nc-food__icon">
              <FoodIcon name={f.id} />
            </span>
            <span className="nc-food__kcal">{f.kcalLabel} kcal</span>
          </button>
        ))}
      </div>

      <div className="nc-row-units" role="group" aria-label="Unité de mesure">
        {UNITS.map((u) => (
          <button
            key={u.id}
            type="button"
            className={`nc-btn-unit ${unitId === u.id ? "is-active" : ""}`}
            onClick={() => setUnitId(u.id)}
            aria-pressed={unitId === u.id}
          >
            {u.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="nc-btn-add"
        onClick={addToPlate}
        disabled={!canAdd}
        aria-disabled={!canAdd}
        title={
          !selectedFood
            ? "Choisissez un aliment"
            : quantity === null
              ? "Saisissez une quantité supérieure à 0"
              : undefined
        }
      >
        + Ajouter
      </button>

      <p className="nc-feedback" role="status" aria-live="polite">
        {!selectedFood && "Sélectionnez un aliment, puis saisissez une quantité et une unité."}
        {selectedFood && quantity === null && calc.display !== "Erreur" && "Indiquez une quantité supérieure à 0."}
        {selectedFood && calc.display === "Erreur" && "Calcul invalide — touchez C pour réinitialiser."}
      </p>

      <div className="nc-calc">
        <p className="nc-calc__label">Quantité</p>
        <div className="nc-calc__display" aria-live="polite">
          {calc.display}
        </div>
        <div className="nc-calc__grid">
          <button type="button" className="nc-calc__btn nc-calc__btn--c" onClick={() => handleKey("C")}>
            C
          </button>
          <button type="button" className="nc-calc__btn nc-calc__btn--op" onClick={() => handleKey("÷")}>
            ÷
          </button>
          <button type="button" className="nc-calc__btn nc-calc__btn--op" onClick={() => handleKey("×")}>
            ×
          </button>
          <button type="button" className="nc-calc__btn nc-calc__btn--op" onClick={() => handleKey("-")}>
            −
          </button>

          <button type="button" className="nc-calc__btn nc-calc__btn--num" onClick={() => handleKey("7")}>
            7
          </button>
          <button type="button" className="nc-calc__btn nc-calc__btn--num" onClick={() => handleKey("8")}>
            8
          </button>
          <button type="button" className="nc-calc__btn nc-calc__btn--num" onClick={() => handleKey("9")}>
            9
          </button>
          <button type="button" className="nc-calc__btn nc-calc__btn--op" onClick={() => handleKey("+")}>
            +
          </button>

          <button type="button" className="nc-calc__btn nc-calc__btn--num" onClick={() => handleKey("4")}>
            4
          </button>
          <button type="button" className="nc-calc__btn nc-calc__btn--num" onClick={() => handleKey("5")}>
            5
          </button>
          <button type="button" className="nc-calc__btn nc-calc__btn--num" onClick={() => handleKey("6")}>
            6
          </button>
          <button type="button" className="nc-calc__btn nc-calc__btn--op" onClick={() => handleKey("-")}>
            −
          </button>

          <button type="button" className="nc-calc__btn nc-calc__btn--num" onClick={() => handleKey("1")}>
            1
          </button>
          <button type="button" className="nc-calc__btn nc-calc__btn--num" onClick={() => handleKey("2")}>
            2
          </button>
          <button type="button" className="nc-calc__btn nc-calc__btn--num" onClick={() => handleKey("3")}>
            3
          </button>
          <button type="button" className="nc-calc__btn nc-calc__btn--eq" onClick={() => handleKey("=")}>
            =
          </button>

          <button type="button" className="nc-calc__btn nc-calc__btn--num nc-calc__btn--zero" onClick={() => handleKey("0")}>
            0
          </button>
          <button type="button" className="nc-calc__btn nc-calc__btn--num" onClick={() => handleKey(".")}>
            .
          </button>
          <button type="button" className="nc-calc__btn nc-calc__btn--eq" onClick={() => handleKey("=")} aria-label="Égal">
            =
          </button>
        </div>
      </div>

      <p className="nc-hint">Saisissez une quantité, choisissez l’unité, puis + Ajouter pour alimenter l’assiette.</p>
    </div>
  );
}
