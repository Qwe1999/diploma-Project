import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEntryToHistoryDisease, EntryToHistoryDisease } from 'app/shared/model/entry-to-history-disease.model';
import { EntryToHistoryDiseaseService } from './entry-to-history-disease.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient/patient.service';

@Component({
  selector: 'jhi-entry-to-history-disease-update',
  templateUrl: './entry-to-history-disease-update.component.html'
})
export class EntryToHistoryDiseaseUpdateComponent implements OnInit {
  isSaving = false;
  patients: IPatient[] = [];
  dateDp: any;

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
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entryToHistoryDisease }) => {
      this.updateForm(entryToHistoryDisease);

      this.patientService.query().subscribe((res: HttpResponse<IPatient[]>) => (this.patients = res.body || []));
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
    return {
      ...new EntryToHistoryDisease(),
      id: this.editForm.get(['id'])!.value,
      diseaseName: this.editForm.get(['diseaseName'])!.value,
      diseaseDescription: this.editForm.get(['diseaseDescription'])!.value,
      treatment: this.editForm.get(['treatment'])!.value,
      date: this.editForm.get(['date'])!.value,
      patient: this.editForm.get(['patient'])!.value
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

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IPatient): any {
    return item.id;
  }
}
