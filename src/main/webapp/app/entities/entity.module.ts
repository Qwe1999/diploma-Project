import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'patient',
        loadChildren: () => import('./patient/patient.module').then(m => m.DiplomaprojectPatientModule)
      },
      {
        path: 'entry-to-doctor',
        loadChildren: () => import('./entry-to-doctor/entry-to-doctor.module').then(m => m.DiplomaprojectEntryToDoctorModule)
      },
      {
        path: 'person',
        loadChildren: () => import('./person/person.module').then(m => m.DiplomaprojectPersonModule)
      },
      {
        path: 'disease',
        loadChildren: () => import('./disease/disease.module').then(m => m.DiplomaprojectDiseaseModule)
      },
      {
        path: 'doctor',
        loadChildren: () => import('./doctor/doctor.module').then(m => m.DiplomaprojectDoctorModule)
      },
      {
        path: 'entry-to-history-disease',
        loadChildren: () =>
          import('./entry-to-history-disease/entry-to-history-disease.module').then(m => m.DiplomaprojectEntryToHistoryDiseaseModule)
      },
      {
        path: 'certificate-templ',
        loadChildren: () => import('./certificate-templ/certificate-templ.module').then(m => m.DiplomaprojectCertificateTemplModule)
      },
      {
        path: 'field-certificate-templ',
        loadChildren: () =>
          import('./field-certificate-templ/field-certificate-templ.module').then(m => m.DiplomaprojectFieldCertificateTemplModule)
      },
      {
        path: 'certificate',
        loadChildren: () => import('./certificate/certificate.module').then(m => m.DiplomaprojectCertificateModule)
      },
      {
        path: 'field-certificate',
        loadChildren: () => import('./field-certificate/field-certificate.module').then(m => m.DiplomaprojectFieldCertificateModule)
      },
      {
        path: 'medical-test',
        loadChildren: () => import('./medical-test/medical-test.module').then(m => m.DiplomaprojectMedicalTestModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class DiplomaprojectEntityModule {}
