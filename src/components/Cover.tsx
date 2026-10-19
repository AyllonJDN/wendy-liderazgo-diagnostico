import Image from "next/image";
import { BLOCKS, BRAND, COVER } from "@/data/leadership";
import { Logo, Socials, Star } from "./ui";

export default function Cover({ onStart }: { onStart: () => void }) {
  return (
    <section className="gradient-bg on-gradient relative overflow-hidden min-h-screen">
      <Star size={40} color="var(--yellow)" className="absolute left-[46%] top-[14%] hidden md:block" />
      <Star size={18} color="#fff" className="absolute left-[8%] top-[48%] hidden md:block" />
      <div className="wrap relative grid md:grid-cols-[1.1fr_1fr] gap-6 md:max-w-[84rem] pt-6 md:pt-8 min-h-screen">
        <div className="flex flex-col pb-10 md:pb-14 z-10">
          <header className="flex items-center justify-between text-sm">
            <Logo />
            <span className="flex items-center gap-4">
              <span className="kicker hidden lg:block">{BRAND.handle}</span>
              <Socials />
            </span>
          </header>

          <div className="mt-12 md:mt-16">
            <p className="kicker mb-5 flex items-center gap-3">
              <Star size={12} color="var(--yellow)" /> {COVER.kicker}
            </p>
            <h1 className="display text-[clamp(2.8rem,8vw,6.2rem)]">
              {COVER.title}
              <br />
              <em className="block">{COVER.highlight}</em>
              {COVER.titleEnd}
            </h1>
            <p className="mt-6 max-w-md text-lg font-medium leading-snug">{COVER.subtitle}</p>
          </div>

          <ol className="mt-10 grid sm:grid-cols-2 gap-x-8 max-w-xl">
            {BLOCKS.map((b) => (
              <li key={b.id} className="border-t border-white/50 py-3 flex gap-3">
                <span className="font-extrabold italic text-[var(--yellow)]">0{b.id}</span>
                <span>
                  <strong className="block font-extrabold">{b.title}</strong>
                  <span className="text-sm opacity-90">{b.territory}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <button className="btn btn-light" onClick={onStart}>
              Empezar →
            </button>
            <p className="text-sm">
              <strong className="kicker block">{COVER.time}</strong>
              {COVER.note}
            </p>
          </div>
        </div>

        <div className="relative flex items-end justify-center md:justify-end self-end">
          <Image
            src="/wendy-portada.png"
            alt="Wendy Wünder"
            width={919}
            height={1733}
            priority
            className="h-auto w-[78%] sm:w-[60%] md:w-full max-w-[36rem] md:max-h-[98vh] object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
