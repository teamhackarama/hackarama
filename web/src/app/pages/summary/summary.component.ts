import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ApiService } from "../../core/services/api.service";
import { HttpParams } from "@angular/common/http";
import { ChartData } from "chart.js";
import { ChartComponent } from "../../theme/components";

@Component({
  templateUrl: "./summary.component.html",
  styles: [":host { width: 100%; }"]
})
export class SummaryComponent implements AfterViewInit {
  public chartTotalData: ChartData = {};
  public chartPositiveData: ChartData = {};
  public chartNegativeData: ChartData = {};

  @ViewChild(ChartComponent)
  private chartTotal: ChartComponent;
  
  @ViewChild(ChartComponent)
  private chartPositive: ChartComponent;
  
  @ViewChild(ChartComponent)
  private chartNegative: ChartComponent;

  private _gradientStopValue = 0.4;

  constructor(private apiService: ApiService) {}

  ngAfterViewInit(): void {
    var gradient = this.chartTotal.context.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(this._gradientStopValue, '#ffffff');
    gradient.addColorStop(0, '#6fdeff');

    this.chartTotalData = {
      labels: new Array(12),
      datasets: [
        {
          data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
          borderWidth: 0,
          backgroundColor: gradient 
        }
      ]
    };

    var gradientPositive = this.chartPositive.context.createLinearGradient(0, 0, 0, 400);
    gradientPositive.addColorStop(this._gradientStopValue, '#ffffff');
    gradientPositive.addColorStop(0, '#74ffbc');

    this.chartPositiveData = {
      labels: new Array(12),
      datasets: [
        {
          data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
          borderWidth: 0,
          backgroundColor: gradientPositive
        }
      ]
    };

    var gradientNegative = this.chartPositive.context.createLinearGradient(0, 0, 0, 400);
    gradientNegative.addColorStop(this._gradientStopValue, '#ffffff');
    gradientNegative.addColorStop(0, '#ff4848');

    this.chartNegativeData = {
      labels: new Array(12),
      datasets: [
        {
          data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
          borderWidth: 0,
          backgroundColor: gradientNegative
        }
      ]
    };
  }
}
