import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFieldCertificateTempl } from 'app/shared/model/field-certificate-templ.model';
import { FieldCertificateTemplService } from './field-certificate-templ.service';
import { FieldCertificateTemplDeleteDialogComponent } from './field-certificate-templ-delete-dialog.component';

@Component({
  selector: 'jhi-field-certificate-templ',
  templateUrl: './field-certificate-templ.component.html'
})
export class FieldCertificateTemplComponent implements OnInit, OnDestroy {
  fieldCertificateTempls?: IFieldCertificateTempl[];
  eventSubscriber?: Subscription;

  constructor(
    protected fieldCertificateTemplService: FieldCertificateTemplService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.fieldCertificateTemplService
      .query()
      .subscribe((res: HttpResponse<IFieldCertificateTempl[]>) => (this.fieldCertificateTempls = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFieldCertificateTempls();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFieldCertificateTempl): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFieldCertificateTempls(): void {
    this.eventSubscriber = this.eventManager.subscribe('fieldCertificateTemplListModification', () => this.loadAll());
  }

  delete(fieldCertificateTempl: IFieldCertificateTempl): void {
    const modalRef = this.modalService.open(FieldCertificateTemplDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fieldCertificateTempl = fieldCertificateTempl;
  }
}
