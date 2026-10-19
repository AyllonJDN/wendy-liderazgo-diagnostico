import { Document, Font, Image, Page, Path, Rect, Defs, LinearGradient, Stop, Svg, StyleSheet, Text, View } from "@react-pdf/renderer";
import { BLOCKS, BRAND, CLOSING, COVER, LEVELS, PLAN, PROFILES } from "@/data/leadership";
import { actionKey, type Diagnosis } from "@/lib/diagnosis";

export type PdfData = {
  diagnosis: Diagnosis;
  done: Record<string, boolean>;
  insight: string;
  commitment: string;
  retestLabel: string;
  dateLabel: string;
  origin: string; // para resolver las imágenes en el navegador
};

// Permite cortar palabras muy largas (p. ej. texto pegado sin espacios) para que no desborden.
Font.registerHyphenationCallback((word) => (word.length > 24 ? (word.match(/.{1,24}/g) ?? [word]) : [word]));

const C = { orange: "#FF7A00", red: "#F0322E", magenta: "#C8157A", yellow: "#FFD21F", ink: "#111111", muted: "#5B5B5B", line: "#D9D9D9", cream: "#FFF6EF" };

const s = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10.5, color: C.ink, paddingTop: 48, paddingBottom: 56, paddingHorizontal: 44, backgroundColor: "#FFFFFF" },
  footer: { position: "absolute", bottom: 24, left: 44, right: 44, flexDirection: "row", justifyContent: "space-between", fontSize: 8, color: C.muted, borderTopWidth: 0.5, borderTopColor: C.line, paddingTop: 8 },
  kicker: { fontSize: 8, fontWeight: 700, letterSpacing: 2.4, color: C.magenta, marginBottom: 8 },
  h1: { fontSize: 34, fontWeight: 700, lineHeight: 1.02, marginBottom: 6 },
  em: { fontFamily: "Helvetica", fontWeight: 700, fontStyle: "italic", color: C.magenta },
  h2: { fontSize: 18, fontWeight: 700, marginBottom: 8 },
  p: { lineHeight: 1.45 },
  card: { borderWidth: 0.75, borderColor: C.line, borderRadius: 8, padding: 12 },
  row: { flexDirection: "row" },
});

function Footer() {
  return (
    <View style={s.footer} fixed>
      <Text>{BRAND.footer}</Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  );
}

function Check({ on }: { on: boolean }) {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" style={{ marginTop: 1 }}>
      <Rect x={0.75} y={0.75} width={10.5} height={10.5} rx={2} stroke={C.ink} strokeWidth={1} fill={on ? C.ink : "#FFFFFF"} />
      {on && <Path d="M3 6.2 L5.2 8.4 L9 3.6" stroke={C.yellow} strokeWidth={1.6} fill="none" />}
    </Svg>
  );
}

function Spark({ size, color, style }: { size: number; color: string; style?: React.ComponentProps<typeof Svg>["style"] }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Path d="M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z" fill={color} />
    </Svg>
  );
}

