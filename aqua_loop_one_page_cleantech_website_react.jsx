import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Droplets,
  Recycle,
  Cpu,
  Gauge,
  Sun,
  CloudRain,
  ShieldCheck,
  Trees,
  Leaf,
  Banknote,
  Building2,
  Users,
  MapPin,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// =====================
// AquaLoop — premium cleantech one‑page site
// Single-file React component (Tailwind + Framer Motion + Recharts)
// =====================

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const fmtInt = (n: number) => Math.round(n).toLocaleString("ru-RU");
const fmtMoney = (n: number, currency = "₽") =>
  `${Math.round(n).toLocaleString("ru-RU")} ${currency}`;

type Region = "normal" | "remote";

function glassClass(extra = "") {
  return `bg-white/8 backdrop-blur-xl border border-white/12 shadow-[0_20px_80px_rgba(0,0,0,0.35)] ${extra}`;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-3 py-1 text-xs text-white/85">
      {children}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <div className="mb-3 flex justify-center">
        <Pill>
          <Sparkles className="h-4 w-4" />
          {eyebrow}
        </Pill>
      </div>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-pretty text-base leading-relaxed text-white/70 md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function TooltipTiny({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex items-center">
      <Info className="h-4 w-4 text-white/55" />
      <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-xl border border-white/12 bg-black/70 px-3 py-2 text-xs leading-relaxed text-white/85 opacity-0 shadow-xl backdrop-blur-xl transition-opacity group-hover:opacity-100">
        {text}
      </span>
    </span>
  );
}

function IntroOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4300);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-[#050B18]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {/* soft cinematic gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-cyan-400/12 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-[34rem] w-[34rem] rounded-full bg-blue-600/18 blur-3xl" />
        <div className="absolute inset-0 opacity-35 [background:radial-gradient(ellipse_at_top,rgba(120,255,255,0.14),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(0,120,255,0.16),transparent_50%)]" />
      </div>

      {/* droplet → loop animation */}
      <div className="relative flex w-full max-w-xl flex-col items-center px-6 text-center">
        <motion.div
          className="relative"
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <motion.svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            className="drop-shadow-[0_20px_60px_rgba(0,190,255,0.18)]"
          >
            {/* droplet body */}
            <motion.path
              d="M110 22 C110 22 78 70 78 106 C78 138 92 166 110 166 C128 166 142 138 142 106 C142 70 110 22 110 22 Z"
              fill="url(#drop)"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.95, 1, 1, 0.9],
              }}
              transition={{ duration: 2.1, times: [0, 0.15, 0.75, 1] }}
            />

            {/* splash ripple */}
            <motion.circle
              cx="110"
              cy="166"
              r="12"
              fill="none"
              stroke="rgba(110, 245, 255, 0.65)"
              strokeWidth="2"
              initial={{ opacity: 0, r: 8 }}
              animate={{ opacity: [0, 0, 1, 0], r: [8, 8, 52, 66] }}
              transition={{ duration: 2.2, times: [0, 0.55, 0.78, 1] }}
            />

            {/* loop ring */}
            <motion.circle
              cx="110"
              cy="110"
              r="68"
              fill="none"
              stroke="url(#ring)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="420"
              initial={{ strokeDashoffset: 420, opacity: 0 }}
              animate={{
                opacity: [0, 0, 1, 1],
                strokeDashoffset: [420, 420, 140, 0],
              }}
              transition={{ duration: 2.8, times: [0, 0.35, 0.7, 1], ease: "easeInOut" }}
            />

            {/* circulating dots */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx="110"
                cy="42"
                r="4"
                fill="rgba(160,255,255,0.85)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0, 1, 1],
                  rotate: 360,
                }}
                style={{
                  transformOrigin: "110px 110px",
                }}
                transition={{
                  opacity: { duration: 1.6, delay: 1.25 },
                  rotate: {
                    duration: 1.9,
                    delay: 1.65 + i * 0.1,
                    ease: "linear",
                    repeat: 1,
                  },
                }}
              />
            ))}

            <defs>
              <linearGradient id="drop" x1="78" y1="20" x2="152" y2="170">
                <stop offset="0%" stopColor="rgba(140,255,255,0.95)" />
                <stop offset="45%" stopColor="rgba(20,200,255,0.85)" />
                <stop offset="100%" stopColor="rgba(0,90,200,0.85)" />
              </linearGradient>
              <linearGradient id="ring" x1="40" y1="42" x2="180" y2="180">
                <stop offset="0%" stopColor="rgba(120,255,255,0.95)" />
                <stop offset="60%" stopColor="rgba(10,190,255,0.85)" />
                <stop offset="100%" stopColor="rgba(0,85,220,0.9)" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* logo reveal */}
          <motion.div
            className="mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0, 1], y: [10, 10, 0] }}
            transition={{ duration: 1.2, times: [0, 0.5, 1], delay: 2.1 }}
          >
            <div className="mx-auto inline-flex items-center gap-3 rounded-2xl border border-white/12 bg-white/5 px-5 py-3 backdrop-blur-xl">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20">
                <Recycle className="h-5 w-5 text-white/90" />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold tracking-tight text-white">
                  AquaLoop
                </div>
                <div className="text-xs text-white/65">Closed-loop Water System</div>
              </div>
            </div>
            <div className="mt-4 text-sm tracking-wide text-white/80 md:text-base">
              “Closing the Water Loop. Saving the Future.”
            </div>
          </motion.div>
        </motion.div>

        {/* progress hint */}
        <motion.div
          className="mt-10 h-1 w-56 overflow-hidden rounded-full bg-white/8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full w-full bg-gradient-to-r from-cyan-300/90 to-blue-500/90"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* film grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22140%22%20height=%22140%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.8%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22140%22%20height=%22140%22%20filter=%22url(%23n)%22%20opacity=%220.4%22/%3E%3C/svg%3E')]" />
    </motion.div>
  );
}

