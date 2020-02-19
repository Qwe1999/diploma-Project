import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedicalTest } from 'app/shared/model/medical-test.model';
import { MedicalTestService } from './medical-test.service';

@Component({
  templateUrl: './medical-test-delete-dialog.component.html'
})
export class MedicalTestDeleteDialogComponent {
  medicalTest?: IMedicalTest;

  constructor(
    protected medicalTestService: MedicalTestService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.medicalTestService.delete(id).subscribe(() => {
      this.eventManager.broadcast('medicalTestListModification');
      this.activeModal.close();
    });
  }
}
