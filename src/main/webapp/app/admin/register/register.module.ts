import { NgModule } from '@angular/core';
import { DiplomaprojectSharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { docsRoute } from 'app/admin/docs/docs.route';
import { DocsComponent } from 'app/admin/docs/docs.component';
import { registerRoute } from 'app/admin/register/register.route';
import { RegisterComponent } from 'app/admin/register/register.component';
import { AccountModule } from 'app/account/account.module';

@NgModule({
  imports: [DiplomaprojectSharedModule, RouterModule.forChild([registerRoute]), AccountModule],
  declarations: [RegisterComponent]
})
export class RegisterModule {}
