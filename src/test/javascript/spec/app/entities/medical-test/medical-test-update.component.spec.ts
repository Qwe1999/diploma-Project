import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DiplomaprojectTestModule } from '../../../test.module';
import { MedicalTestUpdateComponent } from 'app/entities/medical-test/medical-test-update.component';
import { MedicalTestService } from 'app/entities/medical-test/medical-test.service';
import { MedicalTest } from 'app/shared/model/medical-test.model';

describe('Component Tests', () => {
  describe('MedicalTest Management Update Component', () => {
    let comp: MedicalTestUpdateComponent;
    let fixture: ComponentFixture<MedicalTestUpdateComponent>;
    let service: MedicalTestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [MedicalTestUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MedicalTestUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedicalTestUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedicalTestService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MedicalTest(123);
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
        const entity = new MedicalTest();
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
