import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntryToHistoryDisease } from 'app/shared/model/entry-to-history-disease.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { EntryToHistoryDiseaseService } from './entry-to-history-disease.service';
import { EntryToHistoryDiseaseDeleteDialogComponent } from './entry-to-history-disease-delete-dialog.component';

@Component({
  selector: 'jhi-entry-to-history-disease',
  templateUrl: './entry-to-history-disease.component.html'
})
export class EntryToHistoryDiseaseComponent implements OnInit, OnDestroy {
  entryToHistoryDiseases?: IEntryToHistoryDisease[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected entryToHistoryDiseaseService: EntryToHistoryDiseaseService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.entryToHistoryDiseaseService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IEntryToHistoryDisease[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInEntryToHistoryDiseases();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEntryToHistoryDisease): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEntryToHistoryDiseases(): void {
    this.eventSubscriber = this.eventManager.subscribe('entryToHistoryDiseaseListModification', () => this.loadPage());
  }

  delete(entryToHistoryDisease: IEntryToHistoryDisease): void {
    const modalRef = this.modalService.open(EntryToHistoryDiseaseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.entryToHistoryDisease = entryToHistoryDisease;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IEntryToHistoryDisease[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/entry-to-history-disease'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.entryToHistoryDiseases = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
