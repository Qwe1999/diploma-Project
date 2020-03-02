import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from 'app/shared/registerModal/register-modal.component';
import { Observable } from 'rxjs';
import { IPatient } from 'app/shared/model/patient.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IUserType } from 'app/shared/model/user_type.model';
import { SERVER_API_URL } from 'app/app.constants';

type EntityArrayResponseType = HttpResponse<IUserType[]>;

@Injectable({ providedIn: 'root' })
export class RegisterModalService {
  private isOpen = false;
  public resourceUrl = SERVER_API_URL + 'api/users/authorities';

  constructor(private modalService: NgbModal, protected http: HttpClient) {}

  open(): void {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef: NgbModalRef = this.modalService.open(RegisterModalComponent);
    modalRef.result.finally(() => (this.isOpen = false));
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IUserType[]>(this.resourceUrl, { observe: 'response' });
  }
}
