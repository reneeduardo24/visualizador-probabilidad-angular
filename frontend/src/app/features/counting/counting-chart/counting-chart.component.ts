import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-counting-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './counting-chart.component.html',
  styleUrls: ['./counting-chart.component.scss'],
})
export class CountingChartComponent implements OnChanges {

  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() titulo = '';

  public barChartType: ChartType = 'bar';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: '',
      },
    },
    scales: {
      x: {
        ticks: { autoSkip: true, maxRotation: 0 },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  public barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  ngOnChanges(): void {
    this.barChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
        },
      ],
    };

    if (this.barChartOptions?.plugins?.title) {
      this.barChartOptions.plugins.title.text = this.titulo;
    }
  }
}
