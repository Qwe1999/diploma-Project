import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEntryToHistoryDisease } from 'app/shared/model/entry-to-history-disease.model';

type EntityResponseType = HttpResponse<IEntryToHistoryDisease>;
type EntityArrayResponseType = HttpResponse<IEntryToHistoryDisease[]>;

@Injectable({ providedIn: 'root' })
export class EntryToHistoryDiseaseService {
  public resourceUrl = SERVER_API_URL + 'api/entry-to-history-diseases';

  constructor(protected http: HttpClient) {}

  create(entryToHistoryDisease: IEntryToHistoryDisease): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(entryToHistoryDisease);
    return this.http
      .post<IEntryToHistoryDisease>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(entryToHistoryDisease: IEntryToHistoryDisease): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(entryToHistoryDisease);
    return this.http
      .put<IEntryToHistoryDisease>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEntryToHistoryDisease>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEntryToHistoryDisease[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(entryToHistoryDisease: IEntryToHistoryDisease): IEntryToHistoryDisease {
    const copy: IEntryToHistoryDisease = Object.assign({}, entryToHistoryDisease, {
      date: entryToHistoryDisease.date && entryToHistoryDisease.date.isValid() ? entryToHistoryDisease.date.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((entryToHistoryDisease: IEntryToHistoryDisease) => {
        entryToHistoryDisease.date = entryToHistoryDisease.date ? moment(entryToHistoryDisease.date) : undefined;
      });
    }
    return res;
  }
}
