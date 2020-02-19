import { IFieldCertificateTempl } from 'app/shared/model/field-certificate-templ.model';

export interface ICertificateTempl {
  id?: number;
  name?: string;
  fieldCertificateTempls?: IFieldCertificateTempl[];
}

export class CertificateTempl implements ICertificateTempl {
  constructor(public id?: number, public name?: string, public fieldCertificateTempls?: IFieldCertificateTempl[]) {}
}
