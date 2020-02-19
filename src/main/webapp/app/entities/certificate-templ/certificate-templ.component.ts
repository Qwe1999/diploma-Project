import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICertificateTempl } from 'app/shared/model/certificate-templ.model';
import { CertificateTemplService } from './certificate-templ.service';
import { CertificateTemplDeleteDialogComponent } from './certificate-templ-delete-dialog.component';

@Component({
  selector: 'jhi-certificate-templ',
  templateUrl: './certificate-templ.component.html'
})
export class CertificateTemplComponent implements OnInit, OnDestroy {
  certificateTempls?: ICertificateTempl[];
  eventSubscriber?: Subscription;

  constructor(
    protected certificateTemplService: CertificateTemplService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.certificateTemplService.query().subscribe((res: HttpResponse<ICertificateTempl[]>) => (this.certificateTempls = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCertificateTempls();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICertificateTempl): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCertificateTempls(): void {
    this.eventSubscriber = this.eventManager.subscribe('certificateTemplListModification', () => this.loadAll());
  }

  delete(certificateTempl: ICertificateTempl): void {
    const modalRef = this.modalService.open(CertificateTemplDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.certificateTempl = certificateTempl;
  }
}
