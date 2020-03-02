import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { IUserType, UserType } from 'app/shared/model/user_type.model';
import { RegisterModalService } from 'app/shared/registerModal/register-modal.service';
import { HttpResponse } from '@angular/common/http';
import { IPerson } from 'app/shared/model/person.model';

@Component({
  selector: 'jhi-login-modal',
  templateUrl: 'register-modal.component.html'
})
export class RegisterModalComponent implements OnInit {
  public typeUser = '';

  private userTypes: UserType[] = [];

  constructor(public activeModal: NgbActiveModal, private router: Router, public registerModalService: RegisterModalService) {}

  ngOnInit(): void {
    this.registerModalService.findAll().subscribe((userTypes: HttpResponse<IUserType[]>) => {
      this.userTypes = userTypes.body || [];
    });
  }

  next(): void {
    this.router.navigate(['admin/register', this.typeUser]);
    this.activeModal.dismiss('closed');
  }
}
