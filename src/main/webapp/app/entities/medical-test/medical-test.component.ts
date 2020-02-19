import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedicalTest } from 'app/shared/model/medical-test.model';
import { MedicalTestService } from './medical-test.service';
import { MedicalTestDeleteDialogComponent } from './medical-test-delete-dialog.component';

@Component({
  selector: 'jhi-medical-test',
  templateUrl: './medical-test.component.html'
})
export class MedicalTestComponent implements OnInit, OnDestroy {
  medicalTests?: IMedicalTest[];
  eventSubscriber?: Subscription;

  constructor(
    protected medicalTestService: MedicalTestService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.medicalTestService.query().subscribe((res: HttpResponse<IMedicalTest[]>) => (this.medicalTests = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMedicalTests();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMedicalTest): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInMedicalTests(): void {
    this.eventSubscriber = this.eventManager.subscribe('medicalTestListModification', () => this.loadAll());
  }

  delete(medicalTest: IMedicalTest): void {
    const modalRef = this.modalService.open(MedicalTestDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.medicalTest = medicalTest;
  }
}
