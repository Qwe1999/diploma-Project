import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DiplomaprojectTestModule } from '../../../test.module';
import { EntryToDoctorComponent } from 'app/entities/entry-to-doctor/entry-to-doctor.component';
import { EntryToDoctorService } from 'app/entities/entry-to-doctor/entry-to-doctor.service';
import { EntryToDoctor } from 'app/shared/model/entry-to-doctor.model';

describe('Component Tests', () => {
  describe('EntryToDoctor Management Component', () => {
    let comp: EntryToDoctorComponent;
    let fixture: ComponentFixture<EntryToDoctorComponent>;
    let service: EntryToDoctorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [EntryToDoctorComponent]
      })
        .overrideTemplate(EntryToDoctorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntryToDoctorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntryToDoctorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EntryToDoctor(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.entryToDoctors && comp.entryToDoctors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