function StickyImpactBar({
  liters,
  co2Kg,
}: {
  liters: number;
  co2Kg: number;
}) {
  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="border-b border-white/10 bg-[#050B18]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-white/85">
            <Droplets className="h-4 w-4 text-cyan-200" />
            <span className="text-white/70">Мы уже сэкономили:</span>
            <span className="font-semibold tracking-tight text-white">
              {fmtInt(liters)} литров воды
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/70">
            <span className="hidden items-center gap-2 md:inline-flex">
              <Leaf className="h-4 w-4" />
              CO₂ eq: <span className="font-medium text-white/85">{fmtInt(co2Kg)} кг</span>
              <span className="ml-1">(оценка)</span>
            </span>
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-3 py-1 text-white/90 hover:bg-white/10"
            >
              Рассчитать эффект <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavBar() {
  const links = [
    { id: "problem", label: "Проблема" },
    { id: "how", label: "Как работает" },
    { id: "calculator", label: "Калькулятор" },
    { id: "model", label: "Модель" },
    { id: "impact", label: "Эффект" },
    { id: "cta", label: "Контакт" },
  ];
  return (
    <div className="pointer-events-none fixed left-0 right-0 top-[52px] z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/15 to-blue-600/15 ring-1 ring-white/10">
            <Recycle className="h-5 w-5 text-white/90" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-white">AquaLoop</div>
            <div className="text-xs text-white/60">Water Reuse System</div>
          </div>
        </div>

        <div className="pointer-events-auto hidden items-center gap-1 rounded-2xl border border-white/10 bg-white/6 px-2 py-2 backdrop-blur-xl md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="rounded-xl px-3 py-2 text-xs font-medium text-white/75 hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            className="ml-1 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300/80 to-blue-500/80 px-4 py-2 text-xs font-semibold text-[#050B18] shadow-lg shadow-cyan-500/15 hover:opacity-95"
          >
            Получить предложение <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <a
          href="#cta"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-xl bg-white/8 px-4 py-2 text-xs font-semibold text-white/90 ring-1 ring-white/10 hover:bg-white/10 md:hidden"
        >
          CTA <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div
      className={
        "relative overflow-hidden rounded-3xl " +
        glassClass("p-6 transition-transform duration-300 hover:-translate-y-1")
      }
    >
      <div className="absolute inset-0 opacity-55 [background:radial-gradient(ellipse_at_top,rgba(120,255,255,0.12),transparent_55%)]" />
      <div className="relative">
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/18 to-blue-600/18 ring-1 ring-white/10">
          {icon}
        </div>
        <div className="text-base font-semibold text-white">{title}</div>
        <div className="mt-2 text-sm leading-relaxed text-white/70">{desc}</div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Сбор серой воды",
      icon: <Droplets className="h-5 w-5 text-white/90" />,
      detail:
        "Души и раковины → в накопительный контур. Без смешивания с чёрными стоками.",
    },
    {
      title: "Механическая фильтрация",
      icon: <Gauge className="h-5 w-5 text-white/90" />,
      detail:
        "Удаление взвесей и волос. Защита дальнейших ступеней, стабильная производительность.",
    },
    {
      title: "Биофильтр",
      icon: <Leaf className="h-5 w-5 text-white/90" />,
      detail:
        "Био-реактор снижает органическую нагрузку, уменьшая потребность в реагентах.",
    },
    {
      title: "Мембранная очистка",
      icon: <ShieldCheck className="h-5 w-5 text-white/90" />,
      detail:
        "Тонкая фильтрация для повторного использования в техн. нуждах: WC, мойка, полив.",
    },
    {
      title: "УФ‑дезинфекция",
      icon: <Sparkles className="h-5 w-5 text-white/90" />,
      detail:
        "Финальная защита: снижение микробиологических рисков перед подачей в контур.",
    },
    {
      title: "Повторное использование",
      icon: <Recycle className="h-5 w-5 text-white/90" />,
      detail:
        "Замкнутый цикл: до 60% меньше потребления чистой воды при правильной эксплуатации.",
    },
  ];

  const addons = [
    {
      title: "IoT‑датчики",
      icon: <Cpu className="h-5 w-5 text-white/90" />,
      desc: "Качество, расход, давление, уровни — мониторинг в реальном времени.",
    },
    {
      title: "Impact Dashboard",
      icon: <Gauge className="h-5 w-5 text-white/90" />,
      desc: "ESG‑метрики, отчётность для инвесторов и управляющей компании.",
    },
    {
      title: "Солнечные панели",
      icon: <Sun className="h-5 w-5 text-white/90" />,
      desc: "Опционально автономный режим для удалённых локаций.",
    },
    {
      title: "Сбор дождевой воды",
      icon: <CloudRain className="h-5 w-5 text-white/90" />,
      desc: "Дополнительный источник для техн. нужд и подпитки системы.",
    },
  ];

  return (
    <section id="how" className="relative mx-auto max-w-6xl px-4 py-20">
      <SectionTitle
        eyebrow="Технология"
        title="Как работает AquaLoop"
        subtitle="Интерактивная схема многоступенчатой очистки серой воды и повторного использования — с мониторингом и отчётностью." 
      />

      <div className="relative">
        {/* animated flow line */}
        <div className="pointer-events-none absolute left-1/2 top-10 hidden h-[2px] w-[92%] -translate-x-1/2 md:block">
          <div className="h-full w-full overflow-hidden rounded-full bg-white/8">
            <div className="h-full w-[60%] animate-flow bg-gradient-to-r from-cyan-300/0 via-cyan-300/75 to-blue-500/0" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-6">
          {steps.map((s, idx) => (
            <div
              key={s.title}
              className={
                "group relative rounded-3xl " +
                glassClass(
                  "p-5 md:p-6 md:pt-10 transition-transform duration-300 hover:-translate-y-1"
                )
              }
            >
              <div className="absolute inset-0 opacity-45 [background:radial-gradient(ellipse_at_top,rgba(120,255,255,0.10),transparent_55%)]" />
              <div className="relative">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/18 to-blue-600/18 ring-1 ring-white/10">
                  {s.icon}
                </div>
                <div className="text-sm font-semibold text-white">
                  {idx + 1}. {s.title}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">
                  {s.detail}
                </div>
                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/8">
                  <div className="h-full w-0 bg-gradient-to-r from-cyan-300/80 to-blue-500/80 transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {addons.map((a) => (
            <div
              key={a.title}
              className={
                "relative overflow-hidden rounded-3xl " +
                glassClass("p-6 transition-transform duration-300 hover:-translate-y-1")
              }
            >
              <div className="absolute inset-0 opacity-45 [background:radial-gradient(ellipse_at_top,rgba(0,160,255,0.12),transparent_55%)]" />
              <div className="relative">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/18 to-blue-600/18 ring-1 ring-white/10">
                  {a.icon}
                </div>
                <div className="text-sm font-semibold text-white">{a.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">
                  {a.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  const [rooms, setRooms] = useState(20);
  const [occupancy, setOccupancy] = useState(65);
  const [guestsPerDay, setGuestsPerDay] = useState(35);
  const [waterPerGuest, setWaterPerGuest] = useState(220);
  const [pricePerM3, setPricePerM3] = useState(120);
  const [region, setRegion] = useState<Region>("normal");
  const [capex, setCapex] = useState(0); // optional, for payback estimate
  const [currency, setCurrency] = useState("₽");

  // constants from spec
  const grayWaterRatio = 0.6;
  const recycleEfficiency = 0.7;
  const remoteMultiplier = region === "remote" ? 4 : 1;

  const computed = useMemo(() => {
    // Optional helper: if guestsPerDay is 0, infer from rooms and occupancy with 2 guests/room.
    const inferredGuests = Math.max(0, rooms) * clamp(occupancy, 0, 100) * 0.01 * 2;
    const gpd = guestsPerDay > 0 ? guestsPerDay : inferredGuests;

    const totalDaily = gpd * waterPerGuest; // liters
    const totalMonthly = totalDaily * 30;

    const grayWater = totalMonthly * grayWaterRatio;
    const recycledWater = grayWater * recycleEfficiency;
    const recycledM3 = recycledWater / 1000;

    // High tariff logic
    const limit = 250;
    let adjustedPrice = pricePerM3;
    let highTariffMultiplier = 1;
    if (waterPerGuest > limit) {
      const overuseRatio = waterPerGuest / limit;
      highTariffMultiplier = 1 + (overuseRatio - 1) * 0.5;
      adjustedPrice = pricePerM3 * highTariffMultiplier;
    }

    const basePrice = recycledM3 * adjustedPrice;
    const realSavings = basePrice * remoteMultiplier;

    const reductionPct = totalMonthly > 0 ? (recycledWater / totalMonthly) * 100 : 0;
    const waterDropPct = reductionPct; // same signal, different label

    // Ecosystem load reduction (heuristic): amplify in remote areas due to logistics + stress.
    const ecosystemLoadPct = clamp(reductionPct * (region === "remote" ? 1.15 : 1), 0, 75);

    // Payback: if capex set, else use default heuristic estimate tied to size.
    const defaultCapex = 0
      ? 0
      : Math.max(0, rooms) * 22000 + 180000; // heuristic placeholder in chosen currency

    const capexUsed = capex > 0 ? capex : defaultCapex;
    const monthlySavings = realSavings;
    const paybackMonths = monthlySavings > 0 ? capexUsed / monthlySavings : Infinity;

    // ESG index (0–100): weighted by water saved (m3) and reduction percentage.
    const esgScore = clamp((recycledM3 * 1.8 + reductionPct * 0.55) * (region === "remote" ? 1.05 : 1), 0, 100);

    // Simple CO2 eq estimate (labeled as "оценка")
    // Assumption: 0.35 kg CO2 per m³ of water (energy + logistics average). Remote factor already in savings.
    const co2Kg = recycledM3 * 0.35 * 1000 * (region === "remote" ? 1.25 : 1); // scaled for display

    return {
      inferredGuests,
      gpd,
      totalDaily,
      totalMonthly,
      grayWater,
      recycledWater,
      recycledM3,
      adjustedPrice,
      highTariffMultiplier,
      basePrice,
      realSavings,
      monthlySavings,
      reductionPct,
      waterDropPct,
      ecosystemLoadPct,
      capexUsed,
      paybackMonths,
      esgScore,
      co2Kg,
    };
  }, [rooms, occupancy, guestsPerDay, waterPerGuest, pricePerM3, region, capex]);

  const chartData = useMemo(() => {
    // Project a 12-month curve with slight seasonality (kept subtle)
    const base = computed.monthlySavings;
    const arr = Array.from({ length: 12 }).map((_, i) => {
      const season = 1 + Math.sin((i / 12) * Math.PI * 2) * 0.06;
      return {
        m: [
          "Янв",
          "Фев",
          "Мар",
          "Апр",
          "Май",
          "Июн",
          "Июл",
          "Авг",
          "Сен",
          "Окт",
          "Ноя",
          "Дек",
        ][i],
        savings: Math.max(0, base * season),
      };
    });
    return arr;
  }, [computed.monthlySavings]);

  const inputCls =
    "w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 focus:border-cyan-300/40 focus:bg-white/8";

  const metricCard = (
    title: string,
    value: string,
    hint?: string,
    icon?: React.ReactNode
  ) => (
    <div className={"relative overflow-hidden rounded-3xl " + glassClass("p-5")}> 
      <div className="absolute inset-0 opacity-45 [background:radial-gradient(ellipse_at_top,rgba(120,255,255,0.10),transparent_55%)]" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-medium text-white/70">{title}</div>
            <div className="mt-2 text-xl font-semibold tracking-tight text-white">
              {value}
            </div>
          </div>
          {icon ? (
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/18 to-blue-600/18 ring-1 ring-white/10">
              {icon}
            </div>
          ) : null}
        </div>
        {hint ? (
          <div className="mt-3 flex items-center gap-2 text-xs text-white/55">
            <TooltipTiny text={hint} />
            <span>Как считается</span>
          </div>
        ) : null}
      </div>
    </div>
  );

  const paybackLabel =
    Number.isFinite(computed.paybackMonths) && computed.paybackMonths < 999
      ? `${(computed.paybackMonths).toFixed(1)} мес.`
      : "—";

  return (
    <section id="calculator" className="relative mx-auto max-w-6xl px-4 py-20">
      <SectionTitle
        eyebrow="Ключевой блок"
        title="Интерактивный калькулятор экономии и ESG‑эффекта"
        subtitle="Введите параметры объекта — показатели обновятся мгновенно. Логика учитывает переработку серой воды, эффективность и тариф при перерасходе." 
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Inputs */}
        <div className={"relative overflow-hidden rounded-3xl lg:col-span-2 " + glassClass("p-6")}> 
          <div className="absolute inset-0 opacity-45 [background:radial-gradient(ellipse_at_top,rgba(0,160,255,0.12),transparent_55%)]" />
          <div className="relative">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Параметры объекта</div>
                <div className="mt-1 text-xs text-white/60">
                  Совет: если “Гостей/сутки” = 0, мы оценим по номерам и загрузке (2 гостя/номер).
                </div>
              </div>
              <Pill>
                <Cpu className="h-4 w-4" />
                Live
              </Pill>
            </div>

            <div className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-xs font-medium text-white/70">Количество номеров</span>
                <input
                  className={inputCls}
                  type="number"
                  min={0}
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-medium text-white/70">Средняя загрузка (%)</span>
                <input
                  className={inputCls}
                  type="number"
                  min={0}
                  max={100}
                  value={occupancy}
                  onChange={(e) => setOccupancy(Number(e.target.value))}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-medium text-white/70">Среднее количество гостей в сутки</span>
                <input
                  className={inputCls}
                  type="number"
                  min={0}
                  value={guestsPerDay}
                  onChange={(e) => setGuestsPerDay(Number(e.target.value))}
                />
                <div className="text-[11px] text-white/55">
                  Оценка при 0: <span className="text-white/75">{computed.inferredGuests.toFixed(1)}</span>
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-medium text-white/70">Потребление воды на человека (литры/сутки)</span>
                <input
                  className={inputCls}
                  type="number"
                  min={0}
                  value={waterPerGuest}
                  onChange={(e) => setWaterPerGuest(Number(e.target.value))}
                />
                <div className="flex items-center justify-between text-[11px] text-white/55">
                  <span>
                    Базовый лимит: <span className="text-white/75">250 л</span>
                  </span>
                  <span>
                    Мультипликатор тарифа: <span className="text-white/75">×{computed.highTariffMultiplier.toFixed(2)}</span>
                  </span>
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-medium text-white/70">Стоимость воды за м³</span>
                <input
                  className={inputCls}
                  type="number"
                  min={0}
                  value={pricePerM3}
                  onChange={(e) => setPricePerM3(Number(e.target.value))}
                />
                <div className="text-[11px] text-white/55">
                  Итоговый тариф с учётом перерасхода: <span className="text-white/75">{computed.adjustedPrice.toFixed(1)}</span>
                </div>
              </label>

              <div className="grid gap-2">
                <span className="text-xs font-medium text-white/70">Регион</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegion("normal")}
                    className={
                      "rounded-2xl border px-4 py-3 text-sm transition " +
                      (region === "normal"
                        ? "border-cyan-300/40 bg-white/10 text-white"
                        : "border-white/12 bg-white/6 text-white/70 hover:bg-white/8")
                    }
                  >
                    Обычный
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegion("remote")}
                    className={
                      "rounded-2xl border px-4 py-3 text-sm transition " +
                      (region === "remote"
                        ? "border-cyan-300/40 bg-white/10 text-white"
                        : "border-white/12 bg-white/6 text-white/70 hover:bg-white/8")
                    }
                  >
                    Удалённый (доставка)
                  </button>
                </div>
                <div className="text-[11px] text-white/55">
                  Коэффициент удалённости: <span className="text-white/75">×{region === "remote" ? 4 : 1}</span>
                </div>
              </div>

              <div className="grid gap-2">
                <span className="text-xs font-medium text-white/70">
                  Оценочная стоимость системы (CAPEX) <span className="text-white/40">(для окупаемости)</span>
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    className={inputCls + " col-span-2"}
                    type="number"
                    min={0}
                    value={capex}
                    onChange={(e) => setCapex(Number(e.target.value))}
                    placeholder="Напр. 1200000"
                  />
                  <select
                    className={inputCls}
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="₽">₽</option>
                    <option value="$">$</option>
                    <option value="€">€</option>
                  </select>
                </div>
                <div className="text-[11px] text-white/55">
                  Если оставить 0 — используем мягкую ориентировочную оценку по масштабу (для демо).
                </div>
              </div>

              <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
                <div className="flex items-center justify-between">
                  <span>Серая вода: 60%</span>
                  <span>Эффективность: 70%</span>
                </div>
                <div className="mt-1 text-[11px] text-white/55">
                  Эти коэффициенты можно адаптировать под проект и локальные нормы.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="grid gap-4 lg:col-span-3">
          <div className="grid gap-4 md:grid-cols-2">
            {metricCard(
              "💧 Сэкономленные литры в месяц",
              `${fmtInt(computed.recycledWater)} л`,
              "RecycledWater = TotalMonthly × 0.6 × 0.7",
              <Droplets className="h-5 w-5 text-white/90" />
            )}
            {metricCard(
              "💰 Экономия в деньгах (в месяц)",
              fmtMoney(computed.realSavings, currency),
              "Savings = (RecycledM3 × AdjustedPrice) × RemoteMultiplier",
              <Banknote className="h-5 w-5 text-white/90" />
            )}
            {metricCard(
              "📉 Снижение потребления воды",
              `${computed.waterDropPct.toFixed(1)}%`,
              "Reduction% = RecycledWater / TotalMonthly",
              <Recycle className="h-5 w-5 text-white/90" />
            )}
            {metricCard(
              "🌍 Снижение нагрузки на экосистему",
              `${computed.ecosystemLoadPct.toFixed(1)}%`,
              "Эвристическая оценка: усиление эффекта в удалённых регионах.",
              <Leaf className="h-5 w-5 text-white/90" />
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {metricCard(
              "⏳ Примерный срок окупаемости",
              paybackLabel,
              "Payback = CAPEX / MonthlySavings. Значение — ориентир, зависит от комплектации и сервиса.",
              <Gauge className="h-5 w-5 text-white/90" />
            )}
            {metricCard(
              "📊 ESG‑impact показатель",
              `${computed.esgScore.toFixed(0)}/100`,
              "Комбинированный индекс: объём экономии воды + % снижения + поправка на регион (демо‑метрика).",
              <ShieldCheck className="h-5 w-5 text-white/90" />
            )}
          </div>

          <div className={"relative overflow-hidden rounded-3xl " + glassClass("p-6")}> 
            <div className="absolute inset-0 opacity-45 [background:radial-gradient(ellipse_at_top,rgba(120,255,255,0.10),transparent_55%)]" />
            <div className="relative">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">Impact Dashboard (демо)</div>
                  <div className="mt-1 text-xs text-white/60">
                    Прогноз экономии по месяцам при стабильных вводных.
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/70">
                  <span className="inline-flex items-center gap-2">
                    <Leaf className="h-4 w-4" /> CO₂ eq: {fmtInt(computed.co2Kg)} кг
                    <span className="text-white/40">(оценка)</span>
                  </span>
                </div>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ left: 8, right: 10, top: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.10)" />
                    <XAxis dataKey="m" stroke="rgba(255,255,255,0.50)" fontSize={12} />
                    <YAxis
                      stroke="rgba(255,255,255,0.50)"
                      fontSize={12}
                      tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(0,0,0,0.70)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 16,
                        color: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(12px)",
                      }}
                      formatter={(v: any) => [fmtMoney(Number(v), currency), "Экономия"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="savings"
                      stroke="rgba(125,255,255,0.90)"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
                  <div className="font-medium text-white/85">Результаты в реальном времени</div>
                  <div className="mt-1 text-white/60">Пересчитываются при каждом изменении поля.</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
                  <div className="font-medium text-white/85">Умный тариф</div>
                  <div className="mt-1 text-white/60">Мотивирует снижать перерасход выше 250 л/гость.</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
                  <div className="font-medium text-white/85">Готово для ESG</div>
                  <div className="mt-1 text-white/60">Метрики для отчётности и зелёного финансирования.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300/80 to-blue-500/80 px-6 py-3 text-sm font-semibold text-[#050B18] shadow-lg shadow-cyan-500/15 hover:opacity-95"
            >
              Получить персональное предложение <ArrowRight className="h-4 w-4" />
            </a>
            <div className="text-xs text-white/55">
              * CO₂‑эквивалент и ESG‑скор — демонстрационные оценки. Для проекта задаются под регион и нормы.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BusinessModel() {
  return (
    <section id="model" className="relative mx-auto max-w-6xl px-4 py-20">
      <SectionTitle
        eyebrow="Коммерция"
        title="Бизнес‑модель: покупка или Water‑as‑a‑Service"
        subtitle="Выберите формат внедрения — от капитальных поставок до сервиса, привязанного к фактической экономии." 
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className={"relative overflow-hidden rounded-3xl " + glassClass("p-7")}> 
          <div className="absolute inset-0 opacity-45 [background:radial-gradient(ellipse_at_top,rgba(120,255,255,0.12),transparent_55%)]" />
          <div className="relative">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/18 to-blue-600/18 ring-1 ring-white/10">
              <Building2 className="h-6 w-6 text-white/90" />
            </div>
            <div className="text-lg font-semibold text-white">Прямая покупка</div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Модульная поставка, монтаж и ввод в эксплуатацию. Ваша команда получает доступ к
              мониторингу и отчётности.
            </p>
            <div className="mt-5 grid gap-2 text-sm text-white/80">
              {["CAPEX + сервисные пакеты", "Гибкая модульность", "Интеграция в инфраструктуру"].map(
                (t) => (
                  <div key={t} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                    {t}
                  </div>
                )
              )}
            </div>
            <a
              href="#cta"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/7 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
            >
              Запросить расчёт <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className={"relative overflow-hidden rounded-3xl " + glassClass("p-7")}> 
          <div className="absolute inset-0 opacity-55 [background:radial-gradient(ellipse_at_top,rgba(0,160,255,0.16),transparent_55%)]" />
          <div className="relative">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/18 to-blue-600/18 ring-1 ring-white/10">
              <Recycle className="h-6 w-6 text-white/90" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-semibold text-white">Water‑as‑a‑Service</div>
              <Pill>
                <Banknote className="h-4 w-4" /> 50% от экономии
              </Pill>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Минимизируйте CAPEX: вы платите сервисный процент от подтверждённой экономии воды.
              Идеально для быстрорастущих объектов и удалённых регионов.
            </p>
            <div className="mt-5 grid gap-2 text-sm text-white/80">
              {["Низкий входной порог", "Обслуживание и мониторинг включены", "SLA и отчётность для ESG"].map(
                (t) => (
                  <div key={t} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                    {t}
                  </div>
                )
              )}
            </div>
            <a
              href="#cta"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300/80 to-blue-500/80 px-5 py-3 text-sm font-semibold text-[#050B18] shadow-lg shadow-cyan-500/15 hover:opacity-95"
            >
              Получить персональное предложение <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialImpact() {
  return (
    <section id="impact" className="relative mx-auto max-w-6xl px-4 py-20">
      <SectionTitle
        eyebrow="Устойчивость"
        title="Социальный и экологический эффект"
        subtitle="AquaLoop — это не только экономия воды, но и укрепление локальных компетенций и поддержка экосистем." 
      />

      <div className="grid gap-6 md:grid-cols-3">
        <FeatureCard
          icon={<Users className="h-5 w-5 text-white/90" />}
          title="Обучение местных техников"
          desc="Программы обучения и регламенты обслуживания повышают автономность удалённых регионов."
        />
        <FeatureCard
          icon={<Droplets className="h-5 w-5 text-white/90" />}
          title="Сохранение водоисточников"
          desc="Снижение водозабора и логистики поставок уменьшает давление на локальные ресурсы."
        />
        <FeatureCard
          icon={<Leaf className="h-5 w-5 text-white/90" />}
          title="Поддержка экосистем"
          desc="Меньше водного стресса — выше устойчивость биоценозов и рекреационных зон вокруг объектов."
        />
      </div>

      <div className={"mt-8 rounded-3xl " + glassClass("p-7")}> 
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold text-white">Гранты и зелёное финансирование</div>
            <div className="mt-2 text-sm leading-relaxed text-white/70">
              Impact‑метрики и мониторинг позволяют формировать прозрачные отчёты для ESG и
              заявок на субсидии.
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs font-medium text-white/70">Что получает инвестор</div>
            <div className="mt-2 grid gap-2 text-sm text-white/80">
              {[
                "Данные об экономии воды",
                "Показатели устойчивости",
                "Риск‑менеджмент по водному ресурсу",
              ].map((t) => (
                <div key={t} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-200" /> {t}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs font-medium text-white/70">Что получает объект</div>
            <div className="mt-2 grid gap-2 text-sm text-white/80">
              {[
                "Снижение операционных затрат",
                "Повышение resiliency",
                "Премиальный эко‑имидж",
              ].map((t) => (
                <div key={t} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-200" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const [status, setStatus] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Demo submit: in real product replace with API call.
    setStatus("Заявка отправлена (демо). Мы свяжемся с вами для уточнения вводных.");
    formRef.current?.reset();
  }

  return (
    <section id="cta" className="relative mx-auto max-w-6xl px-4 pb-28 pt-20">
      <div className={"relative overflow-hidden rounded-[2.2rem] " + glassClass("p-8 md:p-10")}> 
        <div className="absolute inset-0 opacity-70 [background:radial-gradient(ellipse_at_top,rgba(120,255,255,0.18),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(0,120,255,0.22),transparent_50%)]" />
        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <Pill>
              <Recycle className="h-4 w-4" />
              Close the Loop
            </Pill>
            <h3 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Start Saving Water Today
            </h3>
            <p className="mt-3 text-pretty text-base leading-relaxed text-white/70">
              Install AquaLoop. Close the Loop. Получите персональное предложение под вашу локацию,
              водный профиль и инфраструктуру.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-white/80">
              {["Аудит водного контура", "Проектирование и монтаж", "Мониторинг + ESG‑отчётность"].map(
                (t) => (
                  <div key={t} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                    {t}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/12 bg-black/25 p-6 backdrop-blur-xl">
            <div className="mb-3 text-sm font-semibold text-white">Форма заявки</div>
            <form ref={formRef} onSubmit={onSubmit} className="grid gap-3">
              <label className="grid gap-2">
                <span className="text-xs font-medium text-white/70">Название объекта</span>
                <input
                  required
                  className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-cyan-300/40"
                  placeholder="Напр. Desert Glamp Resort"
                />
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs font-medium text-white/70">Страна</span>
                  <input
                    required
                    className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-cyan-300/40"
                    placeholder="Казахстан"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-xs font-medium text-white/70">Телефон</span>
                  <input
                    className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-cyan-300/40"
                    placeholder="+7 …"
                  />
                </label>
              </div>
              <label className="grid gap-2">
                <span className="text-xs font-medium text-white/70">Email</span>
                <input
                  required
                  type="email"
                  className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-cyan-300/40"
                  placeholder="team@company.com"
                />
              </label>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300/85 to-blue-500/85 px-6 py-3 text-sm font-semibold text-[#050B18] shadow-lg shadow-cyan-500/15 hover:opacity-95"
              >
                Получить предложение <ArrowRight className="h-4 w-4" />
              </button>

              {status ? (
                <div className="mt-2 rounded-2xl border border-white/12 bg-white/7 px-4 py-3 text-xs text-white/80">
                  {status}
                </div>
              ) : null}
              <div className="mt-1 text-[11px] text-white/55">
                Нажимая кнопку, вы соглашаетесь на обработку контактных данных (демо‑форма).
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
        <div className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Для засушливых и удалённых регионов • турбазы • кемпинги • глэмпинги • small hotels
        </div>
        <div className="inline-flex items-center gap-2">
          <Leaf className="h-4 w-4" />
          AquaLoop © {new Date().getFullYear()}
        </div>
      </div>
    </section>
  );
}

export default function AquaLoopSite() {
  const [introDone, setIntroDone] = useState(false);

  // Live impact counter (global) — smooth, deterministic
  const [liters, setLiters] = useState(4_250_000);

  // Derive other metrics from liters for perfectly smooth motion
  // (demo coefficient; replace with real audited conversion factors)
  const co2Kg = useMemo(() => Math.round(liters / 27), [liters]);

  
  // Parallax
  const { scrollY } = useScroll();
  const bgY1 = useTransform(scrollY, [0, 900], [0, 120]);
  const bgY2 = useTransform(scrollY, [0, 900], [0, -90]);

  useEffect(() => {
    // Smooth counter using requestAnimationFrame (no random jumps)
    const rateLitersPerSecond = 14; // demo rate; tie to real telemetry in production
    let raf = 0;
    let last = performance.now();

    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000); // cap dt for stability
      last = t;
      setLiters((v) => v + rateLitersPerSecond * dt);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // prevent scroll during intro
  useEffect(() => {
    if (!introDone) {
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
      };
    }
    document.documentElement.style.overflow = "";
  }, [introDone]);

  return (
    <div className="min-h-screen bg-[#050B18] text-white">
      <style>{`
        html { scroll-behavior: smooth; }
        .noise:before{content:'';position:absolute;inset:0;opacity:.10;mix-blend-overlay;background-image:url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='140'%20height='140'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='.8'%20numOctaves='3'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='140'%20height='140'%20filter='url(%23n)'%20opacity='.35'/%3E%3C/svg%3E");}
        @keyframes flow { 0%{transform:translateX(-40%)} 100%{transform:translateX(140%)} }
        .animate-flow{animation:flow 2.6s linear infinite;}
        @keyframes shimmer { 0%{transform:translateX(-35%)} 100%{transform:translateX(135%)} }
        .shimmer:after{content:'';position:absolute;inset:-20%;background:linear-gradient(90deg,transparent,rgba(140,255,255,.14),transparent);transform:translateX(-35%);animation:shimmer 6s linear infinite;}
        @keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .floaty{animation:floaty 5.5s ease-in-out infinite;}
      `}</style>

      <AnimatePresence>
        {!introDone ? <IntroOverlay onDone={() => setIntroDone(true)} /> : null}
      </AnimatePresence>

      <StickyImpactBar liters={liters} co2Kg={co2Kg} />
      <NavBar />

      {/* Hero */}
      <header className="relative overflow-hidden pb-10 pt-28 md:pt-32">
        <div className="noise pointer-events-none absolute inset-0" />

        {/* parallax blobs */}
        <motion.div
          style={{ y: bgY1 }}
          className="pointer-events-none absolute -left-24 top-20 h-[30rem] w-[30rem] rounded-full bg-cyan-400/12 blur-3xl"
        />
        <motion.div
          style={{ y: bgY2 }}
          className="pointer-events-none absolute -right-24 top-12 h-[34rem] w-[34rem] rounded-full bg-blue-600/18 blur-3xl"
        />
        <div className="pointer-events-none absolute inset-0 opacity-35 [background:radial-gradient(ellipse_at_top,rgba(120,255,255,0.14),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(0,120,255,0.18),transparent_50%)]" />

        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Pill>
                <Droplets className="h-4 w-4" />
                Water Reuse • Modular • IoT
              </Pill>
              <Pill>
                <Leaf className="h-4 w-4" />
                ESG‑ready
              </Pill>
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              AquaLoop — замкнутый водооборот для туризма в засушливых и удалённых регионах
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/70 md:text-lg">
              Модульная система повторного использования серой воды (души, раковины) с
              многоступенчатой очисткой и мониторингом. Экономия до <span className="text-white">60%</span>
              свежей воды — без компромиссов в комфорте.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300/85 to-blue-500/85 px-6 py-3 text-sm font-semibold text-[#050B18] shadow-lg shadow-cyan-500/15 hover:opacity-95"
              >
                Рассчитать экономию <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/7 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
              >
                Как это работает
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[{
                k: "до 60%",
                v: "меньше потребления"
              },{
                k: "24/7",
                v: "мониторинг IoT"
              },{
                k: "модули",
                v: "масштабирование"
              }].map((x) => (
                <div key={x.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-lg font-semibold text-white">{x.k}</div>
                  <div className="mt-1 text-xs text-white/60">{x.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* right hero card */}
          <div className={"relative overflow-hidden rounded-[2.2rem] " + glassClass("p-7") + " shimmer"}>
            <div className="absolute inset-0 opacity-55 [background:radial-gradient(ellipse_at_top,rgba(120,255,255,0.12),transparent_55%)]" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Live Water Loop</div>
                  <div className="mt-1 text-xs text-white/60">Визуализация циркуляции и контроля</div>
                </div>
                <Pill>
                  <Gauge className="h-4 w-4" />
                  Impact
                </Pill>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-white/70">Контур воды</div>
                    <div className="text-xs text-white/60">closed-loop</div>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/18 to-blue-600/18 ring-1 ring-white/10">
                      <Droplets className="h-6 w-6 text-white/90" />
                      <div className="pointer-events-none absolute -inset-1 rounded-2xl border border-cyan-200/15" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
                        <div className="h-full w-[78%] animate-flow bg-gradient-to-r from-cyan-300/0 via-cyan-300/75 to-blue-500/0" />
                      </div>
                      <div className="mt-2 flex justify-between text-[11px] text-white/55">
                        <span>Сбор → очистка</span>
                        <span>Повторное использование</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-white/70">
                      <Cpu className="h-4 w-4" />
                      IoT‑датчики
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">Качество • расход • давление</div>
                    <div className="mt-1 text-xs text-white/60">Алерты + журнал событий</div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-white/70">
                      <Sun className="h-4 w-4" />
                      Energy
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">Солнечные панели (опция)</div>
                    <div className="mt-1 text-xs text-white/60">Готово для удалённых локаций</div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-white/70">Состояние системы</div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-[11px] text-cyan-100">
                      <span className="relative inline-flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-200/60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-200" />
                      </span>
                      Stable
                    </span>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "pH", v: "7.2" },
                      { label: "Turbidity", v: "0.9 NTU" },
                      { label: "UV", v: "ON" },
                    ].map((x) => (
                      <div key={x.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <div className="text-[11px] text-white/55">{x.label}</div>
                        <div className="mt-1 text-sm font-semibold text-white">{x.v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-white/55">
                  * Демо‑панель. В продукте метрики и пороги настраиваются под регион и нормы.
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Problem + Solution */}
      <section id="problem" className="relative mx-auto max-w-6xl px-4 py-20">
        <SectionTitle
          eyebrow="Problem → Solution"
          title="Вода становится самым дорогим ресурсом — особенно вне инфраструктуры"
          subtitle="Туристические объекты тратят большие объёмы воды и несут расходы на логистику, while ESG‑требования усиливаются. AquaLoop снижает потребление за счёт замкнутого цикла серой воды." 
        />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-4">
            <FeatureCard
              icon={<Droplets className="h-5 w-5 text-white/90" />}
              title="Водный стресс"
              desc="Засушливые регионы и сезонные пики создают дефицит и риск ограничения водозабора."
            />
            <FeatureCard
              icon={<Users className="h-5 w-5 text-white/90" />}
              title="150–300 литров на гостя в сутки"
              desc="Типичный диапазон потребления для размещения с комфортом: душ, уборка, санитарные узлы."
            />
          </div>
          <div className="grid gap-4">
            <FeatureCard
              icon={<MapPin className="h-5 w-5 text-white/90" />}
              title="Дорогая доставка воды"
              desc="В удалённых локациях стоимость м³ кратно выше из‑за доставки, хранения и потерь." 
            />
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5 text-white/90" />}
              title="ESG‑требования"
              desc="Отчётность по воде и устойчивости повышает доверие инвесторов и B2B‑клиентов." 
            />
          </div>
        </div>

        <div className={"mt-8 rounded-3xl " + glassClass("p-7")}> 
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <div className="text-sm font-semibold text-white">Решение</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                AquaLoop — инновационная модульная система замкнутого повторного использования воды,
                которая перерабатывает серую воду (души, раковины) через многоступенчатую очистку и
                возвращает её для технических нужд (WC, мойка, полив).
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>
                  <Recycle className="h-4 w-4" /> до 60% экономии
                </Pill>
                <Pill>
                  <Cpu className="h-4 w-4" /> IoT + Dashboard
                </Pill>
                <Pill>
                  <Sun className="h-4 w-4" /> solar-ready
                </Pill>
                <Pill>
                  <CloudRain className="h-4 w-4" /> rain harvesting
                </Pill>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs font-medium text-white/70">Быстрый ориентир</div>
              <div className="mt-3 text-3xl font-semibold tracking-tight text-white">−60%</div>
              <div className="mt-1 text-sm text-white/70">потребления свежей воды</div>
              <div className="mt-4 text-xs text-white/55">
                Реальный эффект зависит от профиля потребления и режимов эксплуатации.
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Calculator />
      <BusinessModel />
      <SocialImpact />
      <FinalCTA />

      {/* subtle footer fade */}
      <div className="pointer-events-none h-24 w-full [background:linear-gradient(to_bottom,transparent,rgba(5,11,24,1))]" />
    </div>
  );
}
