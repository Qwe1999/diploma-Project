import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICertificateTempl } from 'app/shared/model/certificate-templ.model';
import { CertificateTemplService } from './certificate-templ.service';

@Component({
  templateUrl: './certificate-templ-delete-dialog.component.html'
})
export class CertificateTemplDeleteDialogComponent {
  certificateTempl?: ICertificateTempl;

  constructor(
    protected certificateTemplService: CertificateTemplService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.certificateTemplService.delete(id).subscribe(() => {
      this.eventManager.broadcast('certificateTemplListModification');
      this.activeModal.close();
    });
  }
}
