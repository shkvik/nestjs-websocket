import { WebsocketManager } from './websocket.manager';
import { IncomingMessage } from 'http';
import { WebSocketClient } from './interface';
import { ExampleGuard } from './guards/example.guard';
import { ConnectionGuard, WebSocketGatewayV2 } from './common';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
  

@WebSocketGatewayV2(8080)
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly websocketManager: WebsocketManager) {}

  @ConnectionGuard(ExampleGuard)
  public async handleConnection(client: WebSocketClient, request: IncomingMessage): Promise<void> {
    await this.websocketManager.connect(client, request);
  }

  public async handleDisconnect(client: WebSocketClient): Promise<void> {
    await this.websocketManager.disconnect(client);
  }
}
