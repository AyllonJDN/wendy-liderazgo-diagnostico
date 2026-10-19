import { BLOCKS, PLAN } from "@/data/leadership";
import { actionKey, type Diagnosis } from "@/lib/diagnosis";
import { Star } from "./ui";

type Props = {
  d: Diagnosis;
  done: Record<string, boolean>;
  onToggle: (key: string) => void;
  onNext: () => void;
};

export default function Plan({ d, done, onToggle, onNext }: Props) {
  const completed = d.planOrder.reduce((n, b) => n + BLOCKS[b].week.filter((_, i) => done[actionKey(b, i)]).length, 0);
  return (
    <section className="wrap py-12 md:py-20">
      <p className="kicker flex items-center gap-3 mb-4">
        <Star size={12} color="var(--magenta)" /> {PLAN.kicker}
      </p>
      <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-end">
        <h1 className="display text-[clamp(2.8rem,8vw,5.5rem)]">
          30 días, <em className="block text-[var(--magenta)]">4 pasos.</em>
        </h1>
        <p className="text-lg leading-relaxed">{PLAN.text}</p>
      </div>
      <p className="mt-6 font-bold">
        Tu plan empieza por la semana {BLOCKS[d.priority].id} · {BLOCKS[d.priority].title}. Cumplidas: {completed} / 12
      </p>

      <ol className="grid md:grid-cols-2 gap-5 mt-8">
        {d.planOrder.map((b, step) => {
          const block = BLOCKS[b];
          return (
            <li key={block.id} className="card !p-6">
              <p className="kicker text-[var(--magenta)]">
                Semana {block.id} · Paso {step + 1} de 4
              </p>
              <h2 className="display text-3xl mt-1 mb-3">
                <em>{block.title}</em>
              </h2>
              <ul>
                {block.week.map((text, i) => {
                  const key = actionKey(b, i);
                  return (
                    <li key={key}>
                      <label className="check">
                        <input type="checkbox" checked={!!done[key]} onChange={() => onToggle(key)} />
                        <span className="leading-snug">{text}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>

      <div className="mt-10">
        <button className="btn" onClick={onNext}>
          Para cerrar →
        </button>
      </div>
    </section>
  );
}
