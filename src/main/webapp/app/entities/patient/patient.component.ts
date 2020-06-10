import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPatient } from 'app/shared/model/patient.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PatientService } from './patient.service';
import { PatientDeleteDialogComponent } from './patient-delete-dialog.component';
import { User } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-patient',
  templateUrl: './patient.component.html'
})
export class PatientComponent implements OnInit, OnDestroy {
  patients?: IPatient[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  curentUser?: User;
  account: Account | null = null;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected patientService: PatientService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected userService: UserService,
    private accountService: AccountService,
    protected modalService: NgbModal
  ) {}

  loadPage(doctorId: number | undefined, page?: number): void {
    const pageToLoad: number = page || this.page;

    this.patientService
      .queryWithDoctorId(doctorId, {
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IPatient[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
        this.loadPage(this.account == null ? 0 : this.account.doctor.id);
      });
      this.registerChangeInPatients();
    });
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPatient): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPatients(): void {
    this.eventSubscriber = this.eventManager.subscribe('patientListModification', () =>
      this.loadPage(this.account == null ? 0 : this.account.doctor.id)
    );
  }

  delete(patient: IPatient): void {
    const modalRef = this.modalService.open(PatientDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.patient = patient;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IPatient[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/patient'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.patients = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
