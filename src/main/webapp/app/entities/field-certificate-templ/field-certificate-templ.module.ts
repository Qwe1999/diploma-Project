import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DiplomaprojectSharedModule } from 'app/shared/shared.module';
import { FieldCertificateTemplComponent } from './field-certificate-templ.component';
import { FieldCertificateTemplDetailComponent } from './field-certificate-templ-detail.component';
import { FieldCertificateTemplUpdateComponent } from './field-certificate-templ-update.component';
import { FieldCertificateTemplDeleteDialogComponent } from './field-certificate-templ-delete-dialog.component';
import { fieldCertificateTemplRoute } from './field-certificate-templ.route';

@NgModule({
  imports: [DiplomaprojectSharedModule, RouterModule.forChild(fieldCertificateTemplRoute)],
  declarations: [
    FieldCertificateTemplComponent,
    FieldCertificateTemplDetailComponent,
    FieldCertificateTemplUpdateComponent,
    FieldCertificateTemplDeleteDialogComponent
  ],
  entryComponents: [FieldCertificateTemplDeleteDialogComponent]
})
export class DiplomaprojectFieldCertificateTemplModule {}
