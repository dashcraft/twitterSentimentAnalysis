import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SocketService {

  constructor(private socket: Socket) { }

  getInitAng() {
    console.log('get init ang');
    return this.socket
      .fromEvent<any>('angular_total')
      .map(data => data.data);

  }

  getInitReact() {
    return this.socket
      .fromEvent<any>('react_total')
      .map(data => data.data);
  }

  getAngular() {
    return this.socket
      .fromEvent<any>('angular_sent')
      .map(data => data);
  }

  getReact() {
    return this.socket
      .fromEvent<any>('react_sent')
      .map(data => data);
  }

  getInit() {
    this.socket
      .emit('get_angular', {});
    this.socket
      .emit('get_react', {});
  }

}
