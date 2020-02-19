import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DiplomaprojectTestModule } from '../../../test.module';
import { CertificateComponent } from 'app/entities/certificate/certificate.component';
import { CertificateService } from 'app/entities/certificate/certificate.service';
import { Certificate } from 'app/shared/model/certificate.model';

describe('Component Tests', () => {
  describe('Certificate Management Component', () => {
    let comp: CertificateComponent;
    let fixture: ComponentFixture<CertificateComponent>;
    let service: CertificateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [CertificateComponent]
      })
        .overrideTemplate(CertificateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CertificateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CertificateService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Certificate(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.certificates && comp.certificates[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
