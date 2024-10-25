import { Injectable } from '@nestjs/common';
import { WebsocketManager } from './websocket.manager';

@Injectable()
export class WebsocketService {

  constructor(private readonly websocketManager: WebsocketManager) {}

  public send() {
    
  }
}
