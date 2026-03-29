import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { FoodIcon } from "./FoodIcons.jsx";
import "./nutrition-calculator.css";

/** zone: plate = assiette, drink = verre, dessert = zone dessert — kcal pour le calcul final uniquement */
/** defaultUnit: unité auto-sélectionnée quand on choisit cet aliment */
const FOODS = [
  /* Féculents — grammes */
  { id: "rice", name: "Riz", shortLabel: "Riz", kcalPer100: 130, zone: "plate", defaultUnit: "g" },
  { id: "spaghetti", name: "Pâtes", shortLabel: "Pâtes", kcalPer100: 158, zone: "plate", defaultUnit: "g" },
  { id: "fries", name: "Frites", shortLabel: "Frites", kcalPer100: 312, zone: "plate", defaultUnit: "g" },
  { id: "potato", name: "Pommes de terre", shortLabel: "Pommes de terre", kcalPer100: 77, zone: "plate", defaultUnit: "g" },
  { id: "quinoa", name: "Quinoa", shortLabel: "Quinoa", kcalPer100: 120, zone: "plate", defaultUnit: "g" },
  { id: "semoule", name: "Semoule", shortLabel: "Semoule", kcalPer100: 360, zone: "plate", defaultUnit: "g" },
  { id: "bread", name: "Pain", shortLabel: "Pain", kcalPer100: 265, zone: "plate", defaultUnit: "g" },
  { id: "sweet_potato", name: "Patate douce", shortLabel: "Patate douce", kcalPer100: 86, zone: "plate", defaultUnit: "g" },
  /* Légumes — grammes */
  { id: "broccoli", name: "Brocoli", shortLabel: "Brocoli", kcalPer100: 34, zone: "plate", defaultUnit: "g" },
  { id: "carrot", name: "Carotte", shortLabel: "Carotte", kcalPer100: 41, zone: "plate", defaultUnit: "g" },
  { id: "tomato", name: "Tomate", shortLabel: "Tomate", kcalPer100: 18, zone: "plate", defaultUnit: "g" },
  { id: "zucchini", name: "Courgette", shortLabel: "Courgette", kcalPer100: 17, zone: "plate", defaultUnit: "g" },
  { id: "pepper", name: "Poivron", shortLabel: "Poivron", kcalPer100: 31, zone: "plate", defaultUnit: "g" },
  { id: "green_beans", name: "Haricots verts", shortLabel: "Haricots verts", kcalPer100: 31, zone: "plate", defaultUnit: "g" },
  { id: "eggplant", name: "Aubergine", shortLabel: "Aubergine", kcalPer100: 25, zone: "plate", defaultUnit: "g" },
  { id: "cucumber", name: "Concombre", shortLabel: "Concombre", kcalPer100: 16, zone: "plate", defaultUnit: "g" },
  /* Protéines — grammes */
  { id: "chicken", name: "Poulet", shortLabel: "Poulet", kcalPer100: 165, zone: "plate", defaultUnit: "g" },
  { id: "steak", name: "Steak", shortLabel: "Steak", kcalPer100: 250, zone: "plate", defaultUnit: "g" },
  { id: "fish", name: "Poisson", shortLabel: "Poisson", kcalPer100: 150, zone: "plate", defaultUnit: "g" },
  { id: "egg", name: "Œuf", shortLabel: "Œuf", kcalPer100: 155, zone: "plate", defaultUnit: "g" },
  { id: "turkey", name: "Dinde", shortLabel: "Dinde", kcalPer100: 135, zone: "plate", defaultUnit: "g" },
  { id: "salmon", name: "Saumon", shortLabel: "Saumon", kcalPer100: 208, zone: "plate", defaultUnit: "g" },
  { id: "tuna", name: "Thon", shortLabel: "Thon", kcalPer100: 130, zone: "plate", defaultUnit: "g" },
  { id: "tofu", name: "Tofu", shortLabel: "Tofu", kcalPer100: 76, zone: "plate", defaultUnit: "g" },
  /* Boissons — ml pour verre, cl pour canette */
  { id: "water", name: "Eau", shortLabel: "Eau", kcalPer100: 0, perVolume: true, zone: "drink", defaultUnit: "ml" },
  { id: "milk", name: "Lait", shortLabel: "Lait", kcalPer100: 42, perVolume: true, zone: "drink", defaultUnit: "ml" },
  { id: "juice", name: "Jus", shortLabel: "Jus", kcalPer100: 45, perVolume: true, zone: "drink", defaultUnit: "ml" },
  { id: "soda", name: "Soda", shortLabel: "Soda", kcalPer100: 42, perVolume: true, zone: "drink", defaultUnit: "cl" },
  { id: "coffee", name: "Café", shortLabel: "Café", kcalPer100: 2, perVolume: true, zone: "drink", defaultUnit: "ml" },
  { id: "tea", name: "Thé", shortLabel: "Thé", kcalPer100: 1, perVolume: true, zone: "drink", defaultUnit: "ml" },
  { id: "smoothie", name: "Smoothie", shortLabel: "Smoothie", kcalPer100: 60, perVolume: true, zone: "drink", defaultUnit: "ml" },
  { id: "energy_drink", name: "Boisson énergétique", shortLabel: "Boisson énergétique", kcalPer100: 45, perVolume: true, zone: "drink", defaultUnit: "cl" },
  /* Desserts — grammes */
  { id: "cake", name: "Gâteau", shortLabel: "Gâteau", kcalPer100: 320, zone: "dessert", defaultUnit: "g" },
  { id: "fruit", name: "Fruit", shortLabel: "Fruit", kcalPer100: 52, zone: "dessert", defaultUnit: "g" },
  { id: "yogurt", name: "Yaourt", shortLabel: "Yaourt", kcalPer100: 59, zone: "dessert", defaultUnit: "g" },
  { id: "chocolate_bar", name: "Chocolat", shortLabel: "Chocolat", kcalPer100: 545, zone: "dessert", defaultUnit: "g" },
  { id: "ice_cream", name: "Glace", shortLabel: "Glace", kcalPer100: 207, zone: "dessert", defaultUnit: "g" },
  { id: "biscuit", name: "Biscuit", shortLabel: "Biscuit", kcalPer100: 480, zone: "dessert", defaultUnit: "g" },
  { id: "pancake", name: "Pancake", shortLabel: "Pancake", kcalPer100: 227, zone: "dessert", defaultUnit: "g" },
  { id: "muffin", name: "Muffin", shortLabel: "Muffin", kcalPer100: 377, zone: "dessert", defaultUnit: "g" },
];

