import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DiplomaprojectTestModule } from '../../../test.module';
import { FieldCertificateTemplDetailComponent } from 'app/entities/field-certificate-templ/field-certificate-templ-detail.component';
import { FieldCertificateTempl } from 'app/shared/model/field-certificate-templ.model';

describe('Component Tests', () => {
  describe('FieldCertificateTempl Management Detail Component', () => {
    let comp: FieldCertificateTemplDetailComponent;
    let fixture: ComponentFixture<FieldCertificateTemplDetailComponent>;
    const route = ({ data: of({ fieldCertificateTempl: new FieldCertificateTempl(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [FieldCertificateTemplDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FieldCertificateTemplDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FieldCertificateTemplDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load fieldCertificateTempl on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fieldCertificateTempl).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
