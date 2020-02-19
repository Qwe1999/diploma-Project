import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DiplomaprojectTestModule } from '../../../test.module';
import { FieldCertificateDetailComponent } from 'app/entities/field-certificate/field-certificate-detail.component';
import { FieldCertificate } from 'app/shared/model/field-certificate.model';

describe('Component Tests', () => {
  describe('FieldCertificate Management Detail Component', () => {
    let comp: FieldCertificateDetailComponent;
    let fixture: ComponentFixture<FieldCertificateDetailComponent>;
    const route = ({ data: of({ fieldCertificate: new FieldCertificate(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [FieldCertificateDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FieldCertificateDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FieldCertificateDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load fieldCertificate on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fieldCertificate).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
