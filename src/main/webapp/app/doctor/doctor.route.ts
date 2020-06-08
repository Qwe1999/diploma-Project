import { ActivatedRouteSnapshot, Resolve, Route } from '@angular/router';

import { DoctorsPatientsComponent } from './patients/doctorsPatients';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Injectable } from '@angular/core';
import { IUser, User } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { Observable, of } from 'rxjs';
import { IPatient } from 'app/shared/model/patient.model';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const doctorRoute: Route = {
  path: 'patients',
  component: DoctorsPatientsComponent,
  resolve: {
    pagingParams: JhiResolvePagingParams
  },
  data: {
    defaultSort: 'id,asc'
  },
  canActivate: [UserRouteAccessService]
};
