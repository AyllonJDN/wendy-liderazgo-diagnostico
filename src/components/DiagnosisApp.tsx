"use client";

import { useEffect, useMemo, useState } from "react";
import { addDays, diagnose, emptyAnswers, formatDate, formatISO, isComplete, isValidAnswer, toISODate, type Answers } from "@/lib/diagnosis";
import Cover from "./Cover";
import Intro from "./Intro";
import Questions from "./Questions";
import Results from "./Results";
import Plan from "./Plan";
import Closing from "./Closing";
import { Logo, ResetModal } from "./ui";

type Stage = "cover" | "intro" | "questions" | "results" | "plan" | "closing";

type State = {
  stage: Stage;
  answers: Answers;
  done: Record<string, boolean>;
  insight: string;
  commitment: string;
  retest: string | null;
};

const KEY = "wendy-liderazgo-diagnostico:v1";
const initial = (): State => ({ stage: "cover", answers: emptyAnswers(), done: {}, insight: "", commitment: "", retest: null });
const STAGES: Stage[] = ["cover", "intro", "questions", "results", "plan", "closing"];

function load(): State | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<State>;
    const base = initial();
    const answers = Array.isArray(p.answers) && p.answers.length === 20 ? p.answers.map((v) => (isValidAnswer(v) ? v : null)) : base.answers;
    const stage = STAGES.includes(p.stage as Stage) ? (p.stage as Stage) : "cover";
    const needsAnswers = stage === "results" || stage === "plan" || stage === "closing";
    return {
      stage: needsAnswers && !isComplete(answers) ? "questions" : stage,
      answers,
      done: p.done && typeof p.done === "object" ? p.done : {},
      insight: typeof p.insight === "string" ? p.insight : "",
      commitment: typeof p.commitment === "string" ? p.commitment : "",
      retest: typeof p.retest === "string" ? p.retest : null,
    };
  } catch {
    return null;
  }
}

export default function DiagnosisApp() {
  const [st, setSt] = useState<State>(initial);
  const [ready, setReady] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  useEffect(() => {
    const saved = load();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setSt(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(st));
    } catch {}
  }, [st, ready]);

  useEffect(() => {
    if (ready) window.scrollTo({ top: 0 });
  }, [st.stage, ready]);

  const diagnosis = useMemo(() => diagnose(st.answers), [st.answers]);
  const patch = (p: Partial<State>) => setSt((s) => ({ ...s, ...p }));
  const go = (stage: Stage) => patch({ stage });
  const started = st.stage !== "cover";

  const finish = () => {
    if (isComplete(st.answers)) go("results");
  };

  const reset = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setSt(initial());
    setConfirmReset(false);
  };

  const download = async () => {
    if (!diagnosis) return;
    setPdfBusy(true);
    setPdfError(false);
    try {
      const { downloadDiagnosisPdf } = await import("@/lib/pdf/download");
      const now = new Date();
      await downloadDiagnosisPdf({
        diagnosis,
        done: st.done,
        insight: st.insight,
        commitment: st.commitment,
        retestLabel: formatISO(st.retest ?? toISODate(addDays(now, 30))),
        dateLabel: formatDate(now),
      });
    } catch {
      setPdfError(true);
    } finally {
      setPdfBusy(false);
    }
  };

  if (!ready) return <main className="min-h-screen gradient-bg" aria-busy="true" />;

  const nav: { stage: Stage; label: string }[] = [
    { stage: "results", label: "Resultados" },
    { stage: "plan", label: "Plan de 30 días" },
    { stage: "closing", label: "Cierre" },
  ];

  return (
    <>
      {started && st.stage !== "questions" && (
        <header className="bg-white border-b border-[var(--line)] sticky top-0 z-40">
          <div className="wrap flex items-center justify-between gap-4 py-3">
            <Logo />
            <nav aria-label="Secciones" className="flex items-center gap-1 sm:gap-4 text-sm font-bold">
              {diagnosis &&
                nav.map((n) => (
                  <button key={n.stage} className="link-btn" aria-current={st.stage === n.stage ? "page" : undefined} style={{ textDecoration: st.stage === n.stage ? "underline" : "none", color: st.stage === n.stage ? "var(--magenta)" : undefined }} onClick={() => go(n.stage)}>
                    {n.label}
                  </button>
                ))}
              <button className="link-btn !font-semibold text-[var(--muted)]" onClick={() => setConfirmReset(true)}>
                Empezar de nuevo
              </button>
            </nav>
          </div>
        </header>
      )}

      <main className="flex-1">
        {st.stage === "cover" && <Cover onStart={() => go("intro")} />}
        {st.stage === "intro" && <Intro onNext={() => patch({ stage: "questions" })} onBack={() => go("cover")} />}
        {st.stage === "questions" && (
          <Questions
            answers={st.answers}
            complete={!!diagnosis}
            onAnswer={(i, v) => setSt((s) => ({ ...s, answers: s.answers.map((a, j) => (j === i ? v : a)) }))}
            onFinish={finish}
            onIntro={() => go("intro")}
          />
        )}
        {st.stage === "results" && diagnosis && <Results d={diagnosis} onPlan={() => go("plan")} onEdit={() => go("questions")} />}
        {st.stage === "plan" && diagnosis && <Plan d={diagnosis} done={st.done} onToggle={(k) => setSt((s) => ({ ...s, done: { ...s.done, [k]: !s.done[k] } }))} onNext={() => go("closing")} />}
        {st.stage === "closing" && diagnosis && (
          <Closing insight={st.insight} commitment={st.commitment} retest={st.retest} onChange={patch} onDownload={download} pdfBusy={pdfBusy} pdfError={pdfError} />
        )}
      </main>

      {st.stage === "questions" && (
        <div className="gradient-bg on-gradient pb-6 text-center">
          <button className="link-btn" onClick={() => setConfirmReset(true)}>
            Empezar de nuevo
          </button>
        </div>
      )}
      {confirmReset && <ResetModal onCancel={() => setConfirmReset(false)} onConfirm={reset} />}
    </>
  );
}
