import { WebsocketManager } from './websocket.manager';
import { WebSocketClient } from './interface';
import { ExampleGuard } from './guards/example.guard';
import { ConnectionGuard, WebSocketGatewayV2 } from './common';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { CONFIG_APP } from 'src/config/config.export';
import { Inject } from '@nestjs/common';


@WebSocketGatewayV2({ port: CONFIG_APP.WS_PORT })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @Inject()
  private readonly websocketManager: WebsocketManager;

  @ConnectionGuard(ExampleGuard)
  public async handleConnection(client: WebSocketClient): Promise<void> {
    await this.websocketManager['connect'](client);
  }

  public async handleDisconnect(client: WebSocketClient): Promise<void> {
    await this.websocketManager['disconnect'](client);
  }
}