/** Unité par défaut par catégorie (utilisée au changement d'onglet) */
const CATEGORY_DEFAULT_UNIT = {
  starches: "g",
  vegetables: "g",
  protein: "g",
  drinks: "ml",
  sweet: "g",
};

/** Catégories : 8 aliments chacune, grille unique (pas de carrousel interne) */
const FOOD_ROWS = [
  {
    key: "starches",
    label: "Féculents",
    tabLabel: "Féculents",
    ids: ["rice", "spaghetti", "fries", "potato", "quinoa", "semoule", "bread", "sweet_potato"],
  },
  {
    key: "vegetables",
    label: "Légumes",
    tabLabel: "Légumes",
    ids: ["broccoli", "carrot", "tomato", "zucchini", "pepper", "green_beans", "eggplant", "cucumber"],
  },
  {
    key: "protein",
    label: "Protéines",
    tabLabel: "Protéines",
    ids: ["chicken", "steak", "fish", "egg", "turkey", "salmon", "tuna", "tofu"],
  },
  {
    key: "drinks",
    label: "Boissons",
    tabLabel: "Boissons",
    ids: ["water", "milk", "juice", "soda", "coffee", "tea", "smoothie", "energy_drink"],
  },
  {
    key: "sweet",
    label: "Desserts",
    tabLabel: "Desserts",
    ids: ["cake", "fruit", "yogurt", "chocolate_bar", "ice_cream", "biscuit", "pancake", "muffin"],
  },
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
  const [lastAddedId, setLastAddedId] = useState(null);
  const [calc, dispatch] = useReducer(calcReducer, calcInitial);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [hasPickedTab, setHasPickedTab] = useState(false);
  const [unitHintDone, setUnitHintDone] = useState(false);
  const [demoCycle, setDemoCycle] = useState(0);
  const demoActiveRef = useRef(true);
  const demoTimersRef = useRef([]);
  const pickerScrollRef = useRef(null);
  const scrollSettleRef = useRef(null);
  const landTimerRef = useRef(null);

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
  const dessertFill = useMemo(() => Math.min(1, dessertItems.length / 8), [dessertItems.length]);

  const quantity = useMemo(() => parseQuantityFromDisplay(calc.display), [calc.display]);
  const canAdd = Boolean(selectedFood && quantity !== null);

  useEffect(() => {
    if (!selectedId) { setUnitHintDone(false); return; }
    const t = setTimeout(() => setUnitHintDone(true), 2000);
    return () => clearTimeout(t);
  }, [selectedId]);

  const isDemo = demoCycle >= 0;

  const guideStep = useMemo(() => {
    if (isDemo) return 0;
    if (items.length > 0 && !selectedId) return 7;
    if (!selectedId && !hasPickedTab) return 1;
    if (!selectedId && hasPickedTab) return 2;
    if (selectedId && !unitHintDone && calc.display === "0" && calc.fresh) return 3;
    if (selectedId && quantity === null) return 4;
    if (selectedId && quantity !== null) return 5;
    return 0;
  }, [isDemo, selectedId, hasPickedTab, items.length, unitHintDone, calc.display, calc.fresh, quantity]);

  const showEqPulse = !!lastAddedId;
  const showHeartbeat = items.length > 0;

  const syncCategoryFromScroll = useCallback(() => {
    const el = pickerScrollRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0) return;
    const idx = Math.round(el.scrollLeft / w);
    const next = Math.max(0, Math.min(FOOD_ROWS.length - 1, idx));
    setCategoryIndex((prev) => {
      if (prev !== next) {
        const row = FOOD_ROWS[next];
        if (row) {
          const catUnit = CATEGORY_DEFAULT_UNIT[row.key];
          if (catUnit) setUnitId(catUnit);
        }
      }
      return next;
    });
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
    return () => {
      if (landTimerRef.current) window.clearTimeout(landTimerRef.current);
    };
  }, []);

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
    setHasPickedTab(true);
    const row = FOOD_ROWS[i];
    if (row) {
      const catUnit = CATEGORY_DEFAULT_UNIT[row.key];
      if (catUnit) setUnitId(catUnit);
    }
  }, []);

  const clearAll = useCallback(() => {
    if (landTimerRef.current) window.clearTimeout(landTimerRef.current);
    landTimerRef.current = null;
    setLastAddedId(null);
    setItems([]);
    setSelectedId(null);
    setUnitId("g");
    setHasPickedTab(false);
    setUnitHintDone(false);
    dispatch({ type: "clear" });
  }, []);

  const stopDemo = useCallback(() => {
    demoActiveRef.current = false;
    demoTimersRef.current.forEach(clearTimeout);
    demoTimersRef.current = [];
    setDemoCycle(-1);
    if (landTimerRef.current) window.clearTimeout(landTimerRef.current);
    landTimerRef.current = null;
    setLastAddedId(null);
    setItems([]);
    setSelectedId(null);
    setUnitId("g");
    setHasPickedTab(false);
    setUnitHintDone(false);
    dispatch({ type: "clear" });
  }, []);

  useEffect(() => {
    if (demoCycle < 0) return;
    demoActiveRef.current = true;
    const timers = [];
    const q = (fn, ms) => {
      const id = setTimeout(() => { if (demoActiveRef.current) fn(); }, ms);
      timers.push(id);
    };
    demoTimersRef.current = timers;

    const demoAdd = (foodId, zone, qty, unitLabel, delay) => {
      q(() => {
        const food = foodById(foodId);
        if (!food) return;
        const kcal = Math.round((food.kcalPer100 * qty) / 100 * 10) / 10;
        const id = `demo-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        setItems((p) => [...p, { id, foodId, zone, label: `${food.name} · ${qty} ${unitLabel}`, kcal }]);
        setLastAddedId(id);
        dispatch({ type: "clear" });
        setSelectedId(null);
        const lid = setTimeout(() => { if (demoActiveRef.current) setLastAddedId(null); }, 720);
        timers.push(lid);
      }, delay);
    };

    let d = 600;

    q(() => goToCategory(2), d); d += 1100;
    q(() => { setSelectedId("chicken"); setUnitId("g"); }, d); d += 900;
    q(() => dispatch({ type: "digit", d: "1" }), d); d += 300;
    q(() => dispatch({ type: "digit", d: "5" }), d); d += 300;
    q(() => dispatch({ type: "digit", d: "0" }), d); d += 800;
    demoAdd("chicken", "plate", 150, "g", d); d += 1800;

    q(() => goToCategory(1), d); d += 1100;
    q(() => { setSelectedId("broccoli"); setUnitId("g"); }, d); d += 900;
    q(() => dispatch({ type: "digit", d: "2" }), d); d += 300;
    q(() => dispatch({ type: "digit", d: "0" }), d); d += 300;
    q(() => dispatch({ type: "digit", d: "0" }), d); d += 800;
    demoAdd("broccoli", "plate", 200, "g", d); d += 1800;

    q(() => goToCategory(3), d); d += 1100;
    q(() => { setSelectedId("juice"); setUnitId("ml"); }, d); d += 900;
    q(() => dispatch({ type: "digit", d: "2" }), d); d += 300;
    q(() => dispatch({ type: "digit", d: "5" }), d); d += 300;
    q(() => dispatch({ type: "digit", d: "0" }), d); d += 800;
    demoAdd("juice", "drink", 250, "ml", d); d += 1800;

    q(() => goToCategory(4), d); d += 1100;
    q(() => { setSelectedId("cake"); setUnitId("g"); }, d); d += 900;
    q(() => dispatch({ type: "digit", d: "8" }), d); d += 300;
    q(() => dispatch({ type: "digit", d: "0" }), d); d += 800;
    demoAdd("cake", "dessert", 80, "g", d); d += 3000;

    q(() => {
      setItems([]);
      setSelectedId(null);
      setUnitId("g");
      setLastAddedId(null);
      setHasPickedTab(false);
      dispatch({ type: "clear" });
      const rid = setTimeout(() => {
        if (demoActiveRef.current) setDemoCycle((c) => c + 1);
      }, 2000);
      timers.push(rid);
    }, d);

    return () => { timers.forEach(clearTimeout); };
  }, [demoCycle]);

  const addItem = useCallback(() => {
    if (!selectedFood) return;
    const qty = parseQuantityFromDisplay(calc.display);
    if (qty === null) return;
    const baseAmount = unit.toGrams(qty);
    const kcal = (selectedFood.kcalPer100 * baseAmount) / 100;
    const rounded = Math.round(kcal * 10) / 10;
    const label = `${selectedFood.name} · ${qty} ${unit.label}`;
    const newId = `meal-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setItems((p) => [
      ...p,
      {
        id: newId,
        foodId: selectedFood.id,
        zone: selectedFood.zone,
        label,
        kcal: rounded,
      },
    ]);
    if (landTimerRef.current) window.clearTimeout(landTimerRef.current);
    setLastAddedId(newId);
    landTimerRef.current = window.setTimeout(() => {
      setLastAddedId(null);
      landTimerRef.current = null;
    }, 720);
    dispatch({ type: "clear" });
  }, [calc.display, selectedFood, unit]);

  const handleKey = (key) => {
    if (key === "C") dispatch({ type: "clear" });
    else if ("0123456789.".includes(key)) dispatch({ type: "digit", d: key });
    else if (key === "+" || key === "-" || key === "×" || key === "÷") dispatch({ type: "op", op: key });
    else if (key === "=") dispatch({ type: "eq" });
  };

  return (
    <div className="nc" onPointerDown={isDemo ? stopDemo : undefined}>
      {isDemo && (
        <div className="nc-demo-badge">
          <span className="nc-demo-badge__dot" />
          Démo auto — touche pour essayer
        </div>
      )}
      <div className={`nc-plate-card${lastAddedId ? " nc-plate-card--bump" : ""}`}>
        <p className="nc-plate-card__total">
          Total : <strong className={`nc-total-kcal${showHeartbeat ? " nc-total-heartbeat" : ""}`}>{Math.round(animatedTotal * 10) / 10}</strong> kcal
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
                    <div
                      key={item.id}
                      className={`nc-slot-chip nc-slot-chip--glass${item.id === lastAddedId ? " nc-slot-chip--land" : ""}`}
                      title={item.label}
                    >
                      <span className="nc-slot-chip__icon nc-slot-chip__icon--lg nc-food-icon-3d">
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
                    className={`nc-plate-chips${plateItems.length > 6 ? " nc-plate-chips--compact" : ""}`}
                    role="list"
                  >
                    {plateItems.map((item) => (
                      <div
                        key={item.id}
                        className={`nc-plate-chip${item.id === lastAddedId ? " nc-plate-chip--land" : ""}`}
                        role="listitem"
                        title={item.label}
                      >
                        <span className="nc-plate-chip__icon nc-food-icon-3d" aria-hidden>
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
                      <div
                        key={item.id}
                        className={`nc-slot-chip nc-slot-chip--dessert${item.id === lastAddedId ? " nc-slot-chip--land" : ""}`}
                        title={item.label}
                      >
                        <span className="nc-slot-chip__icon nc-slot-chip__icon--lg nc-food-icon-3d">
                          <FoodIcon name={item.foodId ?? "cake"} size="lg" />
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
          {guideStep === 1 && (
            <p className="nc-guide nc-guide--category">Choisis une catégorie</p>
          )}
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

        {guideStep === 2 && (
          <p className="nc-guide nc-guide--food">Choisis un aliment</p>
        )}
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
                <div className="nc-food-strip">
                  {row.ids.map((fid) => {
                    const f = foodById(fid);
                    if (!f) return null;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        className={`nc-food nc-food--picker ${selectedId === f.id ? "is-selected" : ""}`}
                        onClick={() => {
                          setSelectedId(f.id);
                          if (f.defaultUnit) setUnitId(f.defaultUnit);
                        }}
                        aria-pressed={selectedId === f.id}
                        aria-label={f.name}
                      >
                        <span className="nc-food__icon nc-food__icon--picker">
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
      </div>

      {guideStep === 3 && (
        <p className="nc-guide nc-guide--unit">Choisis l’unité</p>
      )}
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
        className={`nc-btn-add${guideStep === 5 ? " nc-btn-add--pulse" : ""}`}
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

      {guideStep === 4 && (
        <p className="nc-guide nc-guide--quantity">Saisis la quantité</p>
      )}
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
          <button type="button" className={`nc-calc__btn nc-calc__btn--eq${showEqPulse ? " nc-calc__btn--eq-pulse" : ""}`} onClick={() => handleKey("=")}>
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
