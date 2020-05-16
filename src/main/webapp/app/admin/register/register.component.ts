import { Component, AfterViewInit, Renderer, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared/constants/error.constants';
import { ROLE_USER, ROLE_DOCTOR } from 'app/shared/constants/users.onstants';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { RegisterService } from './register.service';
import { ActivatedRoute } from '@angular/router';
import { IUser, User } from 'app/core/user/user.model';
import { IPatient, Patient } from 'app/shared/model/patient.model';
import { IPerson, Person } from 'app/shared/model/person.model';
import { Doctor, IDoctor } from 'app/shared/model/doctor.model';
import { logger } from 'codelyzer/util/logger';
import { BloodType } from 'app/shared/model/enumerations/blood-type.model';

@Component({
  selector: 'jhi-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements AfterViewInit, OnInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;
  doNotMatch = false;
  error = false;
  typeUser = '';
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  bloodTypes = BloodType;
  t = true;
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    country: ['', [Validators.required, Validators.maxLength(100)]],
    region: ['', [Validators.required, Validators.maxLength(100)]],
    locality: ['', [Validators.required, Validators.maxLength(100)]],
    streat: ['', [Validators.required, Validators.maxLength(100)]],
    building: ['', [Validators.required, Validators.maxLength(100)]],
    apartment: ['', [Validators.maxLength(100)]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(100)]],
    firstName: ['', [Validators.required, Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.maxLength(100)]],
    position: ['', [Validators.required, Validators.maxLength(100)]],
    room: ['', [Validators.required, Validators.maxLength(100)]],
    bloodType: ['', [Validators.required, Validators.maxLength(100)]],
    job: ['', [Validators.required, Validators.maxLength(100)]],
    allergy: ['', [Validators.maxLength(100)]]
  });

  constructor(
    private languageService: JhiLanguageService,
    private loginModalService: LoginModalService,
    private registerService: RegisterService,
    private activateRoute: ActivatedRoute,
    private renderer: Renderer,
    private fb: FormBuilder

  ) {}

  ngOnInit(): void {
    this.typeUser = this.activateRoute.snapshot.params['typeUser'];
  }

  ngAfterViewInit(): void {
    if (this.login) {
      this.renderer.invokeElementMethod(this.login.nativeElement, 'focus', []);
    }
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    const password = this.registerForm.get(['password'])!.value;
    if (password !== this.registerForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {
      const email = this.registerForm.get(['email'])!.value;

      const user: IUser = new User();
      user.login = this.registerForm.get(['firstName'])!.value + this.registerForm.get(['lastName'])!.value;
      user.password = password;
      user.langKey = this.languageService.getCurrentLanguage();

      const person: IPerson = new Person();
      person.country = this.registerForm.get(['country'])!.value;
      person.region = this.registerForm.get(['region'])!.value;
      person.locality = this.registerForm.get(['locality'])!.value;
      person.streat = this.registerForm.get(['streat'])!.value;
      person.building = this.registerForm.get(['building'])!.value;
      person.apartment = this.registerForm.get(['apartment'])!.value;
      person.email = this.registerForm.get(['email'])!.value;
      person.firstName = this.registerForm.get(['firstName'])!.value;
      person.lastName = this.registerForm.get(['lastName'])!.value;
      person.phoneNumber = this.registerForm.get(['phoneNumber'])!.value;

      if (this.typeUser === 'ROLE_PATIENT') {
        const patient: IPatient = new Patient();
        patient.allergy = this.registerForm.get(['allergy'])!.value;
        patient.bloodType = this.registerForm.get(['bloodType'])!.value;
        patient.job = this.registerForm.get(['job'])!.value;
        patient.person = person;
        user.patient = patient;
        user.typeUser = 'ROLE_PATIENT';

      } else if (this.typeUser === 'ROLE_DOCTOR') {
        const doctor: IDoctor = new Doctor();
        doctor.position = this.registerForm.get(['position'])!.value;
        doctor.room = this.registerForm.get(['room'])!.value;
        doctor.daysWork = this.registerForm.get(['days'])!.value;
        doctor.person = person;
        user.doctor = doctor;
        user.typeUser = 'ROLE_DOCTOR';
      }

      this.registerService.save(user).subscribe(
        () => (this.success = true),
        response => this.processError(response)
      );
    }
  }

  openLogin(): void {
    this.loginModalService.open();
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }

  isPatient(): boolean {
    return this.typeUser === 'ROLE_PATIENT';
  }

  isDoctor(): boolean {
    return this.typeUser === 'ROLE_DOCTOR';
  }
}
