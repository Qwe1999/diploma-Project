import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DiplomaprojectTestModule } from '../../../test.module';
import { CertificateTemplUpdateComponent } from 'app/entities/certificate-templ/certificate-templ-update.component';
import { CertificateTemplService } from 'app/entities/certificate-templ/certificate-templ.service';
import { CertificateTempl } from 'app/shared/model/certificate-templ.model';

describe('Component Tests', () => {
  describe('CertificateTempl Management Update Component', () => {
    let comp: CertificateTemplUpdateComponent;
    let fixture: ComponentFixture<CertificateTemplUpdateComponent>;
    let service: CertificateTemplService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [CertificateTemplUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CertificateTemplUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CertificateTemplUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CertificateTemplService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CertificateTempl(123);
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
        const entity = new CertificateTempl();
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
