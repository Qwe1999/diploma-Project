import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DiplomaprojectSharedModule } from 'app/shared/shared.module';
import { EntryToHistoryDiseaseComponent } from './entry-to-history-disease.component';
import { EntryToHistoryDiseaseDetailComponent } from './entry-to-history-disease-detail.component';
import { EntryToHistoryDiseaseUpdateComponent } from './entry-to-history-disease-update.component';
import { EntryToHistoryDiseaseDeleteDialogComponent } from './entry-to-history-disease-delete-dialog.component';
import { entryToHistoryDiseaseRoute } from './entry-to-history-disease.route';

@NgModule({
  imports: [DiplomaprojectSharedModule, RouterModule.forChild(entryToHistoryDiseaseRoute)],
  declarations: [
    EntryToHistoryDiseaseComponent,
    EntryToHistoryDiseaseDetailComponent,
    EntryToHistoryDiseaseUpdateComponent,
    EntryToHistoryDiseaseDeleteDialogComponent
  ],
  entryComponents: [EntryToHistoryDiseaseDeleteDialogComponent]
})
export class DiplomaprojectEntryToHistoryDiseaseModule {}
