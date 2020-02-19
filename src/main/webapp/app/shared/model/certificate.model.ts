import { IFieldCertificate } from 'app/shared/model/field-certificate.model';
import { IPatient } from 'app/shared/model/patient.model';

export interface ICertificate {
  id?: number;
  name?: string;
  fieldCertificates?: IFieldCertificate[];
  patient?: IPatient;
}

export class Certificate implements ICertificate {
  constructor(public id?: number, public name?: string, public fieldCertificates?: IFieldCertificate[], public patient?: IPatient) {}
}
