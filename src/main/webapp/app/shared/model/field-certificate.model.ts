import { ICertificate } from 'app/shared/model/certificate.model';

export interface IFieldCertificate {
  id?: number;
  nameField?: string;
  value?: string;
  certificate?: ICertificate;
}

export class FieldCertificate implements IFieldCertificate {
  constructor(public id?: number, public nameField?: string, public value?: string, public certificate?: ICertificate) {}
}
