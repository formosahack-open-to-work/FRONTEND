// src/data/conditions.ts

export const CHRONIC_CONDITIONS = [
  "Alzheimer",
  "Ansiedad",
  "Artritis reumatoide",
  "Asma",
  "Autismo",
  "Cáncer",
  "Depresión",
  "Diabetes tipo 1",
  "Diabetes tipo 2",
  "Epilepsia",
  "Esclerosis múltiple",
  "Esquizofrenia",
  "Fibromialgia",
  "Hipertensión",
  "Lupus",
  "Migraña crónica",
  "Parkinson",
  "Síndrome de colon irritable (SCI)",
  "Trastorno bipolar",
  "VIH/SIDA",
  "Otra condición no listada",
] as const;

export type ChronicCondition = (typeof CHRONIC_CONDITIONS)[number];

// Opcional: ordenar alfabéticamente (excepto "Otra...")
export const SORTED_CONDITIONS = [
  ...CHRONIC_CONDITIONS.slice(0, -1).sort(),
  "Otra condición no listada",
];
