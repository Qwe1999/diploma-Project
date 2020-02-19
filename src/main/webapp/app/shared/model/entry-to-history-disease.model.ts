import { Moment } from 'moment';
import { IMedicalTest } from 'app/shared/model/medical-test.model';
import { IPatient } from 'app/shared/model/patient.model';

export interface IEntryToHistoryDisease {
  id?: number;
  diseaseName?: string;
  diseaseDescription?: string;
  treatment?: string;
  date?: Moment;
  medicalTests?: IMedicalTest[];
  patient?: IPatient;
}

export class EntryToHistoryDisease implements IEntryToHistoryDisease {
  constructor(
    public id?: number,
    public diseaseName?: string,
    public diseaseDescription?: string,
    public treatment?: string,
    public date?: Moment,
    public medicalTests?: IMedicalTest[],
    public patient?: IPatient
  ) {}
}
