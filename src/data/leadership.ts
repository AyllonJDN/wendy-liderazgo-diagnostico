export type Block = {
  id: 1 | 2 | 3 | 4;
  title: string;
  territory: string;
  question: string;
  items: string[];
  week: string[];
};

export const BLOCKS: Block[] = [
  {
    id: 1,
    title: "Conócete",
    territory: "Ego, inseguridades y responsabilidad",
    question: "Antes de dirigir a otros, ¿cómo te diriges a ti?",
    items: [
      "Reconozco mis errores frente a mi equipo sin ponerme a la defensiva.",
      "Pido opiniones sinceras sobre mi forma de liderar.",
      "Sé qué situaciones me hacen perder la calma y las manejo antes de reaccionar.",
      "Puedo decir «no sé» sin sentir que pierdo autoridad.",
      "Cuando algo sale mal, asumo mi parte antes de buscar culpables.",
    ],
    week: [
      "Pregunta a 3 personas: «¿Qué debería empezar, dejar y seguir haciendo como líder?». Solo escucha y agradece.",
      "Anota cada día una situación en la que reaccionaste en automático y qué la provocó.",
      "Di en voz alta «me equivoqué, esto es lo que voy a corregir» al menos una vez.",
    ],
  },
  {
    id: 2,
    title: "Da claridad",
    territory: "Visión, metas y expectativas",
    question: "¿Tu equipo sabe a dónde va y qué se espera de él?",
    items: [
      "Mi equipo puede explicar con sus palabras hacia dónde vamos.",
      "Cada persona sabe exactamente qué se espera de ella.",
      "Explico el porqué de mis decisiones, no solo el qué.",
      "Comparto a tiempo la información que mi equipo necesita para trabajar.",
      "Defino prioridades y digo que no a lo que nos distrae de la meta.",
    ],
    week: [
      "Escribe en una sola frase la meta del equipo para este trimestre y compártela.",
      "Ten 15 minutos a solas con cada persona para acordar 3 expectativas claras.",
      "Cierra cada reunión con: quién hace qué y para cuándo.",
    ],
  },
  {
    id: 3,
    title: "Escucha",
    territory: "Comunicación y seguridad para opinar",
    question: "¿Tu equipo se siente seguro para hablar contigo?",
    items: [
      "Dejo que la otra persona termine de hablar antes de responder.",
      "Mi equipo se atreve a contradecirme o a proponer ideas distintas.",
      "Cuando alguien se equivoca, primero pregunto qué pasó en vez de culpar.",
      "En las reuniones hago más preguntas que afirmaciones.",
      "Me intereso por cómo está cada persona, no solo por sus resultados.",
    ],
    week: [
      "En cada reunión, habla al final. Primero escucha a todos.",
      "Antes de dar tu opinión, haz 3 preguntas para entender mejor.",
      "Ante un error, responde: «Gracias por avisar. ¿Qué aprendimos?».",
    ],
  },
  {
    id: 4,
    title: "Haz crecer",
    territory: "Delegar, dar feedback y acompañar",
    question: "¿Controlas el trabajo o desarrollas a las personas?",
    items: [
      "Delego tareas completas, con autonomía para decidir cómo hacerlas.",
      "Doy feedback concreto a cada persona al menos una vez por semana.",
      "Reconozco el buen trabajo de forma específica, no solo con un «bien hecho».",
      "Converso con cada persona sobre su crecimiento y sus metas.",
      "Resisto la tentación de revisar y corregir cada detalle.",
    ],
    week: [
      "Delega una tarea completa con resultado y fecha, y no intervengas en el cómo.",
      "Da a cada persona un feedback específico: qué hizo, qué impacto tuvo, qué seguir haciendo.",
      "Agenda una conversación sobre su crecimiento: ¿a dónde quiere llegar?",
    ],
  },
];

/** Encabezado completo del bloque 4 tal como aparece en las páginas de preguntas. */
export const BLOCK_HEADING = ["Conócete", "Da claridad", "Escucha", "Haz crecer a tu gente"];

export const COVER = {
  kicker: "GUÍA GRATUITA",
  title: "¿Qué tan buen",
  highlight: "LÍDER",
  titleEnd: "eres?",
  subtitle: "Autodiagnóstico de 20 preguntas + plan de 30 días para liderar sin controlar.",
  time: "TIEMPO: 10 MINUTOS",
  note: "Necesitas un lápiz y mucha honestidad.",
};

