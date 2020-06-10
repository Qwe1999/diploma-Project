import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEntryToHistoryDisease, EntryToHistoryDisease } from 'app/shared/model/entry-to-history-disease.model';
import { EntryToHistoryDiseaseService } from './entry-to-history-disease.service';
import { EntryToHistoryDiseaseComponent } from './entry-to-history-disease.component';
import { EntryToHistoryDiseaseDetailComponent } from './entry-to-history-disease-detail.component';
import { EntryToHistoryDiseaseUpdateComponent } from './entry-to-history-disease-update.component';

@Injectable({ providedIn: 'root' })
export class EntryToHistoryDiseaseResolve implements Resolve<IEntryToHistoryDisease> {
  constructor(private service: EntryToHistoryDiseaseService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntryToHistoryDisease> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((entryToHistoryDisease: HttpResponse<EntryToHistoryDisease>) => {
          if (entryToHistoryDisease.body) {
            return of(entryToHistoryDisease.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EntryToHistoryDisease());
  }
}

export const entryToHistoryDiseaseRoute: Routes = [
  {
    path: ':patientId',
    component: EntryToHistoryDiseaseComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      defaultSort: 'id,asc',
      pageTitle: 'diplomaprojectApp.entryToHistoryDisease.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: '',
    component: EntryToHistoryDiseaseComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      defaultSort: 'id,asc',
      pageTitle: 'diplomaprojectApp.entryToHistoryDisease.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EntryToHistoryDiseaseDetailComponent,
    resolve: {
      entryToHistoryDisease: EntryToHistoryDiseaseResolve
    },
    data: {
      pageTitle: 'diplomaprojectApp.entryToHistoryDisease.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EntryToHistoryDiseaseUpdateComponent,
    resolve: {
      entryToHistoryDisease: EntryToHistoryDiseaseResolve
    },
    data: {
      pageTitle: 'diplomaprojectApp.entryToHistoryDisease.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EntryToHistoryDiseaseUpdateComponent,
    resolve: {
      entryToHistoryDisease: EntryToHistoryDiseaseResolve
    },
    data: {
      pageTitle: 'diplomaprojectApp.entryToHistoryDisease.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
