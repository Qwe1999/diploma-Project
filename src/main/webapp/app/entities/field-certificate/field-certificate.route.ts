import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFieldCertificate, FieldCertificate } from 'app/shared/model/field-certificate.model';
import { FieldCertificateService } from './field-certificate.service';
import { FieldCertificateComponent } from './field-certificate.component';
import { FieldCertificateDetailComponent } from './field-certificate-detail.component';
import { FieldCertificateUpdateComponent } from './field-certificate-update.component';

@Injectable({ providedIn: 'root' })
export class FieldCertificateResolve implements Resolve<IFieldCertificate> {
  constructor(private service: FieldCertificateService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFieldCertificate> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((fieldCertificate: HttpResponse<FieldCertificate>) => {
          if (fieldCertificate.body) {
            return of(fieldCertificate.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FieldCertificate());
  }
}

export const fieldCertificateRoute: Routes = [
  {
    path: '',
    component: FieldCertificateComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.fieldCertificate.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FieldCertificateDetailComponent,
    resolve: {
      fieldCertificate: FieldCertificateResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.fieldCertificate.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FieldCertificateUpdateComponent,
    resolve: {
      fieldCertificate: FieldCertificateResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.fieldCertificate.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FieldCertificateUpdateComponent,
    resolve: {
      fieldCertificate: FieldCertificateResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.fieldCertificate.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
