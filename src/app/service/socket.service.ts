import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SocketService {

  constructor(private socket: Socket) { }

  getInitAng() {
    console.log('angular_total came back');
    return this.socket
      .fromEvent<any>('angular_total')
      .map(data => data.data);

  }

  getInitReact() {
    console.log('react_total came back');
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
    console.log('get init was called');
    this.socket
      .emit('get_angular', {});
    this.socket
      .emit('get_react', {});
  }

}
