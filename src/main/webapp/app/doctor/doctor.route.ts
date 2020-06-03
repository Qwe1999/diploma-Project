import { Route } from '@angular/router';

import { DoctorsPatients } from './patients/doctorsPatients';
import { JhiResolvePagingParams } from 'ng-jhipster';

export const doctorRoute: Route = {
  path: 'patients',
  component: DoctorsPatients,
  resolve: {
    pagingParams: JhiResolvePagingParams
  },
  data: {
    defaultSort: 'id,asc'
  }
};
