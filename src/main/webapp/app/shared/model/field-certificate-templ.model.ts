import { ICertificateTempl } from 'app/shared/model/certificate-templ.model';

export interface IFieldCertificateTempl {
  id?: number;
  nameField?: string;
  certificateTempl?: ICertificateTempl;
}

export class FieldCertificateTempl implements IFieldCertificateTempl {
  constructor(public id?: number, public nameField?: string, public certificateTempl?: ICertificateTempl) {}
}
