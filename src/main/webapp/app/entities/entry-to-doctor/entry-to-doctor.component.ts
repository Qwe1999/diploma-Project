import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntryToDoctor } from 'app/shared/model/entry-to-doctor.model';
import { EntryToDoctorService } from './entry-to-doctor.service';
import { EntryToDoctorDeleteDialogComponent } from './entry-to-doctor-delete-dialog.component';

@Component({
  selector: 'jhi-entry-to-doctor',
  templateUrl: './entry-to-doctor.component.html'
})
export class EntryToDoctorComponent implements OnInit, OnDestroy {
  entryToDoctors?: IEntryToDoctor[];
  eventSubscriber?: Subscription;

  constructor(
    protected entryToDoctorService: EntryToDoctorService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.entryToDoctorService.query().subscribe((res: HttpResponse<IEntryToDoctor[]>) => (this.entryToDoctors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEntryToDoctors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEntryToDoctor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEntryToDoctors(): void {
    this.eventSubscriber = this.eventManager.subscribe('entryToDoctorListModification', () => this.loadAll());
  }

  delete(entryToDoctor: IEntryToDoctor): void {
    const modalRef = this.modalService.open(EntryToDoctorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.entryToDoctor = entryToDoctor;
  }
}
