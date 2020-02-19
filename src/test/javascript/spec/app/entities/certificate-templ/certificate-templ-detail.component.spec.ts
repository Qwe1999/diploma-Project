import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DiplomaprojectTestModule } from '../../../test.module';
import { CertificateTemplDetailComponent } from 'app/entities/certificate-templ/certificate-templ-detail.component';
import { CertificateTempl } from 'app/shared/model/certificate-templ.model';

describe('Component Tests', () => {
  describe('CertificateTempl Management Detail Component', () => {
    let comp: CertificateTemplDetailComponent;
    let fixture: ComponentFixture<CertificateTemplDetailComponent>;
    const route = ({ data: of({ certificateTempl: new CertificateTempl(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [CertificateTemplDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CertificateTemplDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CertificateTemplDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load certificateTempl on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.certificateTempl).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
