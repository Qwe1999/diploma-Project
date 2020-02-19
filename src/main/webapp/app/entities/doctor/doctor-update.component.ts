import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDoctor, Doctor } from 'app/shared/model/doctor.model';
import { DoctorService } from './doctor.service';
import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from 'app/entities/person/person.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient/patient.service';

type SelectableEntity = IPerson | IPatient;

@Component({
  selector: 'jhi-doctor-update',
  templateUrl: './doctor-update.component.html'
})
export class DoctorUpdateComponent implements OnInit {
  isSaving = false;
  people: IPerson[] = [];
  patients: IPatient[] = [];
  workingHourBeginDp: any;
  workingHourEndDp: any;

  editForm = this.fb.group({
    id: [],
    position: [],
    room: [],
    workingHourBegin: [],
    workingHourEnd: [],
    daysWork: [],
    person: [],
    patients: []
  });

  constructor(
    protected doctorService: DoctorService,
    protected personService: PersonService,
    protected patientService: PatientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doctor }) => {
      this.updateForm(doctor);

      this.personService
        .query({ filter: 'doctor-is-null' })
        .pipe(
          map((res: HttpResponse<IPerson[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPerson[]) => {
          if (!doctor.person || !doctor.person.id) {
            this.people = resBody;
          } else {
            this.personService
              .find(doctor.person.id)
              .pipe(
                map((subRes: HttpResponse<IPerson>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPerson[]) => (this.people = concatRes));
          }
        });

      this.patientService.query().subscribe((res: HttpResponse<IPatient[]>) => (this.patients = res.body || []));
    });
  }

  updateForm(doctor: IDoctor): void {
    this.editForm.patchValue({
      id: doctor.id,
      position: doctor.position,
      room: doctor.room,
      workingHourBegin: doctor.workingHourBegin,
      workingHourEnd: doctor.workingHourEnd,
      daysWork: doctor.daysWork,
      person: doctor.person,
      patients: doctor.patients
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const doctor = this.createFromForm();
    if (doctor.id !== undefined) {
      this.subscribeToSaveResponse(this.doctorService.update(doctor));
    } else {
      this.subscribeToSaveResponse(this.doctorService.create(doctor));
    }
  }

  private createFromForm(): IDoctor {
    return {
      ...new Doctor(),
      id: this.editForm.get(['id'])!.value,
      position: this.editForm.get(['position'])!.value,
      room: this.editForm.get(['room'])!.value,
      workingHourBegin: this.editForm.get(['workingHourBegin'])!.value,
      workingHourEnd: this.editForm.get(['workingHourEnd'])!.value,
      daysWork: this.editForm.get(['daysWork'])!.value,
      person: this.editForm.get(['person'])!.value,
      patients: this.editForm.get(['patients'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDoctor>>): void {
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

  getSelected(selectedVals: IPatient[], option: IPatient): IPatient {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
