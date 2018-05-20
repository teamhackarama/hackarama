import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { HttpParams } from '@angular/common/http';

@Component({
  templateUrl: './summary.component.html',
  styles: [':host { width: 100%; }']
})
export class SummaryComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }
}
