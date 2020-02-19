import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEntryToDoctor, EntryToDoctor } from 'app/shared/model/entry-to-doctor.model';
import { EntryToDoctorService } from './entry-to-doctor.service';
import { EntryToDoctorComponent } from './entry-to-doctor.component';
import { EntryToDoctorDetailComponent } from './entry-to-doctor-detail.component';
import { EntryToDoctorUpdateComponent } from './entry-to-doctor-update.component';

@Injectable({ providedIn: 'root' })
export class EntryToDoctorResolve implements Resolve<IEntryToDoctor> {
  constructor(private service: EntryToDoctorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntryToDoctor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((entryToDoctor: HttpResponse<EntryToDoctor>) => {
          if (entryToDoctor.body) {
            return of(entryToDoctor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EntryToDoctor());
  }
}

export const entryToDoctorRoute: Routes = [
  {
    path: '',
    component: EntryToDoctorComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.entryToDoctor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EntryToDoctorDetailComponent,
    resolve: {
      entryToDoctor: EntryToDoctorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.entryToDoctor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EntryToDoctorUpdateComponent,
    resolve: {
      entryToDoctor: EntryToDoctorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.entryToDoctor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EntryToDoctorUpdateComponent,
    resolve: {
      entryToDoctor: EntryToDoctorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.entryToDoctor.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
