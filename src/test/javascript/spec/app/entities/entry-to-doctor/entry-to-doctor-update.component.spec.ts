import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DiplomaprojectTestModule } from '../../../test.module';
import { EntryToDoctorUpdateComponent } from 'app/entities/entry-to-doctor/entry-to-doctor-update.component';
import { EntryToDoctorService } from 'app/entities/entry-to-doctor/entry-to-doctor.service';
import { EntryToDoctor } from 'app/shared/model/entry-to-doctor.model';

describe('Component Tests', () => {
  describe('EntryToDoctor Management Update Component', () => {
    let comp: EntryToDoctorUpdateComponent;
    let fixture: ComponentFixture<EntryToDoctorUpdateComponent>;
    let service: EntryToDoctorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [EntryToDoctorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EntryToDoctorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntryToDoctorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntryToDoctorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EntryToDoctor(123);
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
        const entity = new EntryToDoctor();
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
