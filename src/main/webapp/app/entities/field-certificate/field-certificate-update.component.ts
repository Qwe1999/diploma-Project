import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFieldCertificate, FieldCertificate } from 'app/shared/model/field-certificate.model';
import { FieldCertificateService } from './field-certificate.service';
import { ICertificate } from 'app/shared/model/certificate.model';
import { CertificateService } from 'app/entities/certificate/certificate.service';

@Component({
  selector: 'jhi-field-certificate-update',
  templateUrl: './field-certificate-update.component.html'
})
export class FieldCertificateUpdateComponent implements OnInit {
  isSaving = false;
  certificates: ICertificate[] = [];

  editForm = this.fb.group({
    id: [],
    nameField: [],
    value: [],
    certificate: []
  });

  constructor(
    protected fieldCertificateService: FieldCertificateService,
    protected certificateService: CertificateService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldCertificate }) => {
      this.updateForm(fieldCertificate);

      this.certificateService.query().subscribe((res: HttpResponse<ICertificate[]>) => (this.certificates = res.body || []));
    });
  }

  updateForm(fieldCertificate: IFieldCertificate): void {
    this.editForm.patchValue({
      id: fieldCertificate.id,
      nameField: fieldCertificate.nameField,
      value: fieldCertificate.value,
      certificate: fieldCertificate.certificate
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fieldCertificate = this.createFromForm();
    if (fieldCertificate.id !== undefined) {
      this.subscribeToSaveResponse(this.fieldCertificateService.update(fieldCertificate));
    } else {
      this.subscribeToSaveResponse(this.fieldCertificateService.create(fieldCertificate));
    }
  }

  private createFromForm(): IFieldCertificate {
    return {
      ...new FieldCertificate(),
      id: this.editForm.get(['id'])!.value,
      nameField: this.editForm.get(['nameField'])!.value,
      value: this.editForm.get(['value'])!.value,
      certificate: this.editForm.get(['certificate'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFieldCertificate>>): void {
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

  trackById(index: number, item: ICertificate): any {
    return item.id;
  }
}
