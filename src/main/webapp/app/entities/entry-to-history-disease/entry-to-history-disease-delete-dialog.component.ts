import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntryToHistoryDisease } from 'app/shared/model/entry-to-history-disease.model';
import { EntryToHistoryDiseaseService } from './entry-to-history-disease.service';

@Component({
  templateUrl: './entry-to-history-disease-delete-dialog.component.html'
})
export class EntryToHistoryDiseaseDeleteDialogComponent {
  entryToHistoryDisease?: IEntryToHistoryDisease;

  constructor(
    protected entryToHistoryDiseaseService: EntryToHistoryDiseaseService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.entryToHistoryDiseaseService.delete(id).subscribe(() => {
      this.eventManager.broadcast('entryToHistoryDiseaseListModification');
      this.activeModal.close();
    });
  }
}
