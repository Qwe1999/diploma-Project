import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IMedicalTest, MedicalTest } from 'app/shared/model/medical-test.model';
import { MedicalTestService } from './medical-test.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IEntryToHistoryDisease } from 'app/shared/model/entry-to-history-disease.model';
import { EntryToHistoryDiseaseService } from 'app/entities/entry-to-history-disease/entry-to-history-disease.service';

@Component({
  selector: 'jhi-medical-test-update',
  templateUrl: './medical-test-update.component.html'
})
export class MedicalTestUpdateComponent implements OnInit {
  isSaving = false;
  entrytohistorydiseases: IEntryToHistoryDisease[] = [];

  editForm = this.fb.group({
    id: [],
    indicator: [],
    value: [],
    image: [],
    imageContentType: [],
    entryToHistoryDisease: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected medicalTestService: MedicalTestService,
    protected entryToHistoryDiseaseService: EntryToHistoryDiseaseService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medicalTest }) => {
      this.updateForm(medicalTest);

      this.entryToHistoryDiseaseService
        .query()
        .subscribe((res: HttpResponse<IEntryToHistoryDisease[]>) => (this.entrytohistorydiseases = res.body || []));
    });
  }

  updateForm(medicalTest: IMedicalTest): void {
    this.editForm.patchValue({
      id: medicalTest.id,
      indicator: medicalTest.indicator,
      value: medicalTest.value,
      image: medicalTest.image,
      imageContentType: medicalTest.imageContentType,
      entryToHistoryDisease: medicalTest.entryToHistoryDisease
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('diplomaprojectApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const medicalTest = this.createFromForm();
    if (medicalTest.id !== undefined) {
      this.subscribeToSaveResponse(this.medicalTestService.update(medicalTest));
    } else {
      this.subscribeToSaveResponse(this.medicalTestService.create(medicalTest));
    }
  }

  private createFromForm(): IMedicalTest {
    return {
      ...new MedicalTest(),
      id: this.editForm.get(['id'])!.value,
      indicator: this.editForm.get(['indicator'])!.value,
      value: this.editForm.get(['value'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      image: this.editForm.get(['image'])!.value,
      entryToHistoryDisease: this.editForm.get(['entryToHistoryDisease'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedicalTest>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IEntryToHistoryDisease): any {
    return item.id;
  }
}
