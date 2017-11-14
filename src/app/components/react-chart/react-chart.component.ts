import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../service/socket.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-react-chart',
  templateUrl: './react-chart.component.html',
  styleUrls: ['./react-chart.component.css']
})
export class ReactChartComponent implements OnInit {
  avg: number;
  @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;

  react_data = [];
  reactChartData: Array<any> = [
    { data: [], label: 'React' }
  ];

  reactChartLabels = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
  lineChartOptions: any = {
    responsive: true
  };
  lineChartColors: Array<any> = [
    { // dark grey
      backgroundColor: 'rgba(0, 216, 255, 0.2)',
      borderColor: 'rgba(50, 49, 51, 1)',
      pointBackgroundColor: 'rgba(50, 49, 51, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  lineChartLegend = true;
  lineChartType = 'line';

  constructor(private ts: SocketService) { }

  ngOnInit() {
    this.ts
      .getInitReact()
      .subscribe(react => {
        console.log('init react was ', react);
        this.react_data = react;
        this.triggerLineData();
      });

    this.ts
      .getReact()
      .subscribe(react_tweet => {
        this.react_data.push(react_tweet);
        this.triggerLineData();
      });
  }



  triggerLineData() {
    const react_map = this.react_data.map(x => x.sentiment);
    const _reactChartData = [
      { data: react_map, label: 'React' }
    ];

    const reactChartLabels = [];
    let index = 0;
    react_map.map(() => {
      reactChartLabels.push(index.toString());
      index++;
    });

    this.avg = this.average(react_map);

    console.log('second chart', reactChartLabels);
    this.baseChart.chart.config.data.labels = reactChartLabels;
    this.reactChartData = _reactChartData;
  }


  average(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += parseInt(arr[i], 10);
    }
    return sum / arr.length;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
