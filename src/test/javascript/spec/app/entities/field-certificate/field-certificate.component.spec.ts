import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DiplomaprojectTestModule } from '../../../test.module';
import { FieldCertificateComponent } from 'app/entities/field-certificate/field-certificate.component';
import { FieldCertificateService } from 'app/entities/field-certificate/field-certificate.service';
import { FieldCertificate } from 'app/shared/model/field-certificate.model';

describe('Component Tests', () => {
  describe('FieldCertificate Management Component', () => {
    let comp: FieldCertificateComponent;
    let fixture: ComponentFixture<FieldCertificateComponent>;
    let service: FieldCertificateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [FieldCertificateComponent]
      })
        .overrideTemplate(FieldCertificateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FieldCertificateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FieldCertificateService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FieldCertificate(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fieldCertificates && comp.fieldCertificates[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