export const INTRO = {
  kicker: "ANTES DE EMPEZAR",
  title: "Liderar se aprende.",
  body: "La mayoría de jefes no fallan por mala intención: fallan porque los ascendieron por ser buenos en lo técnico y nadie les enseñó a guiar personas. La buena noticia es que lo que hace a un buen líder son conductas concretas, y las conductas se entrenan.",
  stats: [
    { figure: "70%", text: "de las diferencias en el compromiso de un equipo se explican por su jefe directo.", source: "Gallup" },
    { figure: "#1", text: "La seguridad para opinar sin miedo fue el factor más importante de los equipos efectivos.", source: "Google, Project Aristotle" },
    { figure: "80%", text: "de quienes recibieron feedback significativo en la última semana estaban plenamente comprometidos.", source: "Gallup" },
  ],
  howTitle: "Cómo usar esta guía",
  steps: [
    { lead: "Responde pensando en las últimas 4 semanas.", rest: "No en cómo te gustaría ser, sino en lo que realmente hiciste." },
    { lead: "Marca un número del 1 al 5", rest: "en cada afirmación. Al final de cada bloque verás tu subtotal." },
    { lead: "Empieza el plan de 30 días por tu bloque más bajo.", rest: "Un cambio pequeño y constante vale más que diez buenas intenciones." },
  ],
  scaleTitle: "LA ESCALA",
  scale: [
    { value: 1, label: "Nunca" },
    { value: 2, label: "Casi nunca" },
    { value: 3, label: "A veces" },
    { value: 4, label: "Casi siempre" },
    { value: 5, label: "Siempre" },
  ],
};

export const LEVELS = {
  alerta: { range: "5–12", name: "Alerta", text: "Aquí está tu mayor oportunidad. Empieza el plan por este bloque." },
  construccion: { range: "13–19", name: "En construcción", text: "Tienes la base, pero falta constancia. Elige una acción y repítela 4 semanas." },
  fortaleza: { range: "20–25", name: "Fortaleza", text: "Es tu ventaja. Úsala para sostener los bloques más débiles y enseñar a otros." },
} as const;

export const PROFILES = {
  jefe: { range: "20–49", name: "Modo jefe", text: "Hoy lideras más desde el control que desde la confianza. Es el punto de partida más común, y el que más rápido mejora con práctica." },
  construccion: { range: "50–79", name: "Líder en construcción", text: "Tu equipo ya ve buenas señales. La constancia es lo que te llevará al siguiente nivel." },
  crece: { range: "80–100", name: "Líder que hace crecer", text: "Tu equipo confía en ti. Tu siguiente reto es formar a otros líderes." },
} as const;

export const PLAN = {
  kicker: "PLAN DE ACCIÓN",
  title: "30 días, 4 pasos.",
  text: "Una semana por paso, tres acciones por semana. Si tu bloque más bajo no es el 1, empieza por esa semana y luego sigue el orden. Marca cada acción al cumplirla.",
};

export const CLOSING = {
  kicker: "PARA CERRAR",
  title: "Un líder no nace:",
  titleEm: "se entrena.",
  fields: {
    insight: "Lo que me llevo de este diagnóstico:",
    commitment: "Mi primer compromiso para esta semana:",
    retest: "Vuelvo a hacer este test el:",
  },
  ctaLead: "¿Quieres acompañamiento para dar",
  ctaStrong: "EL SIGUIENTE PASO?",
  ctaText: "Escríbeme «LÍDER» por DM y te cuento cómo trabajamos juntos.",
  contacts: ["@WendyWunderOficial", "jona@wwin.pe", "isabel@wwin.pe"],
  sourcesTitle: "FUENTES",
  sources: [
    "Gallup, State of the American Manager",
    "Gallup, investigaciones sobre feedback y compromiso",
    "Google re:Work, Project Oxygen y Project Aristotle",
    "Amy C. Edmondson, The Fearless Organization",
  ],
};

export const BRAND = {
  name: "Wendy Wünder",
  handle: "@WendyWunderOficial",
  footer: "Wendy Wünder · Autodiagnóstico de liderazgo",
  socials: [
    { id: "instagram", label: "Instagram", url: "https://www.instagram.com/wendywunderoficial/" },
    { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/wendywunder/" },
    { id: "youtube", label: "YouTube", url: "https://www.youtube.com/@wendywunderoficial" },
  ],
};
