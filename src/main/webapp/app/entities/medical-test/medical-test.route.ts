import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMedicalTest, MedicalTest } from 'app/shared/model/medical-test.model';
import { MedicalTestService } from './medical-test.service';
import { MedicalTestComponent } from './medical-test.component';
import { MedicalTestDetailComponent } from './medical-test-detail.component';
import { MedicalTestUpdateComponent } from './medical-test-update.component';

@Injectable({ providedIn: 'root' })
export class MedicalTestResolve implements Resolve<IMedicalTest> {
  constructor(private service: MedicalTestService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMedicalTest> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((medicalTest: HttpResponse<MedicalTest>) => {
          if (medicalTest.body) {
            return of(medicalTest.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MedicalTest());
  }
}

export const medicalTestRoute: Routes = [
  {
    path: '',
    component: MedicalTestComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.medicalTest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MedicalTestDetailComponent,
    resolve: {
      medicalTest: MedicalTestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.medicalTest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MedicalTestUpdateComponent,
    resolve: {
      medicalTest: MedicalTestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.medicalTest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MedicalTestUpdateComponent,
    resolve: {
      medicalTest: MedicalTestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.medicalTest.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
