import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDoctor } from 'app/shared/model/doctor.model';

type EntityResponseType = HttpResponse<IDoctor>;
type EntityArrayResponseType = HttpResponse<IDoctor[]>;

@Injectable({ providedIn: 'root' })
export class DoctorService {
  public resourceUrl = SERVER_API_URL + 'api/doctors';

  constructor(protected http: HttpClient) {}

  create(doctor: IDoctor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(doctor);
    return this.http
      .post<IDoctor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(doctor: IDoctor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(doctor);
    return this.http
      .put<IDoctor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDoctor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDoctor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(doctor: IDoctor): IDoctor {
    const copy: IDoctor = Object.assign({}, doctor, {
      workingHourBegin:
        doctor.workingHourBegin && doctor.workingHourBegin.isValid() ? doctor.workingHourBegin.format(DATE_FORMAT) : undefined,
      workingHourEnd: doctor.workingHourEnd && doctor.workingHourEnd.isValid() ? doctor.workingHourEnd.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.workingHourBegin = res.body.workingHourBegin ? moment(res.body.workingHourBegin) : undefined;
      res.body.workingHourEnd = res.body.workingHourEnd ? moment(res.body.workingHourEnd) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((doctor: IDoctor) => {
        doctor.workingHourBegin = doctor.workingHourBegin ? moment(doctor.workingHourBegin) : undefined;
        doctor.workingHourEnd = doctor.workingHourEnd ? moment(doctor.workingHourEnd) : undefined;
      });
    }
    return res;
  }
}
