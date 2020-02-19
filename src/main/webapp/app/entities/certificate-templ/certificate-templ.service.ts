import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICertificateTempl } from 'app/shared/model/certificate-templ.model';

type EntityResponseType = HttpResponse<ICertificateTempl>;
type EntityArrayResponseType = HttpResponse<ICertificateTempl[]>;

@Injectable({ providedIn: 'root' })
export class CertificateTemplService {
  public resourceUrl = SERVER_API_URL + 'api/certificate-templs';

  constructor(protected http: HttpClient) {}

  create(certificateTempl: ICertificateTempl): Observable<EntityResponseType> {
    return this.http.post<ICertificateTempl>(this.resourceUrl, certificateTempl, { observe: 'response' });
  }

  update(certificateTempl: ICertificateTempl): Observable<EntityResponseType> {
    return this.http.put<ICertificateTempl>(this.resourceUrl, certificateTempl, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICertificateTempl>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICertificateTempl[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
