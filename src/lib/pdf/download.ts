import type { PdfData } from "./DiagnosisPdf";

/** Genera el PDF en el navegador (carga diferida de @react-pdf/renderer) y lo descarga. */
export async function downloadDiagnosisPdf(data: Omit<PdfData, "origin">) {
  const [{ pdf }, { DiagnosisPdf }] = await Promise.all([import("@react-pdf/renderer"), import("./DiagnosisPdf")]);
  const blob = await pdf(DiagnosisPdf({ ...data, origin: window.location.origin })).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mi-diagnostico-de-liderazgo-wendy-wunder.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
