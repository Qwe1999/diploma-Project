import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DiplomaprojectTestModule } from '../../../test.module';
import { FieldCertificateTemplUpdateComponent } from 'app/entities/field-certificate-templ/field-certificate-templ-update.component';
import { FieldCertificateTemplService } from 'app/entities/field-certificate-templ/field-certificate-templ.service';
import { FieldCertificateTempl } from 'app/shared/model/field-certificate-templ.model';

describe('Component Tests', () => {
  describe('FieldCertificateTempl Management Update Component', () => {
    let comp: FieldCertificateTemplUpdateComponent;
    let fixture: ComponentFixture<FieldCertificateTemplUpdateComponent>;
    let service: FieldCertificateTemplService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [FieldCertificateTemplUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FieldCertificateTemplUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FieldCertificateTemplUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FieldCertificateTemplService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FieldCertificateTempl(123);
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
        const entity = new FieldCertificateTempl();
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
