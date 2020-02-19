import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEntryToDoctor, EntryToDoctor } from 'app/shared/model/entry-to-doctor.model';
import { EntryToDoctorService } from './entry-to-doctor.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient/patient.service';
import { IDoctor } from 'app/shared/model/doctor.model';
import { DoctorService } from 'app/entities/doctor/doctor.service';

type SelectableEntity = IPatient | IDoctor;

@Component({
  selector: 'jhi-entry-to-doctor-update',
  templateUrl: './entry-to-doctor-update.component.html'
})
export class EntryToDoctorUpdateComponent implements OnInit {
  isSaving = false;
  patients: IPatient[] = [];
  doctors: IDoctor[] = [];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [],
    patient: [],
    doctor: []
  });

  constructor(
    protected entryToDoctorService: EntryToDoctorService,
    protected patientService: PatientService,
    protected doctorService: DoctorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entryToDoctor }) => {
      this.updateForm(entryToDoctor);

      this.patientService
        .query({ filter: 'entrytodoctor-is-null' })
        .pipe(
          map((res: HttpResponse<IPatient[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPatient[]) => {
          if (!entryToDoctor.patient || !entryToDoctor.patient.id) {
            this.patients = resBody;
          } else {
            this.patientService
              .find(entryToDoctor.patient.id)
              .pipe(
                map((subRes: HttpResponse<IPatient>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPatient[]) => (this.patients = concatRes));
          }
        });

      this.doctorService
        .query({ filter: 'entrytodoctor-is-null' })
        .pipe(
          map((res: HttpResponse<IDoctor[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDoctor[]) => {
          if (!entryToDoctor.doctor || !entryToDoctor.doctor.id) {
            this.doctors = resBody;
          } else {
            this.doctorService
              .find(entryToDoctor.doctor.id)
              .pipe(
                map((subRes: HttpResponse<IDoctor>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDoctor[]) => (this.doctors = concatRes));
          }
        });
    });
  }

  updateForm(entryToDoctor: IEntryToDoctor): void {
    this.editForm.patchValue({
      id: entryToDoctor.id,
      date: entryToDoctor.date,
      patient: entryToDoctor.patient,
      doctor: entryToDoctor.doctor
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entryToDoctor = this.createFromForm();
    if (entryToDoctor.id !== undefined) {
      this.subscribeToSaveResponse(this.entryToDoctorService.update(entryToDoctor));
    } else {
      this.subscribeToSaveResponse(this.entryToDoctorService.create(entryToDoctor));
    }
  }

  private createFromForm(): IEntryToDoctor {
    return {
      ...new EntryToDoctor(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      patient: this.editForm.get(['patient'])!.value,
      doctor: this.editForm.get(['doctor'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntryToDoctor>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
