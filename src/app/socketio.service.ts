import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';

@Injectable()
export class SocketioService {

  // Our socket connection
  private socket;

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {

    // const environment = {
    //         production: false,
    //         SOCKET_ENDPOINT: 'http://localhost:4000'
    //       };
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`

    this.socket = io('http://202.164.38.204:9001/');
    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    let observable = new Observable(observer => {
        this.socket.on('iot_gateway_notification', (data) => {
          console.log("Received message from Websocket Server")
          observer.next(data);
        }
        )

        this.socket.on('message', (data) => {
          console.log("Received message from Websocket Server")
          observer.next(data);
        }
        )

        this.socket.on('iot_gateway_command_response', (data) => {
          console.log("Received message from Websocket Server")
          observer.next(data);
        }
        )

        this.socket.on('modbus_command_response', (data) => {
          console.log("Received message from Websocket Server")
          observer.next(data);
        }
        )

        

       
        

        // this.socket.on('iot_gateway_commands', (data) => {
        //   console.log("Received message from Websocket Server")
        //   observer.next(data);
        // }
        // )

        

        this.socket.on('modbus_notification', (data) => {
          console.log("Received message from Websocket Server")
          observer.next(data);
        }
        )

        

        return () => {
          this.socket.disconnect();
        }

       
        

       
    });

    

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
        next: (data: any) => {
             console.log("datasend:",data);
          if(data.cmdtype == "modbus_commands"){
            this.socket.emit('modbus_commands', JSON.stringify(data));
          }else{
            this.socket.emit('iot_gateway_commands', JSON.stringify(data));
          }

        },
    };
   
    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer, observable);

  }

}
