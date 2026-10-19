import { BLOCKS, BLOCK_HEADING, INTRO, LEVELS } from "@/data/leadership";
import { Answers, QUESTIONS_PER_BLOCK, blockScore, isValidAnswer, levelOf } from "@/lib/diagnosis";

type Props = {
  answers: Answers;
  complete: boolean;
  onAnswer: (index: number, value: number) => void;
  onFinish: () => void;
  onIntro: () => void;
};

export default function Questions({ answers, complete, onAnswer, onFinish, onIntro }: Props) {
  const answeredCount = answers.filter(isValidAnswer).length;

  return (
    <section className="gradient-bg on-gradient min-h-screen">
      <div className="sticky top-0 z-30 gradient-bg">
        <div className="wrap max-w-3xl pt-4 pb-3">
          <div className="flex items-baseline justify-between kicker mb-2">
            <span>Diagnóstico de liderazgo</span>
            <span aria-live="polite">{answeredCount} / 20 respondidas</span>
          </div>
          <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={20} aria-valuenow={answeredCount} aria-label="Progreso del diagnóstico">
            <span style={{ width: `${(answeredCount / 20) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="wrap max-w-3xl py-8 md:py-12">
        {BLOCKS.map((block, b) => {
          const blockAnswers = answers.slice(b * QUESTIONS_PER_BLOCK, (b + 1) * QUESTIONS_PER_BLOCK);
          const blockDone = blockAnswers.every(isValidAnswer);
          return (
            <div key={block.id} className="mb-14 md:mb-20">
              <p className="display text-5xl md:text-6xl opacity-90">0{block.id}</p>
              <h2 className="display text-4xl md:text-5xl mt-2">
                <em>{BLOCK_HEADING[b]}</em>
              </h2>
              <p className="mt-2 mb-8 text-lg font-medium">{block.question}</p>

              <div className="grid gap-5">
                {block.items.map((item, k) => {
                  const qIndex = b * QUESTIONS_PER_BLOCK + k;
                  const value = answers[qIndex];
                  return (
                    <fieldset key={qIndex} className="card !p-5 md:!p-8">
                      <legend className="sr-only">Afirmación {qIndex + 1}</legend>
                      <p className="kicker text-[var(--magenta)] mb-3">Afirmación {qIndex + 1} de 20</p>
                      <p className="text-xl md:text-2xl font-bold leading-tight mb-6">{item}</p>
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
                  );
                })}
              </div>

              {blockDone && <SubtotalCard b={b} score={blockScore(answers, b)} />}
            </div>
          );
        })}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <button className="btn btn-ghost" onClick={onIntro}>
            ← Atrás
          </button>
          <button className="btn btn-light" onClick={onFinish} disabled={!complete}>
            Ver mis resultados →
          </button>
        </div>
        {!complete && (
          <p className="mt-3 text-sm text-right opacity-90">Responde las 20 afirmaciones para ver tus resultados.</p>
        )}
      </div>
    </section>
  );
}

function SubtotalCard({ b, score }: { b: number; score: number }) {
  const level = LEVELS[levelOf(score)];
  return (
    <div className="card !p-6 md:!p-10 mt-5">
      <p className="kicker text-[var(--magenta)]">Subtotal bloque {b + 1}</p>
      <p className="display text-6xl md:text-7xl mt-2">
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
