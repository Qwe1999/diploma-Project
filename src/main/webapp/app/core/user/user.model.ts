import { IDoctor } from 'app/shared/model/doctor.model';
import { IPatient } from 'app/shared/model/patient.model';

export interface IUser {
  id?: any;
  login?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: string[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
  doctor?: IDoctor;
  patient?: IPatient;
  typeUser?: string;
}

export class User implements IUser {
  constructor(
    public id?: any,
    public login?: string,
    public email?: string,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: string[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public password?: string,
    public doctor?: IDoctor,
    public patient?: IPatient,
    public typeUser?: string
  ) {}
}
