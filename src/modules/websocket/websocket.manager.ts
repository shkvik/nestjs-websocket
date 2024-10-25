import { HttpException, Injectable, Logger } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { IncomingMessage } from "node:http";
import { WebSocketClient } from "./interface";


@Injectable()
export class WebsocketManager {

  private readonly logger = new Logger(WebsocketManager.name);
  private readonly clients = new Map<string, WebSocketClient>();

  public async connect(wsClient: WebSocketClient, request: IncomingMessage) {
    wsClient.connectionId = randomUUID();
    this.clients.set(wsClient.connectionId, wsClient);
    this.logger.log(`${this.clients.size} users connected`);
  }

  public async disconnect(wsClient: WebSocketClient) {
    if (this.clients.has(wsClient?.connectionId)) {
      this.clients.delete(wsClient.connectionId);
      this.logger.log(`${this.clients.size} users are connected`);
    }
    wsClient.close();
  }
}