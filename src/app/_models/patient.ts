import { Wound } from "@models/Wound";

export class Patient {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  birthdate: Date;
  creationDate: Date;
  reference: boolean;
  wounds: Wound[];
};