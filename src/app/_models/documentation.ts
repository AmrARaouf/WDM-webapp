export class Documentation {
  _id: string;
  date: Date;
  length: number;
  width: number;
  affectedTissue: number;
  color: number;
  exsudat: number;
  edge: [number];
  symptoms: [number];
  assessment: number;
  comment: string;
  img: string;

  constructor() {
    this._id = "";
    this.date = new Date();
    this.length = 0;
    this.width = 0;
    this.affectedTissue = 0;
    this.color = 0;
    this.exsudat = 0;
    this.edge = [0];
    this.symptoms = [0];
    this.assessment = 0;
    this.comment = '';
    this.img = '';
  }
};