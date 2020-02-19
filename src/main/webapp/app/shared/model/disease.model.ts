export interface IDisease {
  id?: number;
  name?: string;
  description?: string;
}

export class Disease implements IDisease {
  constructor(public id?: number, public name?: string, public description?: string) {}
}
