import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICertificate } from 'app/shared/model/certificate.model';
import { CertificateService } from './certificate.service';
import { CertificateDeleteDialogComponent } from './certificate-delete-dialog.component';

@Component({
  selector: 'jhi-certificate',
  templateUrl: './certificate.component.html'
})
export class CertificateComponent implements OnInit, OnDestroy {
  certificates?: ICertificate[];
  eventSubscriber?: Subscription;

  constructor(
    protected certificateService: CertificateService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.certificateService.query().subscribe((res: HttpResponse<ICertificate[]>) => (this.certificates = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCertificates();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICertificate): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCertificates(): void {
    this.eventSubscriber = this.eventManager.subscribe('certificateListModification', () => this.loadAll());
  }

  delete(certificate: ICertificate): void {
    const modalRef = this.modalService.open(CertificateDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.certificate = certificate;
  }
}
