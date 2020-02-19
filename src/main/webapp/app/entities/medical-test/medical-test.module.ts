import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DiplomaprojectSharedModule } from 'app/shared/shared.module';
import { MedicalTestComponent } from './medical-test.component';
import { MedicalTestDetailComponent } from './medical-test-detail.component';
import { MedicalTestUpdateComponent } from './medical-test-update.component';
import { MedicalTestDeleteDialogComponent } from './medical-test-delete-dialog.component';
import { medicalTestRoute } from './medical-test.route';

@NgModule({
  imports: [DiplomaprojectSharedModule, RouterModule.forChild(medicalTestRoute)],
  declarations: [MedicalTestComponent, MedicalTestDetailComponent, MedicalTestUpdateComponent, MedicalTestDeleteDialogComponent],
  entryComponents: [MedicalTestDeleteDialogComponent]
})
export class DiplomaprojectMedicalTestModule {}
