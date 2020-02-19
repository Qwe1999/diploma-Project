import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICertificate, Certificate } from 'app/shared/model/certificate.model';
import { CertificateService } from './certificate.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient/patient.service';

@Component({
  selector: 'jhi-certificate-update',
  templateUrl: './certificate-update.component.html'
})
export class CertificateUpdateComponent implements OnInit {
  isSaving = false;
  patients: IPatient[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    patient: []
  });

  constructor(
    protected certificateService: CertificateService,
    protected patientService: PatientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ certificate }) => {
      this.updateForm(certificate);

      this.patientService.query().subscribe((res: HttpResponse<IPatient[]>) => (this.patients = res.body || []));
    });
  }

  updateForm(certificate: ICertificate): void {
    this.editForm.patchValue({
      id: certificate.id,
      name: certificate.name,
      patient: certificate.patient
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const certificate = this.createFromForm();
    if (certificate.id !== undefined) {
      this.subscribeToSaveResponse(this.certificateService.update(certificate));
    } else {
      this.subscribeToSaveResponse(this.certificateService.create(certificate));
    }
  }

  private createFromForm(): ICertificate {
    return {
      ...new Certificate(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      patient: this.editForm.get(['patient'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICertificate>>): void {
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
