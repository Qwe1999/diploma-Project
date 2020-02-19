import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFieldCertificate } from 'app/shared/model/field-certificate.model';
import { FieldCertificateService } from './field-certificate.service';
import { FieldCertificateDeleteDialogComponent } from './field-certificate-delete-dialog.component';

@Component({
  selector: 'jhi-field-certificate',
  templateUrl: './field-certificate.component.html'
})
export class FieldCertificateComponent implements OnInit, OnDestroy {
  fieldCertificates?: IFieldCertificate[];
  eventSubscriber?: Subscription;

  constructor(
    protected fieldCertificateService: FieldCertificateService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.fieldCertificateService.query().subscribe((res: HttpResponse<IFieldCertificate[]>) => (this.fieldCertificates = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFieldCertificates();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFieldCertificate): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFieldCertificates(): void {
    this.eventSubscriber = this.eventManager.subscribe('fieldCertificateListModification', () => this.loadAll());
  }

  delete(fieldCertificate: IFieldCertificate): void {
    const modalRef = this.modalService.open(FieldCertificateDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fieldCertificate = fieldCertificate;
  }
}
