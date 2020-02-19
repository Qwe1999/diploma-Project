import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFieldCertificateTempl } from 'app/shared/model/field-certificate-templ.model';

@Component({
  selector: 'jhi-field-certificate-templ-detail',
  templateUrl: './field-certificate-templ-detail.component.html'
})
export class FieldCertificateTemplDetailComponent implements OnInit {
  fieldCertificateTempl: IFieldCertificateTempl | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldCertificateTempl }) => (this.fieldCertificateTempl = fieldCertificateTempl));
  }

  previousState(): void {
    window.history.back();
  }
}
