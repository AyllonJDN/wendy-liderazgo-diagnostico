import Image from "next/image";
import { CLOSING } from "@/data/leadership";
import { addDays, toISODate } from "@/lib/diagnosis";
import { Socials, Star } from "./ui";

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
      <div className="wrap relative grid gap-8 pt-12 md:pt-20 pb-0">
        <div className="pb-12 md:pb-20 md:w-[58%]">
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
          <a
            className="btn btn-light mt-6"
            href="https://calendly.com/infowendywunder/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quiero agendar una llamada
          </a>
          <Socials className="mt-5" />
        </div>

        <div className="flex items-end justify-center md:absolute md:bottom-0 md:right-10 md:h-[80%]">
          <Image src="/wendy-cierre.png" alt="Wendy Wünder celebrando" width={951} height={2475} className="h-auto w-[70%] sm:w-[50%] md:h-full md:w-auto md:max-w-none object-contain object-bottom" />
        </div>
      </div>
    </section>
  );
}
