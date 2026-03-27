import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { FoodIcon } from "./FoodIcons.jsx";
import "./nutrition-calculator.css";

/** zone: plate = assiette, drink = verre, dessert = zone dessert */
const FOODS = [
  { id: "rice", name: "Riz", shortLabel: "Riz", kcalPer100: 130, zone: "plate" },
  { id: "spaghetti", name: "Spaghettis", shortLabel: "Spaghettis", kcalPer100: 158, zone: "plate" },
  { id: "fries", name: "Frites", shortLabel: "Frites", kcalPer100: 312, zone: "plate" },
  { id: "carrot", name: "Carotte", shortLabel: "Carotte", kcalPer100: 41, zone: "plate" },
  { id: "tomato", name: "Tomate", shortLabel: "Tomate", kcalPer100: 18, zone: "plate" },
  { id: "zucchini", name: "Courgette", shortLabel: "Courgette", kcalPer100: 17, zone: "plate" },
  { id: "broccoli", name: "Brocoli", shortLabel: "Brocoli", kcalPer100: 34, zone: "plate" },
  { id: "egg", name: "Œuf", shortLabel: "Œuf", kcalPer100: 155, zone: "plate" },
  { id: "fish", name: "Poisson", shortLabel: "Poisson", kcalPer100: 150, zone: "plate" },
  { id: "chicken", name: "Cuisse de poulet", shortLabel: "Poulet", kcalPer100: 165, zone: "plate" },
  { id: "steak", name: "Steak", shortLabel: "Steak", kcalPer100: 250, zone: "plate" },
  { id: "milk", name: "Lait", shortLabel: "Lait", kcalPer100: 42, perVolume: true, zone: "drink" },
  { id: "coca", name: "Coca", shortLabel: "Coca", kcalPer100: 42, perVolume: true, zone: "drink" },
  { id: "chocolate", name: "Chocolat chaud", shortLabel: "Chocolat", kcalPer100: 77, perVolume: true, zone: "drink" },
  { id: "water", name: "Eau", shortLabel: "Eau", kcalPer100: 0, perVolume: true, zone: "drink" },
  { id: "coffee", name: "Café", shortLabel: "Café", kcalPer100: 2, perVolume: true, zone: "drink" },
  { id: "yogurt", name: "Yaourt", shortLabel: "Yaourt", kcalPer100: 59, zone: "dessert" },
  { id: "fruit", name: "Fruit", shortLabel: "Fruit", kcalPer100: 52, zone: "dessert" },
  { id: "gateau", name: "Gâteau", shortLabel: "Gâteau", kcalPer100: 320, zone: "dessert" },
  { id: "dessert", name: "Dessert", shortLabel: "Dessert", kcalPer100: 320, zone: "dessert" },
];

