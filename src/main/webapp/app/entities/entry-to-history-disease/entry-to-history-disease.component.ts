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
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-entry-to-history-disease',
  templateUrl: './entry-to-history-disease.component.html'
})
export class EntryToHistoryDiseaseComponent implements OnInit, OnDestroy {
  entryToHistoryDiseases?: IEntryToHistoryDisease[];
  eventSubscriber?: Subscription;
  account: Account | null = null;
  authSubscription?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  patientId!: number;

  constructor(
    protected entryToHistoryDiseaseService: EntryToHistoryDiseaseService,
    protected activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(patientId: number, page?: number): void {
    const pageToLoad: number = page || this.page;
    this.entryToHistoryDiseaseService
      .queryForPatientId(patientId, {
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
    this.activatedRoute.params.subscribe(params => {
      this.patientId = params['patientId'];

      this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
        this.account = account;
        console.log('Entry disease' + this.patientId);

        if (this.patientId == null) {
          this.patientId = this.account == null ? 0 : this.account.patient.id || 0;
        }
        console.log('Entry disease' + this.patientId);
        this.activatedRoute.data.subscribe(data => {
          this.page = data.pagingParams.page;
          this.ascending = data.pagingParams.ascending;
          this.predicate = data.pagingParams.predicate;
          this.ngbPaginationPage = data.pagingParams.page;
          this.loadPage(this.patientId);
        });
        this.registerChangeInEntryToHistoryDiseases();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  trackId(index: number, item: IEntryToHistoryDisease): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEntryToHistoryDiseases(): void {
    this.eventSubscriber = this.eventManager.subscribe('entryToHistoryDiseaseListModification', () => this.loadPage(this.patientId));
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
    this.router.navigate(['/entry-to-history-disease/' + this.patientId], {
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
