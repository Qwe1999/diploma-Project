import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { DiplomaprojectTestModule } from '../../../test.module';
import { MedicalTestDetailComponent } from 'app/entities/medical-test/medical-test-detail.component';
import { MedicalTest } from 'app/shared/model/medical-test.model';

describe('Component Tests', () => {
  describe('MedicalTest Management Detail Component', () => {
    let comp: MedicalTestDetailComponent;
    let fixture: ComponentFixture<MedicalTestDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ medicalTest: new MedicalTest(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiplomaprojectTestModule],
        declarations: [MedicalTestDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MedicalTestDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedicalTestDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load medicalTest on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.medicalTest).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
