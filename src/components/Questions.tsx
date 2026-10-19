import { BLOCKS, BLOCK_HEADING, INTRO, LEVELS } from "@/data/leadership";
import { Answers, QUESTIONS_PER_BLOCK, blockScore, isValidAnswer, levelOf } from "@/lib/diagnosis";

const POS_PER_BLOCK = QUESTIONS_PER_BLOCK + 1; // 5 preguntas + subtotal
export const LAST_POS = BLOCKS.length * POS_PER_BLOCK - 1;

type Props = {
  answers: Answers;
  pos: number;
  complete: boolean;
  onAnswer: (index: number, value: number) => void;
  onPos: (pos: number) => void;
  onFinish: () => void;
  onIntro: () => void;
};

export default function Questions({ answers, pos, complete, onAnswer, onPos, onFinish, onIntro }: Props) {
  const b = Math.floor(pos / POS_PER_BLOCK);
  const k = pos % POS_PER_BLOCK;
  const block = BLOCKS[b];
  const isSubtotal = k === QUESTIONS_PER_BLOCK;
  const qIndex = b * QUESTIONS_PER_BLOCK + k;
  const answeredCount = answers.filter(isValidAnswer).length;
  const value = isSubtotal ? null : answers[qIndex];
  const isLast = pos === LAST_POS;

  const back = () => (pos === 0 ? onIntro() : onPos(pos - 1));
  const next = () => (isLast ? onFinish() : onPos(pos + 1));

  return (
    <section className="gradient-bg on-gradient min-h-screen">
      <div className="wrap py-8 md:py-12 flex flex-col min-h-screen max-w-3xl">
        <div className="flex items-baseline justify-between kicker mb-3">
          <span>
            Bloque 0{block.id} · {block.title}
          </span>
          <span aria-live="polite">{answeredCount} / 20 respondidas</span>
        </div>
        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={20} aria-valuenow={answeredCount} aria-label="Progreso del diagnóstico">
          <span style={{ width: `${(answeredCount / 20) * 100}%` }} />
        </div>

        <div className="mt-8 md:mt-12 flex-1">
          {!isSubtotal && k === 0 && (
            <div className="mb-8">
              <p className="display text-5xl md:text-6xl opacity-90">0{block.id}</p>
              <h1 className="display text-4xl md:text-5xl mt-2">
                <em>{BLOCK_HEADING[b]}</em>
              </h1>
              <p className="mt-2 text-lg font-medium">{block.question}</p>
            </div>
          )}
          {!isSubtotal && k > 0 && <p className="font-semibold mb-8 opacity-90">{block.question}</p>}

          {isSubtotal ? (
            <SubtotalCard b={b} score={blockScore(answers, b)} />
          ) : (
            <fieldset className="card !p-5 md:!p-8">
              <legend className="sr-only">Pregunta {qIndex + 1}</legend>
              <p className="kicker text-[var(--magenta)] mb-3">
                Afirmación {qIndex + 1} de 20
              </p>
              <p className="text-2xl md:text-3xl font-bold leading-tight mb-8">{block.items[k]}</p>
              <div className="scale" role="radiogroup" aria-label="Del 1 al 5">
                {INTRO.scale.map((s) => (
                  <div key={s.value} className="contents">
                    <label>
                      <input
                        type="radio"
                        name={`q-${qIndex}`}
                        value={s.value}
                        checked={value === s.value}
                        onChange={() => onAnswer(qIndex, s.value)}
                        className="sr-only"
                      />
                      <span className="num">{s.value}</span>
                      <span className="lbl">{s.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <button className="btn btn-ghost" onClick={back}>
            ← Atrás
          </button>
          <div className="flex items-center gap-4">
            {complete && (
              <button className="link-btn" onClick={onFinish}>
                Ir a mis resultados
              </button>
            )}
            <button className="btn btn-light" onClick={next} disabled={!isSubtotal && !isValidAnswer(value)}>
              {isLast ? "Ver mis resultados" : "Continuar"} →
            </button>
          </div>
        </div>
        {!isSubtotal && !isValidAnswer(value) && <p className="mt-3 text-sm text-right opacity-90">Elige un número del 1 al 5 para continuar.</p>}
      </div>
    </section>
  );
}

function SubtotalCard({ b, score }: { b: number; score: number }) {
  const level = LEVELS[levelOf(score)];
  return (
    <div className="card !p-6 md:!p-10">
      <p className="kicker text-[var(--magenta)]">Subtotal bloque {b + 1}</p>
      <p className="display text-7xl md:text-8xl mt-2">
        {score}
        <span className="text-3xl md:text-4xl text-[var(--muted)]"> / 25</span>
      </p>
      <p className="mt-4 text-xl font-extrabold">
        {level.range} · {level.name}
      </p>
      <p className="mt-1 text-lg">{level.text}</p>
    </div>
  );
}
