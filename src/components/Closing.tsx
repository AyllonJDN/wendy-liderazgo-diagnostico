import Image from "next/image";
import { CLOSING } from "@/data/leadership";
import { addDays, toISODate } from "@/lib/diagnosis";
import { Star } from "./ui";

type Props = {
  insight: string;
  commitment: string;
  retest: string | null;
  onChange: (patch: { insight?: string; commitment?: string; retest?: string | null }) => void;
  onDownload: () => void;
  pdfBusy: boolean;
  pdfError: boolean;
};

export default function Closing({ insight, commitment, retest, onChange, onDownload, pdfBusy, pdfError }: Props) {
  const defaultRetest = toISODate(addDays(new Date(), 30));
  return (
    <section className="gradient-bg on-gradient relative overflow-hidden">
      <Star size={36} color="var(--yellow)" className="absolute right-[40%] top-14 hidden md:block" />
      <div className="wrap grid md:grid-cols-[1.4fr_1fr] gap-8 py-12 md:py-20">
        <div>
          <p className="kicker flex items-center gap-3 mb-4">
            <Star size={12} color="var(--yellow)" /> {CLOSING.kicker}
          </p>
          <h1 className="display text-[clamp(2.8rem,8vw,5.5rem)]">
            {CLOSING.title} <em>{CLOSING.titleEm}</em>
          </h1>

          <div className="card mt-8 space-y-5">
            <div>
              <label htmlFor="insight" className="block font-bold mb-2">
                {CLOSING.fields.insight} <span className="font-normal text-[var(--muted)]">(opcional)</span>
              </label>
              <textarea id="insight" className="field" maxLength={2000} value={insight} onChange={(e) => onChange({ insight: e.target.value })} />
            </div>
            <div>
              <label htmlFor="commitment" className="block font-bold mb-2">
                {CLOSING.fields.commitment} <span className="font-normal text-[var(--muted)]">(opcional)</span>
              </label>
              <textarea id="commitment" className="field" maxLength={2000} value={commitment} onChange={(e) => onChange({ commitment: e.target.value })} />
            </div>
            <div>
              <label htmlFor="retest" className="block font-bold mb-2">
                {CLOSING.fields.retest}
              </label>
              <input id="retest" type="date" className="field max-w-xs" value={retest ?? defaultRetest} onChange={(e) => onChange({ retest: e.target.value || null })} />
              <p className="text-sm text-[var(--muted)] mt-1">Por defecto, dentro de 30 días. Puedes editarla.</p>
            </div>
          </div>

          <div className="mt-8">
            <button className="btn btn-light" onClick={onDownload} disabled={pdfBusy}>
              {pdfBusy ? "Generando PDF…" : "Descargar mi diagnóstico"}
            </button>
            {pdfError && (
              <p role="alert" className="mt-3 font-semibold">
                No se pudo generar el PDF. Inténtalo de nuevo.
              </p>
            )}
            <p className="text-sm mt-3 opacity-90">Tus respuestas se guardan solo en este dispositivo.</p>
          </div>

          <hr className="rule my-10" />
          <p className="text-lg">{CLOSING.ctaLead}</p>
          <p className="display text-3xl md:text-4xl">
            <em>{CLOSING.ctaStrong}</em>
          </p>
          <p className="mt-3 text-lg max-w-lg">{CLOSING.ctaText}</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-1 font-bold">
            {CLOSING.contacts.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>

          <div className="mt-10">
            <p className="kicker mb-2">{CLOSING.sourcesTitle}</p>
            <p className="text-sm opacity-90 max-w-xl leading-relaxed">{CLOSING.sources.join(" · ")}.</p>
          </div>
        </div>

        <div className="flex items-end justify-center">
          <Image src="/wendy-cierre.png" alt="Wendy Wünder celebrando" width={951} height={2475} className="h-auto w-[60%] md:w-full max-w-xs md:max-h-[85vh] object-contain object-bottom" />
        </div>
      </div>
    </section>
  );
}
