import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntryToDoctor } from 'app/shared/model/entry-to-doctor.model';
import { EntryToDoctorService } from './entry-to-doctor.service';

@Component({
  templateUrl: './entry-to-doctor-delete-dialog.component.html'
})
export class EntryToDoctorDeleteDialogComponent {
  entryToDoctor?: IEntryToDoctor;

  constructor(
    protected entryToDoctorService: EntryToDoctorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.entryToDoctorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('entryToDoctorListModification');
      this.activeModal.close();
    });
  }
}
