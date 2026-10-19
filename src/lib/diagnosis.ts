import { BLOCKS, LEVELS, PROFILES } from "@/data/leadership";

export type Answers = (number | null)[];
export type LevelKey = keyof typeof LEVELS;
export type ProfileKey = keyof typeof PROFILES;

export const QUESTIONS_PER_BLOCK = 5;
export const TOTAL_QUESTIONS = 20;

export type Diagnosis = {
  scores: number[]; // 4 subtotales /25
  total: number; // /100
  levels: LevelKey[];
  profile: ProfileKey;
  priority: number; // índice del bloque de menor puntaje (empate: orden original)
  tied: number[]; // bloques con el puntaje mínimo (longitud 1 si no hay empate)
  planOrder: number[]; // índices de bloque, en secuencia circular desde priority
};

export const emptyAnswers = (): Answers => Array<number | null>(TOTAL_QUESTIONS).fill(null);

export const isValidAnswer = (v: unknown): v is number =>
  typeof v === "number" && Number.isInteger(v) && v >= 1 && v <= 5;

export const isComplete = (a: Answers) => a.length === TOTAL_QUESTIONS && a.every(isValidAnswer);

export const blockScore = (a: Answers, b: number) =>
  a.slice(b * QUESTIONS_PER_BLOCK, (b + 1) * QUESTIONS_PER_BLOCK).reduce<number>((s, v) => s + (v ?? 0), 0);

export const blockComplete = (a: Answers, b: number) =>
  a.slice(b * QUESTIONS_PER_BLOCK, (b + 1) * QUESTIONS_PER_BLOCK).every(isValidAnswer);

export const levelOf = (score: number): LevelKey => (score <= 12 ? "alerta" : score <= 19 ? "construccion" : "fortaleza");

export const profileOf = (total: number): ProfileKey => (total <= 49 ? "jefe" : total <= 79 ? "construccion" : "crece");

export const planOrderFrom = (start: number): number[] => BLOCKS.map((_, i) => (start + i) % BLOCKS.length);

/** Scoring puro. Devuelve null mientras las 20 respuestas no sean válidas. */
export function diagnose(answers: Answers): Diagnosis | null {
  if (!isComplete(answers)) return null;
  const scores = BLOCKS.map((_, b) => blockScore(answers, b));
  const total = scores.reduce((s, v) => s + v, 0);
  const min = Math.min(...scores);
  const tied = scores.flatMap((s, i) => (s === min ? [i] : []));
  return {
    scores,
    total,
    levels: scores.map(levelOf),
    profile: profileOf(total),
    priority: tied[0],
    tied,
    planOrder: planOrderFrom(tied[0]),
  };
}

export const actionKey = (block: number, i: number) => `${BLOCKS[block].id}-${i + 1}`;

export const formatDate = (d: Date) => d.toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" });

export const toISODate = (d: Date) => {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

export const addDays = (d: Date, n: number) => {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
};

export function formatISO(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return y && m && d ? formatDate(new Date(y, m - 1, d)) : "";
}
