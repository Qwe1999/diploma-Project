import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFieldCertificate } from 'app/shared/model/field-certificate.model';

@Component({
  selector: 'jhi-field-certificate-detail',
  templateUrl: './field-certificate-detail.component.html'
})
export class FieldCertificateDetailComponent implements OnInit {
  fieldCertificate: IFieldCertificate | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldCertificate }) => (this.fieldCertificate = fieldCertificate));
  }

  previousState(): void {
    window.history.back();
  }
}
