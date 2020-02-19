import { IEntryToHistoryDisease } from 'app/shared/model/entry-to-history-disease.model';

export interface IMedicalTest {
  id?: number;
  indicator?: string;
  value?: string;
  imageContentType?: string;
  image?: any;
  entryToHistoryDisease?: IEntryToHistoryDisease;
}

export class MedicalTest implements IMedicalTest {
  constructor(
    public id?: number,
    public indicator?: string,
    public value?: string,
    public imageContentType?: string,
    public image?: any,
    public entryToHistoryDisease?: IEntryToHistoryDisease
  ) {}
}
