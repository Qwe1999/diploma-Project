import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DiplomaprojectSharedModule } from 'app/shared/shared.module';
import { FieldCertificateComponent } from './field-certificate.component';
import { FieldCertificateDetailComponent } from './field-certificate-detail.component';
import { FieldCertificateUpdateComponent } from './field-certificate-update.component';
import { FieldCertificateDeleteDialogComponent } from './field-certificate-delete-dialog.component';
import { fieldCertificateRoute } from './field-certificate.route';

@NgModule({
  imports: [DiplomaprojectSharedModule, RouterModule.forChild(fieldCertificateRoute)],
  declarations: [
    FieldCertificateComponent,
    FieldCertificateDetailComponent,
    FieldCertificateUpdateComponent,
    FieldCertificateDeleteDialogComponent
  ],
  entryComponents: [FieldCertificateDeleteDialogComponent]
})
export class DiplomaprojectFieldCertificateModule {}
