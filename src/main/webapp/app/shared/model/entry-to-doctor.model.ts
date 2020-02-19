import { Moment } from 'moment';
import { IPatient } from 'app/shared/model/patient.model';
import { IDoctor } from 'app/shared/model/doctor.model';

export interface IEntryToDoctor {
  id?: number;
  date?: Moment;
  patient?: IPatient;
  doctor?: IDoctor;
}

export class EntryToDoctor implements IEntryToDoctor {
  constructor(public id?: number, public date?: Moment, public patient?: IPatient, public doctor?: IDoctor) {}
}
