export class Documentation {
  _id: string;
  date: Date;
  length: number;
  width: number;
  affectedTissue: number;
  color: number;
  exsudat: number;
  edge: string[];
  symptoms: string[];
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
    this.edge = [];
    this.symptoms = [];
    this.assessment = 0;
    this.comment = '';
    this.img = '';
  }
};