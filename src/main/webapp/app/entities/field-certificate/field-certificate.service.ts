import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFieldCertificate } from 'app/shared/model/field-certificate.model';

type EntityResponseType = HttpResponse<IFieldCertificate>;
type EntityArrayResponseType = HttpResponse<IFieldCertificate[]>;

@Injectable({ providedIn: 'root' })
export class FieldCertificateService {
  public resourceUrl = SERVER_API_URL + 'api/field-certificates';

  constructor(protected http: HttpClient) {}

  create(fieldCertificate: IFieldCertificate): Observable<EntityResponseType> {
    return this.http.post<IFieldCertificate>(this.resourceUrl, fieldCertificate, { observe: 'response' });
  }

  update(fieldCertificate: IFieldCertificate): Observable<EntityResponseType> {
    return this.http.put<IFieldCertificate>(this.resourceUrl, fieldCertificate, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFieldCertificate>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFieldCertificate[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
