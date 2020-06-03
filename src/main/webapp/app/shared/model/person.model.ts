export interface IPerson {
  id?: number;
  firstName?: string;
  lastName?: string;
  country?: string;
  region?: string;
  locality?: string;
  streat?: string;
  building?: string;
  apartment?: string;
  phoneNumber?: string;
}

export class Person implements IPerson {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public country?: string,
    public region?: string,
    public locality?: string,
    public streat?: string,
    public building?: string,
    public apartment?: string,
    public phoneNumber?: string
  ) {}
}
