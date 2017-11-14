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

  constructor(private ts: SocketService) { }

  ngOnInit() {
    this.ts.getInit();
  }




  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
