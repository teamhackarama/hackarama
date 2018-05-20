import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ApiService, Result } from "../../core/services/api.service";
import { HttpParams } from "@angular/common/http";
import { ChartData } from "chart.js";
import { ChartComponent, WordCloudData, WordCloudComponent } from "../../theme/components";
import { clean } from "./stopwards"


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
  public positiveData: Result[] = [];
  public negativeData: Result[] = [];
  public totalData: Result[] = [];

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

  private sortCollection(data: Result[]) {
    return data.sort((a, b) => {
      if(a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    });
  }

  ngAfterViewInit(): void {

    this.apiService.get().subscribe(results => {
      this.totalData = results;
      results.forEach(result => {
        if (result.sentiment) {
          this.positiveData.push(result);
        } else {
          this.negativeData.push(result);
        }
      });

      this.totalData = this.sortCollection(this.totalData);
      this.positiveData = this.sortCollection(this.positiveData);
      this.negativeData = this.sortCollection(this.negativeData);

      this.chartTotalData = this.setupGraph(this.totalData, '#6fdeff');
      this.chartPositiveData = this.setupGraph(this.positiveData, '#74ffbc');
      this.chartNegativeData = this.setupGraph(this.negativeData, '#ff4848');

      this.renderChart('Total');
    });
  }

  private updateWordcloud(results: Result[]) {
    let wordMap = {};
    this.wordCloudData = [];
    results.forEach(data => {
      let words = clean(data.text).split(' ');
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
    this.wordcloud.wordData = this.wordCloudData;
    this.wordcloud.update();
  }

  public renderChart(type: string) {
    switch(type) {
      case 'Positive':
        this.results = this.positiveData;
        break;
      case 'Negative': 
        this.results = this.negativeData;
        break;
      default:
        this.results = this.totalData;
        break;
    }
    this.resultsTitle = type;
    this.updateWordcloud(this.results);
  }
}
