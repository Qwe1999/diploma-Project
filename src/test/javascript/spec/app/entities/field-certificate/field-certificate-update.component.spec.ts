import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DiplomaprojectTestModule } from '../../../test.module';
import { FieldCertificateUpdateComponent } from 'app/entities/field-certificate/field-certificate-update.component';
import { FieldCertificateService } from 'app/entities/field-certificate/field-certificate.service';
import { FieldCertificate } from 'app/shared/model/field-certificate.model';

describe('Component Tests', () => {
  describe('FieldCertificate Management Update Component', () => {
    let comp: FieldCertificateUpdateComponent;
    let fixture: ComponentFixture<FieldCertificateUpdateComponent>;
    let service: FieldCertificateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [FieldCertificateUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FieldCertificateUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FieldCertificateUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FieldCertificateService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FieldCertificate(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new FieldCertificate();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
