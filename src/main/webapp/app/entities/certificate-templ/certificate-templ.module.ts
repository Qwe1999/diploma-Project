import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DiplomaprojectSharedModule } from 'app/shared/shared.module';
import { CertificateTemplComponent } from './certificate-templ.component';
import { CertificateTemplDetailComponent } from './certificate-templ-detail.component';
import { CertificateTemplUpdateComponent } from './certificate-templ-update.component';
import { CertificateTemplDeleteDialogComponent } from './certificate-templ-delete-dialog.component';
import { certificateTemplRoute } from './certificate-templ.route';

@NgModule({
  imports: [DiplomaprojectSharedModule, RouterModule.forChild(certificateTemplRoute)],
  declarations: [
    CertificateTemplComponent,
    CertificateTemplDetailComponent,
    CertificateTemplUpdateComponent,
    CertificateTemplDeleteDialogComponent
  ],
  entryComponents: [CertificateTemplDeleteDialogComponent]
})
export class DiplomaprojectCertificateTemplModule {}
