import { Patient } from 'app/shared/model/patient.model';
import { Doctor } from 'app/shared/model/doctor.model';

export class Account {
  constructor(
    public activated: boolean,
    public authorities: string[],
    public email: string,
    public langKey: string,
    public login: string,
    public imageUrl: string,
    public patient: Patient,
    public doctor: Doctor
  ) {}
}
