import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DiplomaprojectTestModule } from '../../../test.module';
import { FieldCertificateTemplComponent } from 'app/entities/field-certificate-templ/field-certificate-templ.component';
import { FieldCertificateTemplService } from 'app/entities/field-certificate-templ/field-certificate-templ.service';
import { FieldCertificateTempl } from 'app/shared/model/field-certificate-templ.model';

describe('Component Tests', () => {
  describe('FieldCertificateTempl Management Component', () => {
    let comp: FieldCertificateTemplComponent;
    let fixture: ComponentFixture<FieldCertificateTemplComponent>;
    let service: FieldCertificateTemplService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [FieldCertificateTemplComponent]
      })
        .overrideTemplate(FieldCertificateTemplComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FieldCertificateTemplComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FieldCertificateTemplService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FieldCertificateTempl(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fieldCertificateTempls && comp.fieldCertificateTempls[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
