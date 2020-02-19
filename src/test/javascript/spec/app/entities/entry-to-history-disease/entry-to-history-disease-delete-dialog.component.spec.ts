import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DiplomaprojectTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { EntryToHistoryDiseaseDeleteDialogComponent } from 'app/entities/entry-to-history-disease/entry-to-history-disease-delete-dialog.component';
import { EntryToHistoryDiseaseService } from 'app/entities/entry-to-history-disease/entry-to-history-disease.service';

describe('Component Tests', () => {
  describe('EntryToHistoryDisease Management Delete Component', () => {
    let comp: EntryToHistoryDiseaseDeleteDialogComponent;
    let fixture: ComponentFixture<EntryToHistoryDiseaseDeleteDialogComponent>;
    let service: EntryToHistoryDiseaseService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [EntryToHistoryDiseaseDeleteDialogComponent]
      })
        .overrideTemplate(EntryToHistoryDiseaseDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EntryToHistoryDiseaseDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntryToHistoryDiseaseService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
