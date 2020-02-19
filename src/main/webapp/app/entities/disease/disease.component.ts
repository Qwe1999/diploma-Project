import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDisease } from 'app/shared/model/disease.model';
import { DiseaseService } from './disease.service';
import { DiseaseDeleteDialogComponent } from './disease-delete-dialog.component';

@Component({
  selector: 'jhi-disease',
  templateUrl: './disease.component.html'
})
export class DiseaseComponent implements OnInit, OnDestroy {
  diseases?: IDisease[];
  eventSubscriber?: Subscription;

  constructor(protected diseaseService: DiseaseService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.diseaseService.query().subscribe((res: HttpResponse<IDisease[]>) => (this.diseases = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDiseases();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDisease): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDiseases(): void {
    this.eventSubscriber = this.eventManager.subscribe('diseaseListModification', () => this.loadAll());
  }

  delete(disease: IDisease): void {
    const modalRef = this.modalService.open(DiseaseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.disease = disease;
  }
}
