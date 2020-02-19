import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFieldCertificateTempl, FieldCertificateTempl } from 'app/shared/model/field-certificate-templ.model';
import { FieldCertificateTemplService } from './field-certificate-templ.service';
import { FieldCertificateTemplComponent } from './field-certificate-templ.component';
import { FieldCertificateTemplDetailComponent } from './field-certificate-templ-detail.component';
import { FieldCertificateTemplUpdateComponent } from './field-certificate-templ-update.component';

@Injectable({ providedIn: 'root' })
export class FieldCertificateTemplResolve implements Resolve<IFieldCertificateTempl> {
  constructor(private service: FieldCertificateTemplService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFieldCertificateTempl> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((fieldCertificateTempl: HttpResponse<FieldCertificateTempl>) => {
          if (fieldCertificateTempl.body) {
            return of(fieldCertificateTempl.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FieldCertificateTempl());
  }
}

export const fieldCertificateTemplRoute: Routes = [
  {
    path: '',
    component: FieldCertificateTemplComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.fieldCertificateTempl.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FieldCertificateTemplDetailComponent,
    resolve: {
      fieldCertificateTempl: FieldCertificateTemplResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.fieldCertificateTempl.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FieldCertificateTemplUpdateComponent,
    resolve: {
      fieldCertificateTempl: FieldCertificateTemplResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.fieldCertificateTempl.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FieldCertificateTemplUpdateComponent,
    resolve: {
      fieldCertificateTempl: FieldCertificateTemplResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.fieldCertificateTempl.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
