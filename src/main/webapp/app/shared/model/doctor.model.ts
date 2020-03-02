import { Moment } from 'moment';
import { IPerson } from 'app/shared/model/person.model';
import { IPatient } from 'app/shared/model/patient.model';
import { IEntryToDoctor } from 'app/shared/model/entry-to-doctor.model';
import { Day } from 'app/shared/model/enumerations/day.model';

export interface IDoctor {
  id?: number;
  position?: string;
  room?: string;
  workingHourBegin?: Moment;
  workingHourEnd?: Moment;
  daysWork?: Day[];
  person?: IPerson;
  patients?: IPatient[];
  entryToDoctor?: IEntryToDoctor;
}

export class Doctor implements IDoctor {
  constructor(
    public id?: number,
    public position?: string,
    public room?: string,
    public workingHourBegin?: Moment,
    public workingHourEnd?: Moment,
    public daysWork?: Day[],
    public person?: IPerson,
    public patients?: IPatient[],
    public entryToDoctor?: IEntryToDoctor
  ) {}
}
