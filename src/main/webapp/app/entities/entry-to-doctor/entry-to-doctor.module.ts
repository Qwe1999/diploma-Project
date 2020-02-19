import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DiplomaprojectSharedModule } from 'app/shared/shared.module';
import { EntryToDoctorComponent } from './entry-to-doctor.component';
import { EntryToDoctorDetailComponent } from './entry-to-doctor-detail.component';
import { EntryToDoctorUpdateComponent } from './entry-to-doctor-update.component';
import { EntryToDoctorDeleteDialogComponent } from './entry-to-doctor-delete-dialog.component';
import { entryToDoctorRoute } from './entry-to-doctor.route';

@NgModule({
  imports: [DiplomaprojectSharedModule, RouterModule.forChild(entryToDoctorRoute)],
  declarations: [EntryToDoctorComponent, EntryToDoctorDetailComponent, EntryToDoctorUpdateComponent, EntryToDoctorDeleteDialogComponent],
  entryComponents: [EntryToDoctorDeleteDialogComponent]
})
export class DiplomaprojectEntryToDoctorModule {}
