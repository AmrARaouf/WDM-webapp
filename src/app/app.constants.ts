export const WOUND_TYPES: string[] = [
  "Venöses Ulcus",
  "Arterielles Ulcus",
  "Venöses u. arterielles (gemischtes) Ulcus",
  "Diabetische Fußläsion",
  "Vaskulitis",
  "Verbrennung",
  "Schrufwunde",
  "Postoperative Wundheilungsstörung",
  "Postoperative Wundversorgung",
  "Dekubitus (Grad )",
  "Erstwunde",
  "Rezidiv"
];

export const WOUND_REASONS: string[] = [
  "Trauma",
  "Diabetes mellitus",
  "Arterielle Verschlusskrankheit",
  "Chronisch venöse Insuffizienz",
  "Polyneuropathie",
  "Immobilität",
  "Infektion systemisch/lokal",
  "Maligner Tumor",
  "Immunosuppression",
  "Adipositas",
  "Mangelernährung (BMI= )",
  "Kachexie"
];

export const DOCUMENTATION_AFFECTED_TISSUE: object[] = [
  { value: 1, label: "Epidermis" },
  { value: 2, label: "Dermis" },
  { value: 3, label: "Subkutis" },
  { value: 4, label: "Faszie, Muskeln, Sehnen" },
  { value: 5, label: "Knochen" }
]

export const DOCUMENTATION_COLOR: object[] = [
  { value: 1, label: "Nekrose (schwarz)" },
  { value: 2, label: "Fibrin (gelb)" },
  { value: 3, label: "Granulation (rot)" },
  { value: 4, label: "Epithel (rosa)" }
]

export const DOCUMENTATION_EXSUDAT: object[] = [
  { value: 1, label: "Keines" },
  { value: 2, label: "Wenig" },
  { value: 3, label: "Mäßig" },
  { value: 4, label: "Viel" }
]

export const DOCUMENTATION_EDGE: string[] = [
  "Unauffälig",
  "Mazeriert",
  "Entzündet, gerötet",
  "Ödematös",
  "Nekrotisch",
  "Besonder-heiten (Taschen, Fisteln)"
]

export const DOCUMENTATION_SYMPTOPMS: string[] = [
  "Schmerzen",
  "Ekzeme",
  "Ödem",
  "Infektion",
  "Geruch"
]

export const DOCUMENTATION_ASSESSMENT: object[] = [
  { value: 1, label: "verbessert" },
  { value: 2, label: "unverändert" },
  { value: 3, label: "verschlechtert" },
  { value: 4, label: "abgeheilt" }
]