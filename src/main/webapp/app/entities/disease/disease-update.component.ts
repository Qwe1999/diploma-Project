import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDisease, Disease } from 'app/shared/model/disease.model';
import { DiseaseService } from './disease.service';

@Component({
  selector: 'jhi-disease-update',
  templateUrl: './disease-update.component.html'
})
export class DiseaseUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    description: []
  });

  constructor(protected diseaseService: DiseaseService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disease }) => {
      this.updateForm(disease);
    });
  }

  updateForm(disease: IDisease): void {
    this.editForm.patchValue({
      id: disease.id,
      name: disease.name,
      description: disease.description
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const disease = this.createFromForm();
    if (disease.id !== undefined) {
      this.subscribeToSaveResponse(this.diseaseService.update(disease));
    } else {
      this.subscribeToSaveResponse(this.diseaseService.create(disease));
    }
  }

  private createFromForm(): IDisease {
    return {
      ...new Disease(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDisease>>): void {
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
}
