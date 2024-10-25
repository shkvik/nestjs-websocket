import { Injectable, Logger } from "@nestjs/common";
import { WebSocketClient } from "./interface";


@Injectable()
export class WebsocketManager {
  private readonly logger = new Logger(WebsocketManager.name);
  private readonly clients = new Map<string, WebSocketClient>();

  public async connect(wsClient: WebSocketClient) {
    // Here you can use any database or other methods to controll user sessions
    this.clients.set(wsClient.connectionId, wsClient);
  }

  public async disconnect(wsClient: WebSocketClient) {
    // async needs to delete from redis or other dbs
    this.clients.delete(wsClient.connectionId);
  }

  public send(connectionId: string, data: any) {
    if (this.clients.has(connectionId)) {
      const client = this.clients.get(connectionId);
      client.send(data);
    }
  }

  public has(connectionId: string): boolean {
    return this.clients.has(connectionId);
  }
}