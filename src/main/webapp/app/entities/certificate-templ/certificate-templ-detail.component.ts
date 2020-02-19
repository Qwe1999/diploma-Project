import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICertificateTempl } from 'app/shared/model/certificate-templ.model';

@Component({
  selector: 'jhi-certificate-templ-detail',
  templateUrl: './certificate-templ-detail.component.html'
})
export class CertificateTemplDetailComponent implements OnInit {
  certificateTempl: ICertificateTempl | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ certificateTempl }) => (this.certificateTempl = certificateTempl));
  }

  previousState(): void {
    window.history.back();
  }
}
