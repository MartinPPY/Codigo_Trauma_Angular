import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs'
import { route } from './route';

@Injectable({
  providedIn: 'root',
})
export class Websocket {

  private client!: Client

  connect(onMessage: (data: any) => void) {

    const token = sessionStorage.getItem('token')

    this.client = new Client({
      brokerURL: `${route}/ws?token=${token}`,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Websocket conectado')

        this.client.subscribe('/topic/emergencies', (message: any) => {
          
          onMessage(message)
        })

      },
      onStompError: frame => {
        console.error('❌ STOMP error:', frame);
      }

    })

    this.client.activate();

  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
    }
  }
}
