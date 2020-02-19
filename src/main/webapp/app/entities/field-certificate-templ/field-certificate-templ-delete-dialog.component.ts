import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFieldCertificateTempl } from 'app/shared/model/field-certificate-templ.model';
import { FieldCertificateTemplService } from './field-certificate-templ.service';

@Component({
  templateUrl: './field-certificate-templ-delete-dialog.component.html'
})
export class FieldCertificateTemplDeleteDialogComponent {
  fieldCertificateTempl?: IFieldCertificateTempl;

  constructor(
    protected fieldCertificateTemplService: FieldCertificateTemplService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fieldCertificateTemplService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fieldCertificateTemplListModification');
      this.activeModal.close();
    });
  }
}