/** Catégories : une page swipe par entrée (tabs + carrousel) */
const FOOD_ROWS = [
  { key: "starches", label: "Féculents", tabLabel: "Féculents", ids: ["rice", "spaghetti", "fries"] },
  { key: "vegetables", label: "Légumes", tabLabel: "Légumes", ids: ["carrot", "tomato", "zucchini", "broccoli"] },
  { key: "protein", label: "Protéines", tabLabel: "Protéines", ids: ["egg", "fish", "chicken", "steak"] },
  { key: "drinks", label: "Boissons", tabLabel: "Boissons", ids: ["milk", "coca", "chocolate", "water", "coffee"] },
  { key: "sweet", label: "Dessert", tabLabel: "Dessert", ids: ["yogurt", "fruit", "gateau", "dessert"] },
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

function foodById(id) {
  return FOODS.find((f) => f.id === id);
}

export function NutritionCalculator() {
  const [selectedId, setSelectedId] = useState(null);
  const [unitId, setUnitId] = useState("g");
  const [items, setItems] = useState([]);
  const [calc, dispatch] = useReducer(calcReducer, calcInitial);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const pickerScrollRef = useRef(null);
  const scrollSettleRef = useRef(null);

  const selectedFood = useMemo(() => (selectedId ? foodById(selectedId) : null), [selectedId]);
  const unit = useMemo(() => UNITS.find((u) => u.id === unitId) ?? UNITS[0], [unitId]);

  const plateItems = useMemo(() => items.filter((i) => i.zone === "plate"), [items]);
  const drinkItems = useMemo(() => items.filter((i) => i.zone === "drink"), [items]);
  const dessertItems = useMemo(() => items.filter((i) => i.zone === "dessert"), [items]);

  const totalKcal = useMemo(() => items.reduce((s, p) => s + p.kcal, 0), [items]);
  const animatedTotal = useAnimatedKcal(totalKcal);

  const plateKcalSum = useMemo(() => plateItems.reduce((s, p) => s + p.kcal, 0), [plateItems]);
  const drinkKcalSum = useMemo(() => drinkItems.reduce((s, p) => s + p.kcal, 0), [drinkItems]);

  const drinkMilkOnly = useMemo(
    () => drinkItems.length > 0 && drinkItems.every((i) => i.foodId === "milk"),
    [drinkItems]
  );

  const plateFill = useMemo(() => Math.min(1, plateKcalSum / 500), [plateKcalSum]);
  const drinkFill = useMemo(() => Math.min(1, drinkKcalSum / 250), [drinkKcalSum]);
  const dessertFill = useMemo(() => Math.min(1, dessertItems.length / 4), [dessertItems.length]);

  const quantity = useMemo(() => parseQuantityFromDisplay(calc.display), [calc.display]);
  const canAdd = Boolean(selectedFood && quantity !== null);

  const syncCategoryFromScroll = useCallback(() => {
    const el = pickerScrollRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0) return;
    const idx = Math.round(el.scrollLeft / w);
    const next = Math.max(0, Math.min(FOOD_ROWS.length - 1, idx));
    setCategoryIndex((c) => (c !== next ? next : c));
  }, []);

  useEffect(() => {
    const el = pickerScrollRef.current;
    if (!el) return;
    const onScrollEnd = () => syncCategoryFromScroll();
    const onScroll = () => {
      if (scrollSettleRef.current) clearTimeout(scrollSettleRef.current);
      scrollSettleRef.current = setTimeout(onScrollEnd, 72);
    };
    el.addEventListener("scrollend", onScrollEnd);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scrollend", onScrollEnd);
      el.removeEventListener("scroll", onScroll);
      if (scrollSettleRef.current) clearTimeout(scrollSettleRef.current);
    };
  }, [syncCategoryFromScroll]);

  useEffect(() => {
    const el = pickerScrollRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      if (w <= 0) return;
      const target = categoryIndex * w;
      if (Math.abs(el.scrollLeft - target) > 2) {
        el.scrollTo({ left: target, behavior: "auto" });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [categoryIndex]);

  const goToCategory = useCallback((i) => {
    const el = pickerScrollRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollTo({ left: i * w, behavior: "smooth" });
    setCategoryIndex(i);
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
    setSelectedId(null);
    setUnitId("g");
    dispatch({ type: "clear" });
  }, []);

  const addItem = useCallback(() => {
    if (!selectedFood) return;
    const qty = parseQuantityFromDisplay(calc.display);
    if (qty === null) return;
    const baseAmount = unit.toGrams(qty);
    const kcal = (selectedFood.kcalPer100 * baseAmount) / 100;
    const rounded = Math.round(kcal * 10) / 10;
    const label = `${selectedFood.name} · ${qty} ${unit.label}`;
    setItems((p) => [
      ...p,
      {
        id: `${Date.now()}-${p.length}`,
        foodId: selectedFood.id,
        zone: selectedFood.zone,
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

        <div className="nc-meal-stage" aria-hidden="true">
          {/* Verre — boissons */}
          <div className="nc-slot nc-slot--glass">
            <span className="nc-slot__label">Verre</span>
            <div
              className={`nc-glass ${drinkMilkOnly ? "nc-glass--milk" : ""}`}
              style={{ "--nc-drink-fill": drinkFill }}
            >
              <div className="nc-glass__liquid" />
              <div className="nc-glass__icons">
                {drinkItems.length === 0 ? (
                  <span className="nc-slot__empty">Boisson</span>
                ) : (
                  drinkItems.map((item) => (
                    <div key={item.id} className="nc-slot-chip nc-slot-chip--glass" title={item.label}>
                      <span className="nc-slot-chip__icon nc-slot-chip__icon--lg">
                        <FoodIcon name={item.foodId ?? "milk"} size="lg" />
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Assiette — repas */}
          <div className="nc-slot nc-slot--plate">
            <span className="nc-slot__label">Assiette</span>
            <div
              className={`nc-plate ${plateItems.length > 0 ? "nc-plate--has-food" : ""}`}
              style={{ "--nc-plate-fill": plateFill }}
            >
              <div className="nc-plate__fill" />
              <div className="nc-plate__inner">
                {plateItems.length === 0 ? (
                  <span className="nc-plate__hint">Ajoutez un aliment</span>
                ) : (
                  <div
                    className={`nc-plate-chips ${plateItems.length > 4 ? "nc-plate-chips--compact" : ""}`}
                    role="list"
                  >
                    {plateItems.map((item) => (
                      <div key={item.id} className="nc-plate-chip" role="listitem" title={item.label}>
                        <span className="nc-plate-chip__icon" aria-hidden>
                          <FoodIcon name={item.foodId ?? "broccoli"} size="lg" />
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Zone dessert */}
          <div className="nc-slot nc-slot--dessert">
            <span className="nc-slot__label">Dessert</span>
            <div className="nc-dessert-zone" style={{ "--nc-dessert-fill": dessertFill }}>
              <div className="nc-dessert-zone__inner">
                {dessertItems.length === 0 ? (
                  <span className="nc-slot__empty">Dessert</span>
                ) : (
                  dessertItems.map((item) => {
                    const df = foodById(item.foodId);
                    const dlabel = df?.shortLabel ?? "Dessert";
                    return (
                      <div key={item.id} className="nc-slot-chip nc-slot-chip--dessert" title={item.label}>
                        <span className="nc-slot-chip__icon nc-slot-chip__icon--lg">
                          <FoodIcon name={item.foodId ?? "dessert"} size="lg" />
                        </span>
                        <span className="nc-slot-chip__name">{dlabel}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        <ul className="nc-plate-sr" aria-live="polite">
          {items.map((item) => (
            <li key={item.id}>
              {item.label} : {item.kcal} kcal
            </li>
          ))}
        </ul>

        <button type="button" className="nc-btn-clear" onClick={clearAll}>
          Tout vider
        </button>
      </div>

      <div className="nc-picker-premium" role="region" aria-label="Choisir des aliments par catégorie">
        <div className="nc-picker-premium__head">
          <div className="nc-cat-tabs" role="tablist" aria-label="Catégories d’aliments">
            {FOOD_ROWS.map((row, i) => (
              <button
                key={row.key}
                type="button"
                role="tab"
                id={`nc-tab-${row.key}`}
                aria-selected={categoryIndex === i}
                aria-controls={`nc-panel-${row.key}`}
                className={`nc-cat-tab ${categoryIndex === i ? "is-active" : ""}`}
                onClick={() => goToCategory(i)}
              >
                {row.tabLabel}
              </button>
            ))}
          </div>
        </div>

        <div className="nc-picker-premium__viewport">
          <div
            ref={pickerScrollRef}
            className="nc-picker-carousel"
            aria-label="Glisser pour changer de catégorie"
          >
            {FOOD_ROWS.map((row, i) => (
              <div
                key={row.key}
                id={`nc-panel-${row.key}`}
                role="tabpanel"
                aria-labelledby={`nc-tab-${row.key}`}
                className="nc-picker-page"
                aria-hidden={categoryIndex !== i}
              >
                <p className="nc-plate-sr">{row.label}</p>
                <div className="nc-picker-page__grid">
                  {row.ids.map((fid) => {
                    const f = foodById(fid);
                    if (!f) return null;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        className={`nc-food ${selectedId === f.id ? "is-selected" : ""}`}
                        onClick={() => setSelectedId(f.id)}
                        aria-pressed={selectedId === f.id}
                        aria-label={f.name}
                      >
                        <span className="nc-food__icon">
                          <FoodIcon name={f.id} />
                        </span>
                        <span className="nc-food__name">{f.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="nc-picker-dots" aria-hidden="true">
          {FOOD_ROWS.map((row, i) => (
            <button
              key={row.key}
              type="button"
              className={`nc-picker-dot ${categoryIndex === i ? "is-active" : ""}`}
              onClick={() => goToCategory(i)}
              aria-label={`Catégorie ${row.label}`}
            />
          ))}
        </div>
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
        onClick={addItem}
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

      <p
        className={`nc-feedback${
          selectedFood && calc.display === "Erreur"
            ? " nc-feedback--error"
            : selectedFood && quantity === null && calc.display !== "Erreur"
              ? " nc-feedback--ok"
              : ""
        }`}
        role="status"
        aria-live="polite"
      >
        {!selectedFood && "Choisissez une catégorie, un aliment, puis la quantité et l’unité."}
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
          <span className="nc-calc__grid-spacer" aria-hidden="true" />
        </div>
      </div>

      <p className="nc-hint">
        Changez de catégorie en glissant. Boissons → verre, dessert → zone à droite, le reste → assiette.
      </p>
    </div>
  );
}
