import { WebsocketManager } from './websocket.manager';
import { IncomingMessage } from 'http';
import { Server } from 'ws';
import { UseGuards } from '@nestjs/common';
import { WebSocketClient } from './interface';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ConnectionGuard, TestGuard } from './guards/connection.guard';


@WebSocketGateway(8080, { transports: ['websocket'] })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  // @WebSocketServer()
  // public server: Server;

  constructor(private readonly websocketManagerService: WebsocketManager) {}

  @ConnectionGuard(TestGuard)
  public async handleConnection(client: WebSocketClient, request: IncomingMessage) {
    await this.websocketManagerService.connect(client, request);
  }

  public async handleDisconnect(client: WebSocketClient) {
    await this.websocketManagerService.disconnect(client);
  }
}
