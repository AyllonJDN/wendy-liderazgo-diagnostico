import { BRAND } from "@/data/leadership";

export function Star({ size = 16, color = "currentColor", className }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true" className={className}>
      <path d="M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-extrabold tracking-tight text-base">
      <Star size={16} color="var(--yellow)" />
      {BRAND.name}
    </span>
  );
}

export function ResetModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="reset-title">
      <div className="card max-w-md">
        <h2 id="reset-title" className="display text-2xl mb-3">
          ¿Empezar de nuevo?
        </h2>
        <p className="mb-6 text-[var(--muted)]">
          Se borrarán tus respuestas, tus acciones marcadas y tus reflexiones guardadas en este dispositivo. No se puede deshacer.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="btn" onClick={onConfirm} autoFocus>
            Sí, borrar todo
          </button>
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
