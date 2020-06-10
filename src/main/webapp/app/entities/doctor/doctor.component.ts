import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDoctor } from 'app/shared/model/doctor.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { DoctorService } from './doctor.service';
import { DoctorDeleteDialogComponent } from './doctor-delete-dialog.component';
import { Account } from 'app/core/user/account.model';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-doctor',
  templateUrl: './doctor.component.html'
})
export class DoctorComponent implements OnInit, OnDestroy {
  doctors?: IDoctor[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  account: Account | null = null;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected doctorService: DoctorService,
    protected activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(patientId: number | undefined, page?: number): void {
    const pageToLoad: number = page || this.page;

    this.doctorService
      .queryWithPatientId(patientId, {
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IDoctor[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.accountService.identity(true).subscribe(account => {
      console.log('on Init' + account);
      this.account = account;
      this.activatedRoute.data.subscribe(data => {
        this.page = data.pagingParams.page;
        this.ascending = data.pagingParams.ascending;
        this.predicate = data.pagingParams.predicate;
        this.ngbPaginationPage = data.pagingParams.page;
        this.loadPage(this.account == null ? 0 : this.account.patient.id);
      });
      this.registerChangeInDoctors();
    });
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDoctor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDoctors(): void {
    this.eventSubscriber = this.eventManager.subscribe('doctorListModification', () =>
      this.loadPage(this.account == null ? 0 : this.account.patient.id)
    );
  }

  delete(doctor: IDoctor): void {
    const modalRef = this.modalService.open(DoctorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.doctor = doctor;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IDoctor[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/doctor'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.doctors = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
