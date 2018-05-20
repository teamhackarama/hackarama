import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ApiService, Result } from "../../core/services/api.service";
import { HttpParams } from "@angular/common/http";
import { ChartData } from "chart.js";
import { ChartComponent } from "../../theme/components";

@Component({
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.scss"]
})
export class SummaryComponent implements AfterViewInit {
  public chartTotalData: ChartData = {};
  public chartPositiveData: ChartData = {};
  public chartNegativeData: ChartData = {};
  public results: Result[];

  @ViewChild(ChartComponent) private chartTotal: ChartComponent;

  @ViewChild(ChartComponent) private chartPositive: ChartComponent;

  @ViewChild(ChartComponent) private chartNegative: ChartComponent;



  private _gradientStopValue = 0.4;
  private _positiveData: Result[] = [];
  private _negativeData: Result[] = [];
  private _totalData: Result[] = [];

  constructor(private apiService: ApiService) {}

  private bucketizeDates(data: Result[]) {
    var dateMap = {};
    data.forEach(item => {
      if (dateMap[item.date]) {
        dateMap[item.date]++;
      }
      else {
        dateMap[item.date] = 1;
      }
    });

    var sortedKeys = Object.keys(dateMap).sort();
    return sortedKeys.map(key => {
      return dateMap[key];
    })
  }

  private setupGraph(data: Result[]) {

  }

  private setupTotalData(data: Result[]) {
    var buckets = this.bucketizeDates(data);

    var gradient = this.chartTotal.context.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(this._gradientStopValue, "#ffffff");
    gradient.addColorStop(0, "#6fdeff");

    this.chartTotalData = {
      labels: new Array(buckets.length),
      datasets: [
        {
          data: buckets,
          borderWidth: 0,
          backgroundColor: gradient
        }
      ]
    };
  }

  private setupPositiveData(data: Result[]) {
    var buckets = this.bucketizeDates(data);
    var gradientPositive = this.chartPositive.context.createLinearGradient(
      0,
      0,
      0,
      400
    );
    gradientPositive.addColorStop(this._gradientStopValue, "#ffffff");
    gradientPositive.addColorStop(0, "#74ffbc");

    this.chartPositiveData = {
      labels: new Array(buckets.length),
      datasets: [
        {
          data: buckets,
          borderWidth: 0,
          backgroundColor: gradientPositive
        }
      ]
    };
  }

  private setupNegativeData(data: Result[]) {
    var buckets = this.bucketizeDates(data);
    var gradientNegative = this.chartPositive.context.createLinearGradient(
      0,
      0,
      0,
      400
    );
    gradientNegative.addColorStop(this._gradientStopValue, "#ffffff");
    gradientNegative.addColorStop(0, "#ff4848");

    this.chartNegativeData = {
      labels: new Array(buckets.length),
      datasets: [
        {
          data: buckets,
          borderWidth: 0,
          backgroundColor: gradientNegative
        }
      ]
    };
  }

  ngAfterViewInit(): void {

    this.apiService.get().subscribe(results => {
      this._totalData = results;
      results.forEach(result => {
        if (result.sentiment) {
          this._positiveData.push(result);
        } else {
          this._negativeData.push(result);
        }
      });

      this.results = this._totalData;
      
      this.setupTotalData(this._totalData);
      this.setupPositiveData(this._positiveData);
      this.setupNegativeData(this._negativeData);
    });
  }
}
