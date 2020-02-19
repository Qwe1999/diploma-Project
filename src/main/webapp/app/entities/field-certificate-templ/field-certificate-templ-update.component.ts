import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFieldCertificateTempl, FieldCertificateTempl } from 'app/shared/model/field-certificate-templ.model';
import { FieldCertificateTemplService } from './field-certificate-templ.service';
import { ICertificateTempl } from 'app/shared/model/certificate-templ.model';
import { CertificateTemplService } from 'app/entities/certificate-templ/certificate-templ.service';

@Component({
  selector: 'jhi-field-certificate-templ-update',
  templateUrl: './field-certificate-templ-update.component.html'
})
export class FieldCertificateTemplUpdateComponent implements OnInit {
  isSaving = false;
  certificatetempls: ICertificateTempl[] = [];

  editForm = this.fb.group({
    id: [],
    nameField: [],
    certificateTempl: []
  });

  constructor(
    protected fieldCertificateTemplService: FieldCertificateTemplService,
    protected certificateTemplService: CertificateTemplService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldCertificateTempl }) => {
      this.updateForm(fieldCertificateTempl);

      this.certificateTemplService.query().subscribe((res: HttpResponse<ICertificateTempl[]>) => (this.certificatetempls = res.body || []));
    });
  }

  updateForm(fieldCertificateTempl: IFieldCertificateTempl): void {
    this.editForm.patchValue({
      id: fieldCertificateTempl.id,
      nameField: fieldCertificateTempl.nameField,
      certificateTempl: fieldCertificateTempl.certificateTempl
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fieldCertificateTempl = this.createFromForm();
    if (fieldCertificateTempl.id !== undefined) {
      this.subscribeToSaveResponse(this.fieldCertificateTemplService.update(fieldCertificateTempl));
    } else {
      this.subscribeToSaveResponse(this.fieldCertificateTemplService.create(fieldCertificateTempl));
    }
  }

  private createFromForm(): IFieldCertificateTempl {
    return {
      ...new FieldCertificateTempl(),
      id: this.editForm.get(['id'])!.value,
      nameField: this.editForm.get(['nameField'])!.value,
      certificateTempl: this.editForm.get(['certificateTempl'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFieldCertificateTempl>>): void {
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

  trackById(index: number, item: ICertificateTempl): any {
    return item.id;
  }
}
