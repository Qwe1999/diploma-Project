import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntryToHistoryDisease } from 'app/shared/model/entry-to-history-disease.model';

@Component({
  selector: 'jhi-entry-to-history-disease-detail',
  templateUrl: './entry-to-history-disease-detail.component.html'
})
export class EntryToHistoryDiseaseDetailComponent implements OnInit {
  entryToHistoryDisease: IEntryToHistoryDisease | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entryToHistoryDisease }) => (this.entryToHistoryDisease = entryToHistoryDisease));
  }

  previousState(): void {
    window.history.back();
  }
}
