import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DiplomaprojectTestModule } from '../../../test.module';
import { EntryToHistoryDiseaseDetailComponent } from 'app/entities/entry-to-history-disease/entry-to-history-disease-detail.component';
import { EntryToHistoryDisease } from 'app/shared/model/entry-to-history-disease.model';

describe('Component Tests', () => {
  describe('EntryToHistoryDisease Management Detail Component', () => {
    let comp: EntryToHistoryDiseaseDetailComponent;
    let fixture: ComponentFixture<EntryToHistoryDiseaseDetailComponent>;
    const route = ({ data: of({ entryToHistoryDisease: new EntryToHistoryDisease(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [EntryToHistoryDiseaseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EntryToHistoryDiseaseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EntryToHistoryDiseaseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load entryToHistoryDisease on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.entryToHistoryDisease).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
