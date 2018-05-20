import { Component, Input, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartData } from 'chart.js';

@Component({
  selector: 'app-chart',
  template: `
  <div>
    <canvas #chart></canvas>
  </div>
  `
})
export class ChartComponent implements OnInit, OnDestroy {
    @ViewChild('chart') chart: ElementRef;

    @Input()
    public set chartData(data: ChartData) {
        this._chartData = data;
        if (this._renderedChart) {
            this._renderedChart.data = this._chartData;
            this._renderedChart.update();
        }
    }

    public get context(): CanvasRenderingContext2D {
        return this._context;
    }

    private _renderedChart: Chart;
    private _chartData: ChartData = {};
    private _context: CanvasRenderingContext2D;

    ngOnInit(): void {
        this._context = this.chart.nativeElement.getContext('2d');
        this._renderedChart = new Chart(
            this._context,
            {
                type: 'bar',
                data: this._chartData,
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: false,
                            barThickness: 10
                        }],
                        yAxes: [{
                            display: false
                        }]
                    }
                }
            }
        );
    }

    ngOnDestroy(): void {
        if (this._renderedChart) {
            this._renderedChart.destroy();
        }
    }
}
