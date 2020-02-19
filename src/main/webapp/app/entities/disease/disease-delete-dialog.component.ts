import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDisease } from 'app/shared/model/disease.model';
import { DiseaseService } from './disease.service';

@Component({
  templateUrl: './disease-delete-dialog.component.html'
})
export class DiseaseDeleteDialogComponent {
  disease?: IDisease;

  constructor(protected diseaseService: DiseaseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diseaseService.delete(id).subscribe(() => {
      this.eventManager.broadcast('diseaseListModification');
      this.activeModal.close();
    });
  }
}
