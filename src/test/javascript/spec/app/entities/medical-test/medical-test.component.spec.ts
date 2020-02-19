import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DiplomaprojectTestModule } from '../../../test.module';
import { MedicalTestComponent } from 'app/entities/medical-test/medical-test.component';
import { MedicalTestService } from 'app/entities/medical-test/medical-test.service';
import { MedicalTest } from 'app/shared/model/medical-test.model';

describe('Component Tests', () => {
  describe('MedicalTest Management Component', () => {
    let comp: MedicalTestComponent;
    let fixture: ComponentFixture<MedicalTestComponent>;
    let service: MedicalTestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [MedicalTestComponent]
      })
        .overrideTemplate(MedicalTestComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedicalTestComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedicalTestService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MedicalTest(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.medicalTests && comp.medicalTests[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
