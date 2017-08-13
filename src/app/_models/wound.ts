import { Documentation } from "@models/Documentation";

export class Wound {
  _id: string;
  position: number;
  type: string;
  reason: string;
  documentations: Documentation[];
};