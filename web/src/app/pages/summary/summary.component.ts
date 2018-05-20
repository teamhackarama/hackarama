import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ApiService, Result } from "../../core/services/api.service";
import { HttpParams } from "@angular/common/http";
import { ChartData } from "chart.js";
import { ChartComponent, WordCloudData, WordCloudComponent } from "../../theme/components";

@Component({
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.scss"]
})
export class SummaryComponent implements AfterViewInit {
  public chartTotalData: ChartData = {};
  public chartPositiveData: ChartData = {};
  public chartNegativeData: ChartData = {};
  public results: Result[];
  public resultsTitle = 'Total';
  public wordCloudData: WordCloudData[] = [];
  public wordCloudOptions = {
    settings: {
      minFontSize: 10,
      maxFontSize: 100,
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    labels: true // false to hide hover labels
  };

  @ViewChild(WordCloudComponent) private wordcloud: WordCloudComponent;

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

  private setupGraph(data: Result[], color: string) {
    var buckets = this.bucketizeDates(data);
    var gradientPositive = this.chartPositive.context.createLinearGradient(
      0,
      0,
      0,
      400
    );
    gradientPositive.addColorStop(this._gradientStopValue, "#ffffff");
    gradientPositive.addColorStop(0, color);

    return {
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

      this.chartTotalData = this.setupGraph(this._totalData, '#6fdeff');
      this.chartPositiveData = this.setupGraph(this._positiveData, '#74ffbc');
      this.chartNegativeData = this.setupGraph(this._negativeData, '#ff4848');

      let wordMap = {};
      this._totalData.forEach(data => {
        let words = data.text.split(' ');
        words.forEach(word => {
          if (wordMap[word]) {
            wordMap[word]++;
          }
          else {
            wordMap[word] = 1;
          }
        });
      });

      Object.keys(wordMap).forEach(word => {
        this.wordCloudData.push({
          text: word,
          size: wordMap[word] * 100
        });
      });

      this.wordcloud.update();
    });
  }

  public renderChart(type: string) {
    switch(type) {
      case 'Positive':
        this.results = this._positiveData;
        break;
      case 'Negative': 
        this.results = this._negativeData;
        break;
      default:
        this.results = this._totalData;
        break;
    }
    this.resultsTitle = type;
  }
}
