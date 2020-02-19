import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMedicalTest } from 'app/shared/model/medical-test.model';

type EntityResponseType = HttpResponse<IMedicalTest>;
type EntityArrayResponseType = HttpResponse<IMedicalTest[]>;

@Injectable({ providedIn: 'root' })
export class MedicalTestService {
  public resourceUrl = SERVER_API_URL + 'api/medical-tests';

  constructor(protected http: HttpClient) {}

  create(medicalTest: IMedicalTest): Observable<EntityResponseType> {
    return this.http.post<IMedicalTest>(this.resourceUrl, medicalTest, { observe: 'response' });
  }

  update(medicalTest: IMedicalTest): Observable<EntityResponseType> {
    return this.http.put<IMedicalTest>(this.resourceUrl, medicalTest, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMedicalTest>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMedicalTest[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
