import { WebsocketManager } from './websocket.manager';
import { IncomingMessage } from 'http';
import { WebSocketClient } from './interface';
import { WebsocketGuard } from './common/websocket.guard.decorator';
import { TestGuard } from './guards/example.guard';
import { WebSocketGatewayV2 } from './common/websocket.gateway.decorator';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';


@WebSocketGatewayV2(8080)
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly websocketManagerService: WebsocketManager) {}

  @WebsocketGuard(TestGuard)
  public async handleConnection(client: WebSocketClient, request: IncomingMessage) {
    await this.websocketManagerService.connect(client, request);
  }

  public async handleDisconnect(client: WebSocketClient) {
    await this.websocketManagerService.disconnect(client);
  }
}
