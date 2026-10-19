import { BLOCKS, LEVELS, PROFILES } from "@/data/leadership";
import type { Diagnosis } from "@/lib/diagnosis";
import { Star } from "./ui";

export default function Results({ d, onPlan, onEdit }: { d: Diagnosis; onPlan: () => void; onEdit: () => void }) {
  const profile = PROFILES[d.profile];
  const priority = BLOCKS[d.priority];
  return (
    <section className="wrap py-12 md:py-20">
      <p className="kicker flex items-center gap-3 mb-4">
        <Star size={12} color="var(--magenta)" /> TUS RESULTADOS
      </p>
      <h1 className="display text-[clamp(2.8rem,8vw,5.5rem)]">
        ¿Qué dice <em className="block text-[var(--magenta)]">tu puntaje?</em>
      </h1>

      <div className="grid md:grid-cols-[1fr_1.6fr] gap-5 mt-10">
        <div className="gradient-bg rounded-[14px] p-7 flex flex-col justify-between min-h-60">
          <p className="kicker">TOTAL</p>
          <p className="display text-8xl">
            {d.total}
            <span className="text-3xl opacity-80"> / 100</span>
          </p>
          <div>
            <p className="font-extrabold text-xl">
              {profile.range} · {profile.name}
            </p>
            <p className="mt-1 leading-snug">{profile.text}</p>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 gap-5">
          {BLOCKS.map((b, i) => {
            const level = LEVELS[d.levels[i]];
            const isPriority = d.priority === i;
            return (
              <li key={b.id} className="card flex flex-col" style={isPriority ? { borderColor: "var(--magenta)", borderWidth: 2 } : undefined}>
                <p className="kicker text-[var(--muted)]">
                  0{b.id} · {b.title}
                </p>
                <p className="display text-5xl mt-2">
                  {d.scores[i]}
                  <span className="text-xl text-[var(--muted)]"> / 25</span>
                </p>
                <p className="mt-3 font-extrabold">
                  {level.range} · {level.name}
                </p>
                <p className="text-sm leading-snug mt-1">{level.text}</p>
                {isPriority && <p className="mt-3 kicker text-[var(--magenta)]">● Bloque más bajo</p>}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="card mt-5 !p-7">
        <p className="kicker text-[var(--magenta)]">Tu bloque más bajo es</p>
        <p className="display text-4xl md:text-5xl mt-2">
          0{priority.id} <em>{priority.title}</em> <span className="text-2xl font-bold not-italic">→ empiezas por ahí.</span>
        </p>
        {d.tied.length > 1 && (
          <p className="mt-4 text-[var(--muted)]">
            Hay empate de {d.scores[d.priority]} puntos entre {d.tied.map((i) => BLOCKS[i].title).join(", ")}. Aquí se toma el primero según el orden
            original de los bloques: {BLOCKS[d.priority].title}.
          </p>
        )}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <button className="btn" onClick={onPlan}>
          Ver mi plan de 30 días →
        </button>
        <button className="btn btn-ghost" onClick={onEdit}>
          Editar mis respuestas
        </button>
      </div>
    </section>
  );
}
