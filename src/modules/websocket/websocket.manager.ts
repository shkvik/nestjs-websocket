import { HttpException, Injectable, Logger } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { IncomingMessage } from "node:http";
import { WebSocketClient } from "./interface";


@Injectable()
export class WebsocketManager {
  private readonly logger = new Logger(WebsocketManager.name);
  private readonly clients = new Map<string, WebSocketClient>();


  public async connect(wsClient: WebSocketClient, request: IncomingMessage) {
    try {

      const connectionId = randomUUID();
      
      //wsClient.connectionId = connectionId;
      //wsClient.userId = payload.userId;

      this.clients.set(connectionId, wsClient);
      this.logger.log(`${this.clients.size} users connected`);

      wsClient.send(
        JSON.stringify({
          event: `SuccessConnection`,
          payload: "Hello World",
        }),
      );
    } catch (err) {
      this.handleException({
        wsClient: wsClient,
        err: err,
      });
    }
  }
  public async disconnect(wsClient: WebSocketClient) {
    if (this.clients.has(wsClient.userId)) {
      this.clients.delete(wsClient.userId);
      this.logger.log(`${this.clients.size} users are connected`);
    }
    wsClient.close();
  }


  private handleException(dto: { err: any; wsClient: WebSocketClient }) {
    if (dto.err instanceof HttpException) {
      dto.wsClient.send(JSON.stringify(dto.err.message));
    }
    dto.wsClient.close();
  }
}