export function DiagnosisPdf({ diagnosis: d, done, insight, commitment, retestLabel, dateLabel, origin }: PdfData) {
  const profile = PROFILES[d.profile];
  const priority = BLOCKS[d.priority];
  const completed = d.planOrder.reduce((n, b) => n + BLOCKS[b].week.filter((_, i) => done[actionKey(b, i)]).length, 0);
  const hasReflections = insight.trim() || commitment.trim();

  return (
    <Document title="Mi diagnóstico de liderazgo · Wendy Wünder" author="Wendy Wünder" language="es">
      {/* Portada */}
      <Page size="A4" style={{ padding: 0, backgroundColor: C.red }}>
        <Svg width={595} height={841} style={{ position: "absolute", top: 0, left: 0 }}>
          <Defs>
            <LinearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#FF8A00" />
              <Stop offset="0.4" stopColor="#FF4A1C" />
              <Stop offset="0.7" stopColor="#E0213F" />
              <Stop offset="1" stopColor="#C0127F" />
            </LinearGradient>
          </Defs>
          <Rect x={0} y={0} width={595} height={841} fill="url(#g)" />
        </Svg>
        <Image src={`${origin}/wendy-portada.png`} style={{ position: "absolute", right: 24, bottom: 0, width: 255, height: 481 }} />
        <Spark size={30} color={C.yellow} style={{ position: "absolute", left: 300, top: 120 }} />
        <View style={{ paddingTop: 48, paddingLeft: 44, width: 380 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 70 }}>
            <Spark size={12} color={C.yellow} />
            <Text style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 12, marginLeft: 6 }}>{BRAND.name}</Text>
          </View>
          <Text style={{ color: "#FFFFFF", fontSize: 8, letterSpacing: 3, fontWeight: 700, marginBottom: 12 }}>MI DIAGNÓSTICO</Text>
          <Text style={{ color: "#FFFFFF", fontSize: 44, fontWeight: 700, lineHeight: 1 }}>{COVER.title}</Text>
          <Text style={{ color: "#FFFFFF", fontSize: 64, fontWeight: 700, fontStyle: "italic", lineHeight: 1 }}>{COVER.highlight}</Text>
          <Text style={{ color: "#FFFFFF", fontSize: 44, fontWeight: 700, lineHeight: 1 }}>{COVER.titleEnd}</Text>
          <Text style={{ color: "#FFFFFF", fontSize: 13, marginTop: 18, lineHeight: 1.35, width: 280 }}>{COVER.subtitle}</Text>
          <View style={{ marginTop: 34, borderTopWidth: 0.75, borderTopColor: "#FFFFFF", paddingTop: 10, width: 260 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 9, fontWeight: 700, letterSpacing: 2 }}>{dateLabel.toUpperCase()}</Text>
            <Text style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 700, marginTop: 6 }}>
              {d.total} / 100 · {profile.name}
            </Text>
          </View>
        </View>
        <Text style={{ position: "absolute", left: 44, bottom: 30, color: "#FFFFFF", fontSize: 9 }}>{BRAND.handle}</Text>
      </Page>

      {/* Resultados */}
      <Page size="A4" style={s.page}>
        <Footer />
        <Text style={s.kicker}>TUS RESULTADOS · {dateLabel.toUpperCase()}</Text>
        <Text style={s.h1}>
          ¿Qué dice <Text style={s.em}>tu puntaje?</Text>
        </Text>

        <View style={[s.row, { marginTop: 16, marginBottom: 14 }]} wrap={false}>
          <View style={{ width: 170, backgroundColor: C.red, borderRadius: 8, padding: 14, marginRight: 12 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 8, letterSpacing: 2, fontWeight: 700 }}>TOTAL</Text>
            <Text style={{ color: "#FFFFFF", fontSize: 44, fontWeight: 700, marginTop: 4 }}>
              {d.total}
              <Text style={{ fontSize: 16 }}> / 100</Text>
            </Text>
            <Text style={{ color: "#FFFFFF", fontWeight: 700, marginTop: 6 }}>
              {profile.range} · {profile.name}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={[s.h2, { fontSize: 14 }]}>Tu perfil total: {profile.name}</Text>
            <Text style={s.p}>{profile.text}</Text>
          </View>
        </View>

        {BLOCKS.map((b, i) => {
          const level = LEVELS[d.levels[i]];
          return (
            <View key={b.id} style={[s.card, { marginBottom: 8, flexDirection: "row" }]} wrap={false}>
              <View style={{ width: 92 }}>
                <Text style={{ fontSize: 8, color: C.muted, fontWeight: 700 }}>0{b.id} · {b.title.toUpperCase()}</Text>
                <Text style={{ fontSize: 26, fontWeight: 700, marginTop: 2 }}>
                  {d.scores[i]}
                  <Text style={{ fontSize: 11, color: C.muted }}> / 25</Text>
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 700, marginBottom: 2 }}>
                  {level.range} · {level.name}
                  {d.priority === i ? "  ·  Bloque más bajo" : ""}
                </Text>
                <Text style={s.p}>{level.text}</Text>
              </View>
            </View>
          );
        })}

        <View style={{ marginTop: 10, backgroundColor: C.cream, borderRadius: 8, padding: 14 }} wrap={false}>
          <Text style={s.kicker}>BLOQUE PRIORITARIO</Text>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>
            0{priority.id} {priority.title} <Text style={{ fontSize: 11 }}>→ empiezo por ahí.</Text>
          </Text>
          {d.tied.length > 1 && (
            <Text style={[s.p, { marginTop: 6, color: C.muted }]}>
              Hay empate de {d.scores[d.priority]} puntos entre {d.tied.map((i) => BLOCKS[i].title).join(", ")}. Se toma el primero según el orden original de los bloques.
            </Text>
          )}
        </View>
      </Page>

      {/* Plan */}
      <Page size="A4" style={s.page}>
        <Footer />
        <Text style={s.kicker}>{PLAN.kicker}</Text>
        <Text style={s.h1}>
          30 días, <Text style={s.em}>4 pasos.</Text>
        </Text>
        <Text style={[s.p, { marginBottom: 6 }]}>{PLAN.text}</Text>
        <Text style={{ fontWeight: 700, marginBottom: 12 }}>
          Acciones cumplidas: {completed} / 12
        </Text>
        {d.planOrder.map((b, step) => {
          const block = BLOCKS[b];
          return (
            <View key={block.id} style={[s.card, { marginBottom: 10 }]} wrap={false}>
              <Text style={s.kicker}>
                SEMANA {block.id} · PASO {step + 1} DE 4
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 700, fontStyle: "italic", marginBottom: 6 }}>{block.title}</Text>
              {block.week.map((text, i) => {
                const on = !!done[actionKey(b, i)];
                return (
                  <View key={i} style={[s.row, { paddingVertical: 4, borderTopWidth: 0.5, borderTopColor: C.line }]} wrap={false}>
                    <Check on={on} />
                    <Text style={[s.p, { flex: 1, marginLeft: 8 }]}>{text}</Text>
                    <Text style={{ width: 58, textAlign: "right", fontSize: 8, fontWeight: 700, color: on ? C.magenta : C.muted }}>{on ? "CUMPLIDA" : "PENDIENTE"}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </Page>

      {/* Cierre */}
      <Page size="A4" style={s.page}>
        <Footer />
        <Text style={s.kicker}>{CLOSING.kicker}</Text>
        <Text style={s.h1}>
          {CLOSING.title} <Text style={s.em}>{CLOSING.titleEm}</Text>
        </Text>

        {hasReflections ? (
          <View style={{ marginTop: 12 }}>
            {insight.trim() ? (
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontWeight: 700, marginBottom: 4 }}>{CLOSING.fields.insight}</Text>
                <Text style={s.p}>{insight.trim()}</Text>
              </View>
            ) : null}
            {commitment.trim() ? (
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontWeight: 700, marginBottom: 4 }}>{CLOSING.fields.commitment}</Text>
                <Text style={s.p}>{commitment.trim()}</Text>
              </View>
            ) : null}
          </View>
        ) : null}

        <Text style={{ fontWeight: 700, marginTop: 6 }}>
          {CLOSING.fields.retest} <Text style={{ color: C.magenta }}>{retestLabel}</Text>
        </Text>

        <View style={{ marginTop: 22, backgroundColor: C.red, borderRadius: 8, padding: 16 }} wrap={false}>
          <Text style={{ color: "#FFFFFF", fontSize: 13 }}>{CLOSING.ctaLead}</Text>
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, fontStyle: "italic", marginBottom: 6 }}>{CLOSING.ctaStrong}</Text>
          <Text style={{ color: "#FFFFFF", lineHeight: 1.4 }}>{CLOSING.ctaText}</Text>
          <Text style={{ color: "#FFFFFF", fontWeight: 700, marginTop: 8 }}>{CLOSING.contacts.join("   ·   ")}</Text>
        </View>

        <View style={{ marginTop: 20 }} wrap={false}>
          <Text style={[s.kicker, { color: C.muted }]}>{CLOSING.sourcesTitle}</Text>
          <Text style={[s.p, { fontSize: 9, color: C.muted }]}>{CLOSING.sources.join(" · ")}.</Text>
        </View>
      </Page>
    </Document>
  );
}
