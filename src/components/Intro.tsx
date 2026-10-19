import { INTRO } from "@/data/leadership";
import { Star } from "./ui";

export default function Intro({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <section className="wrap py-12 md:py-20">
      <p className="kicker flex items-center gap-3 mb-4">
        <Star size={12} color="var(--magenta)" /> {INTRO.kicker}
      </p>
      <div className="grid md:grid-cols-[1fr_1.1fr] gap-8 md:gap-16 items-start">
        <h1 className="display text-[clamp(3rem,9vw,6rem)]">
          Liderar <em className="block text-[var(--magenta)]">se aprende.</em>
        </h1>
        <p className="text-lg md:text-xl leading-relaxed md:pt-4">{INTRO.body}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-12">
        {INTRO.stats.map((s) => (
          <figure key={s.figure + s.source} className="card">
            <p className="display text-6xl text-[var(--red)]">{s.figure}</p>
            <figcaption>
              <span className="block mt-3 leading-snug">{s.text}</span>
              <span className="block mt-3 kicker text-[var(--muted)]">{s.source}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-10 mt-14">
        <div>
          <h2 className="display text-3xl mb-5">{INTRO.howTitle}</h2>
          <ol>
            {INTRO.steps.map((s, i) => (
              <li key={i} className="flex gap-4 border-t border-[var(--line)] py-4">
                <span className="font-extrabold italic text-2xl text-[var(--orange)]">{i + 1}</span>
                <p>
                  <strong>{s.lead}</strong> {s.rest}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="kicker mb-5">{INTRO.scaleTitle}</p>
          <ul className="grid grid-cols-5 gap-2">
            {INTRO.scale.map((s) => (
              <li key={s.value} className="card !p-3 text-center">
                <span className="display block text-3xl">{s.value}</span>
                <span className="block text-xs sm:text-sm font-semibold leading-tight mt-1">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <button className="btn" onClick={onNext}>
          Comenzar el diagnóstico →
        </button>
        <button className="btn btn-ghost" onClick={onBack}>
          ← Portada
        </button>
      </div>
    </section>
  );
}
