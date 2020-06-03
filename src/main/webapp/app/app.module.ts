import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { DiplomaprojectSharedModule } from 'app/shared/shared.module';
import { DiplomaprojectCoreModule } from 'app/core/core.module';
import { DiplomaprojectAppRoutingModule } from './app-routing.module';
import { DiplomaprojectHomeModule } from './home/home.module';
import { DiplomaprojectEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { DoctorComponent } from 'app/entities/doctor/doctor.component';
import { DoctorModule } from 'app/doctor/doctor.module';

@NgModule({
  imports: [
    BrowserModule,
    DiplomaprojectSharedModule,
    DiplomaprojectCoreModule,
    DiplomaprojectHomeModule,
    DoctorModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    DiplomaprojectEntityModule,
    DiplomaprojectAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class DiplomaprojectAppModule {}
