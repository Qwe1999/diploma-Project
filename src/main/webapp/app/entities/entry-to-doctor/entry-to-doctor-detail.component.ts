import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntryToDoctor } from 'app/shared/model/entry-to-doctor.model';

@Component({
  selector: 'jhi-entry-to-doctor-detail',
  templateUrl: './entry-to-doctor-detail.component.html'
})
export class EntryToDoctorDetailComponent implements OnInit {
  entryToDoctor: IEntryToDoctor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entryToDoctor }) => (this.entryToDoctor = entryToDoctor));
  }

  previousState(): void {
    window.history.back();
  }
}
