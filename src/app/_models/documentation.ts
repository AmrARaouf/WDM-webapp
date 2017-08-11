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
    length = 0;
    width = 0;
    affectedTissue = 0;
    color = 0;
    exsadat = 0;
    edge = [];
    symptoms = [];
    assessment = 0;
    comment = '';
    img = '';
  }
};