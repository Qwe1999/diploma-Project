import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDisease } from 'app/shared/model/disease.model';

type EntityResponseType = HttpResponse<IDisease>;
type EntityArrayResponseType = HttpResponse<IDisease[]>;

@Injectable({ providedIn: 'root' })
export class DiseaseService {
  public resourceUrl = SERVER_API_URL + 'api/diseases';

  constructor(protected http: HttpClient) {}

  create(disease: IDisease): Observable<EntityResponseType> {
    return this.http.post<IDisease>(this.resourceUrl, disease, { observe: 'response' });
  }

  update(disease: IDisease): Observable<EntityResponseType> {
    return this.http.put<IDisease>(this.resourceUrl, disease, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDisease>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDisease[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
