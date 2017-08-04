import { Documentation } from "@models/Documentation";

export class Wound {
  position: number;
  type: string;
  reason: string;
  documentations: [Documentation];
};