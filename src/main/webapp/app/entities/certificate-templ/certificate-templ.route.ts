import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICertificateTempl, CertificateTempl } from 'app/shared/model/certificate-templ.model';
import { CertificateTemplService } from './certificate-templ.service';
import { CertificateTemplComponent } from './certificate-templ.component';
import { CertificateTemplDetailComponent } from './certificate-templ-detail.component';
import { CertificateTemplUpdateComponent } from './certificate-templ-update.component';

@Injectable({ providedIn: 'root' })
export class CertificateTemplResolve implements Resolve<ICertificateTempl> {
  constructor(private service: CertificateTemplService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICertificateTempl> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((certificateTempl: HttpResponse<CertificateTempl>) => {
          if (certificateTempl.body) {
            return of(certificateTempl.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CertificateTempl());
  }
}

export const certificateTemplRoute: Routes = [
  {
    path: '',
    component: CertificateTemplComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.certificateTempl.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CertificateTemplDetailComponent,
    resolve: {
      certificateTempl: CertificateTemplResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.certificateTempl.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CertificateTemplUpdateComponent,
    resolve: {
      certificateTempl: CertificateTemplResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.certificateTempl.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CertificateTemplUpdateComponent,
    resolve: {
      certificateTempl: CertificateTemplResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diplomaprojectApp.certificateTempl.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
