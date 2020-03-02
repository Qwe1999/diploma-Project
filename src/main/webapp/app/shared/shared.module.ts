import { NgModule } from '@angular/core';
import { DiplomaprojectSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { RegisterModalComponent } from 'app/shared/registerModal/register-modal.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [DiplomaprojectSharedLibsModule, RouterModule],
  declarations: [
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    RegisterModalComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective
  ],
  entryComponents: [LoginModalComponent, RegisterModalComponent],
  exports: [
    DiplomaprojectSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    RegisterModalComponent
  ]
})
export class DiplomaprojectSharedModule {}
