import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DiplomaprojectTestModule } from '../../../test.module';
import { DiseaseUpdateComponent } from 'app/entities/disease/disease-update.component';
import { DiseaseService } from 'app/entities/disease/disease.service';
import { Disease } from 'app/shared/model/disease.model';

describe('Component Tests', () => {
  describe('Disease Management Update Component', () => {
    let comp: DiseaseUpdateComponent;
    let fixture: ComponentFixture<DiseaseUpdateComponent>;
    let service: DiseaseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [DiseaseUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DiseaseUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiseaseUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiseaseService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Disease(123);
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
        const entity = new Disease();
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
