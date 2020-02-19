import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { DiplomaprojectTestModule } from '../../../test.module';
import { EntryToHistoryDiseaseComponent } from 'app/entities/entry-to-history-disease/entry-to-history-disease.component';
import { EntryToHistoryDiseaseService } from 'app/entities/entry-to-history-disease/entry-to-history-disease.service';
import { EntryToHistoryDisease } from 'app/shared/model/entry-to-history-disease.model';

describe('Component Tests', () => {
  describe('EntryToHistoryDisease Management Component', () => {
    let comp: EntryToHistoryDiseaseComponent;
    let fixture: ComponentFixture<EntryToHistoryDiseaseComponent>;
    let service: EntryToHistoryDiseaseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [EntryToHistoryDiseaseComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(EntryToHistoryDiseaseComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntryToHistoryDiseaseComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntryToHistoryDiseaseService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EntryToHistoryDisease(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.entryToHistoryDiseases && comp.entryToHistoryDiseases[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EntryToHistoryDisease(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.entryToHistoryDiseases && comp.entryToHistoryDiseases[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
