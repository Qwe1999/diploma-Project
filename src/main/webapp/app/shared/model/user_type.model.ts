export interface IUserType {
  name?: string;
}

export class UserType implements IUserType {
  constructor(public name?: string) {}
}
