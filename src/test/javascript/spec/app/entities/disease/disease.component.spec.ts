import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DiplomaprojectTestModule } from '../../../test.module';
import { DiseaseComponent } from 'app/entities/disease/disease.component';
import { DiseaseService } from 'app/entities/disease/disease.service';
import { Disease } from 'app/shared/model/disease.model';

describe('Component Tests', () => {
  describe('Disease Management Component', () => {
    let comp: DiseaseComponent;
    let fixture: ComponentFixture<DiseaseComponent>;
    let service: DiseaseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [DiseaseComponent]
      })
        .overrideTemplate(DiseaseComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiseaseComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiseaseService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Disease(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.diseases && comp.diseases[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
