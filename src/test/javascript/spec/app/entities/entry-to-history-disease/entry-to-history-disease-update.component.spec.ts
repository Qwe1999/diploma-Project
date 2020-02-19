import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DiplomaprojectTestModule } from '../../../test.module';
import { EntryToHistoryDiseaseUpdateComponent } from 'app/entities/entry-to-history-disease/entry-to-history-disease-update.component';
import { EntryToHistoryDiseaseService } from 'app/entities/entry-to-history-disease/entry-to-history-disease.service';
import { EntryToHistoryDisease } from 'app/shared/model/entry-to-history-disease.model';

describe('Component Tests', () => {
  describe('EntryToHistoryDisease Management Update Component', () => {
    let comp: EntryToHistoryDiseaseUpdateComponent;
    let fixture: ComponentFixture<EntryToHistoryDiseaseUpdateComponent>;
    let service: EntryToHistoryDiseaseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [EntryToHistoryDiseaseUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EntryToHistoryDiseaseUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntryToHistoryDiseaseUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntryToHistoryDiseaseService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EntryToHistoryDisease(123);
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
        const entity = new EntryToHistoryDisease();
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
