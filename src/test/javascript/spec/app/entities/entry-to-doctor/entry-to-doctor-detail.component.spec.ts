import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DiplomaprojectTestModule } from '../../../test.module';
import { EntryToDoctorDetailComponent } from 'app/entities/entry-to-doctor/entry-to-doctor-detail.component';
import { EntryToDoctor } from 'app/shared/model/entry-to-doctor.model';

describe('Component Tests', () => {
  describe('EntryToDoctor Management Detail Component', () => {
    let comp: EntryToDoctorDetailComponent;
    let fixture: ComponentFixture<EntryToDoctorDetailComponent>;
    const route = ({ data: of({ entryToDoctor: new EntryToDoctor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [EntryToDoctorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EntryToDoctorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EntryToDoctorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load entryToDoctor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.entryToDoctor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
