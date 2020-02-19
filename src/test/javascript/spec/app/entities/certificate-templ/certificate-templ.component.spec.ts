import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DiplomaprojectTestModule } from '../../../test.module';
import { CertificateTemplComponent } from 'app/entities/certificate-templ/certificate-templ.component';
import { CertificateTemplService } from 'app/entities/certificate-templ/certificate-templ.service';
import { CertificateTempl } from 'app/shared/model/certificate-templ.model';

describe('Component Tests', () => {
  describe('CertificateTempl Management Component', () => {
    let comp: CertificateTemplComponent;
    let fixture: ComponentFixture<CertificateTemplComponent>;
    let service: CertificateTemplService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [CertificateTemplComponent]
      })
        .overrideTemplate(CertificateTemplComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CertificateTemplComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CertificateTemplService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CertificateTempl(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.certificateTempls && comp.certificateTempls[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
