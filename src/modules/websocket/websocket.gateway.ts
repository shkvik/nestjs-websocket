import { WebsocketManager } from './websocket.manager';
import { IncomingMessage } from 'http';
import { WebSocketClient } from './interface';
import { ExampleGuard } from './guards/example.guard';
import { ConnectionGuard, WebSocketGatewayV2 } from './common';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { CONFIG_APP } from 'src/config/config.export';
  

@WebSocketGatewayV2({ port: CONFIG_APP.WS_PORT })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly websocketManager: WebsocketManager) {}

  @ConnectionGuard(ExampleGuard)
  public async handleConnection(client: WebSocketClient): Promise<void> {
    await this.websocketManager.connect(client);
  }

  public async handleDisconnect(client: WebSocketClient): Promise<void> {
    await this.websocketManager.disconnect(client);
  }
}
