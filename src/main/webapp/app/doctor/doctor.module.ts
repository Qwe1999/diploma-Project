import { NgModule } from '@angular/core';
import { DiplomaprojectSharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { doctorRoute } from 'app/doctor/doctor.route';
import { AccountModule } from 'app/account/account.module';
import { RegisterComponent } from 'app/admin/register/register.component';
import { DoctorsPatients } from 'app/doctor/patients/doctorsPatients';

@NgModule({
  imports: [DiplomaprojectSharedModule, RouterModule.forChild([doctorRoute]), AccountModule],
  declarations: [DoctorsPatients]
})
export class DoctorModule {}
