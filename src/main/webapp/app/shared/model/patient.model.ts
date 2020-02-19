import { IPerson } from 'app/shared/model/person.model';
import { IEntryToHistoryDisease } from 'app/shared/model/entry-to-history-disease.model';
import { ICertificate } from 'app/shared/model/certificate.model';
import { IEntryToDoctor } from 'app/shared/model/entry-to-doctor.model';
import { IDoctor } from 'app/shared/model/doctor.model';
import { BloodType } from 'app/shared/model/enumerations/blood-type.model';

export interface IPatient {
  id?: number;
  allergy?: string;
  bloodType?: BloodType;
  job?: string;
  person?: IPerson;
  entryToHistoryDiseases?: IEntryToHistoryDisease[];
  certificates?: ICertificate[];
  entryToDoctor?: IEntryToDoctor;
  doctors?: IDoctor[];
}

export class Patient implements IPatient {
  constructor(
    public id?: number,
    public allergy?: string,
    public bloodType?: BloodType,
    public job?: string,
    public person?: IPerson,
    public entryToHistoryDiseases?: IEntryToHistoryDisease[],
    public certificates?: ICertificate[],
    public entryToDoctor?: IEntryToDoctor,
    public doctors?: IDoctor[]
  ) {}
}
