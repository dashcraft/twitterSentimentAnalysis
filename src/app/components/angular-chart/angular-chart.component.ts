import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../service/socket.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-angular-chart',
  templateUrl: './angular-chart.component.html',
  styleUrls: ['./angular-chart.component.css']
})
export class AngularChartComponent implements OnInit {
  avg: number;

  @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;


  angular_data = [];
  angularChartData: Array<any> = [
    { data: [], label: 'Angular' }
  ];

  angularChartLabels = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
  lineChartOptions: any = {
    responsive: true
  };
  // backgroundColor: 'rgba(211, 47, 47, 1)',
  // borderColor: 'rgba(244, 67, 54, 1)',
  // pointBackgroundColor: 'rgba(148,159,177,1)',


  lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(244, 67, 54, 0.2)',
      borderColor: 'rgba(244, 67, 54, 1)',
      pointBackgroundColor: 'rgba(244, 67, 54, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLegend = true;
  lineChartType = 'line';

  constructor(private ts: SocketService) { }

  ngOnInit() {
    this.ts
      .getInitAng()
      .subscribe(ang => {
        console.log('init ang was ', ang);
        this.angular_data = ang;
        this.triggerLineData();
      });


    this.ts
      .getAngular()
      .subscribe(angular_tweet => {
        this.angular_data.push(angular_tweet);
        this.triggerLineData();
      });
  }


  triggerLineData() {
    const ang_map = this.angular_data.map(x => x.sentiment);
    const _angularChartData = [
      { data: ang_map, label: 'Angular' }
    ];


    const angularChartLabels = [];
    let ind = 0;
    ang_map.map(() => {
      ind++;
      angularChartLabels.push(ind.toString());
    });
    this.avg = this.average(ang_map) || 0;
    this.baseChart.chart.config.data.labels = angularChartLabels;
    this.angularChartData = _angularChartData;
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
