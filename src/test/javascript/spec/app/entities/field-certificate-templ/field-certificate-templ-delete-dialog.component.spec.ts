import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DiplomaprojectTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { FieldCertificateTemplDeleteDialogComponent } from 'app/entities/field-certificate-templ/field-certificate-templ-delete-dialog.component';
import { FieldCertificateTemplService } from 'app/entities/field-certificate-templ/field-certificate-templ.service';

describe('Component Tests', () => {
  describe('FieldCertificateTempl Management Delete Component', () => {
    let comp: FieldCertificateTemplDeleteDialogComponent;
    let fixture: ComponentFixture<FieldCertificateTemplDeleteDialogComponent>;
    let service: FieldCertificateTemplService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [FieldCertificateTemplDeleteDialogComponent]
      })
        .overrideTemplate(FieldCertificateTemplDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FieldCertificateTemplDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FieldCertificateTemplService);
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
