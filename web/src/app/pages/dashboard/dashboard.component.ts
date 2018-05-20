import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { HttpParams } from '@angular/common/http';

@Component({
  templateUrl: './dashboard.component.html',
  styles: [':host { width: 100%; }']
})
export class DashboardComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }
}
