import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { IEntryToHistoryDisease, EntryToHistoryDisease } from 'app/shared/model/entry-to-history-disease.model';
import { EntryToHistoryDiseaseService } from './entry-to-history-disease.service';
import { IPatient, Patient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient/patient.service';
import { Account } from 'app/core/user/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { UserService } from 'app/core/user/user.service';
import { IUser, User } from 'app/core/user/user.model';

@Component({
  selector: 'jhi-entry-to-history-disease-update',
  templateUrl: './entry-to-history-disease-update.component.html'
})
export class EntryToHistoryDiseaseUpdateComponent implements OnInit, OnDestroy {
  isSaving = false;
  patients: IPatient[] = [];
  curentUser?: User;
  dateDp: any;
  authSubscription?: Subscription;
  account: Account | null = null;
  editForm = this.fb.group({
    id: [],
    diseaseName: [],
    diseaseDescription: [],
    treatment: [],
    date: [],
    patient: []
  });

  constructor(
    protected entryToHistoryDiseaseService: EntryToHistoryDiseaseService,
    protected patientService: PatientService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entryToHistoryDisease }) => {
      this.updateForm(entryToHistoryDisease);

      this.patientService.query().subscribe((res: HttpResponse<IPatient[]>) => (this.patients = res.body || []));
    });
    this.authSubscription = this.accountService.identity(true).subscribe(account => {
      console.log('on Init' + account);
      this.account = account;
    });
  }

  updateForm(entryToHistoryDisease: IEntryToHistoryDisease): void {
    this.editForm.patchValue({
      id: entryToHistoryDisease.id,
      diseaseName: entryToHistoryDisease.diseaseName,
      diseaseDescription: entryToHistoryDisease.diseaseDescription,
      treatment: entryToHistoryDisease.treatment,
      date: entryToHistoryDisease.date,
      patient: entryToHistoryDisease.patient
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entryToHistoryDisease = this.createFromForm();
    if (entryToHistoryDisease.id !== undefined) {
      this.subscribeToSaveResponse(this.entryToHistoryDiseaseService.update(entryToHistoryDisease));
    } else {
      this.subscribeToSaveResponse(this.entryToHistoryDiseaseService.create(entryToHistoryDisease));
    }
  }

  private createFromForm(): IEntryToHistoryDisease {
    let patient = new Patient();
    console.log('curent user ' + this.curentUser);
    patient.id = this.curentUser == null ? 0 : this.curentUser.patient == null ? 0 : this.curentUser.patient.id;
    this.userService.find(this.account == null ? '' : this.account.login).subscribe((res: User) => {
      this.onSuccess(res);
      patient.id = res == null ? 0 : res.patient == null ? 0 : res.patient.id;
      console.log(patient.id);
    });
    console.log(patient.id);
    return {
      ...new EntryToHistoryDisease(),
      id: this.editForm.get(['id'])!.value,
      diseaseName: this.editForm.get(['diseaseName'])!.value,
      diseaseDescription: this.editForm.get(['diseaseDescription'])!.value,
      treatment: this.editForm.get(['treatment'])!.value,
      date: this.editForm.get(['date'])!.value,
      patient: patient
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntryToHistoryDisease>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSuccess(user: User): void {
    this.curentUser = user;
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IPatient): any {
    return item.id;
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
