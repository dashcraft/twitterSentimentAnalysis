import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../service/socket.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css'],
  providers: [SocketService]
})
export class MainComponent implements OnInit {

  @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;
  @ViewChild(BaseChartDirective) secondChart: BaseChartDirective;

  angular_data = [];
  react_data = [];
  angularChartData: Array<any> = [
    { data: [], label: 'Angular' }
  ];
  reactChartData: Array<any> = [
    { data: [], label: 'React' }
  ];

  reactChartLabels = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
  angularChartLabels = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
  lineChartOptions: any = {
    responsive: true
  };
  lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLegend = true;
  lineChartType = 'line';

  constructor(private ts: SocketService) { }

  ngOnInit() {
    this.ts.getInit();
  }


  triggerLineData() {
    const ang_map = this.angular_data.map(x => x.sentiment);
    const react_map = this.react_data.map(x => x.sentiment);
    console.log('ang_map', ang_map);
    const _angularChartData = [
      { data: ang_map, label: 'Angular' }
    ];

    const _reactChartData = [
      { data: react_map, label: 'React' }
    ];

    const reactChartLabels = [];
    let index = 0;
    react_map.map(() => {
      reactChartLabels.push(index.toString());
      index++;
    });

    const angularChartLabels = [];
    let ind = 0;
    ang_map.map(() => {
      angularChartLabels.push(ind.toString());
      ind++;
    });
    console.log('base chart', angularChartLabels);
    console.log('second chart', reactChartLabels);
    this.baseChart.chart.config.data.labels = angularChartLabels;
    this.angularChartData = _angularChartData;
    this.reactChartData = _reactChartData;
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
