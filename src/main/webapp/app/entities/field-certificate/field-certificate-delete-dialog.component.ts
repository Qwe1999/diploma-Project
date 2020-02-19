import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFieldCertificate } from 'app/shared/model/field-certificate.model';
import { FieldCertificateService } from './field-certificate.service';

@Component({
  templateUrl: './field-certificate-delete-dialog.component.html'
})
export class FieldCertificateDeleteDialogComponent {
  fieldCertificate?: IFieldCertificate;

  constructor(
    protected fieldCertificateService: FieldCertificateService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fieldCertificateService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fieldCertificateListModification');
      this.activeModal.close();
    });
  }
}
