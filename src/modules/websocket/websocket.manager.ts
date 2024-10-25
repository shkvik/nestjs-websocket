import { HttpException, Injectable, Logger } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { IncomingMessage } from "node:http";
import { WebSocketClient } from "./interface";


@Injectable()
export class WebsocketManager {

  private readonly logger = new Logger(WebsocketManager.name);
  private readonly clients = new Map<string, WebSocketClient>();

  public async connect(wsClient: WebSocketClient, request: IncomingMessage) {

    throw new Error("YES connect");
    const connectionId = randomUUID();
    wsClient.connectionId = connectionId;

    this.clients.set(connectionId, wsClient);
    this.logger.log(`${this.clients.size} users connected`);
  }

  public async disconnect(wsClient: WebSocketClient) {
    throw new Error("YES disconnect");
    if (this.clients.has(wsClient?.userId)) {
      this.clients.delete(wsClient.userId);
      this.logger.log(`${this.clients.size} users are connected`);
    }
    wsClient.close();
  }
}