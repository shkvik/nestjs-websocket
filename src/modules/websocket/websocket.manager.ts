import { Injectable, Logger } from "@nestjs/common";
import { WebSocketClient } from "./interface";
import { RawData } from "ws";

@Injectable()
export class WebsocketManager {

  private readonly handlers = new Map<string, Function[]>();
  private readonly clients = new Map<string, WebSocketClient>();

  private async connect(wsClient: WebSocketClient) {
    // Here you can use any database or other methods to controll user sessions
    this.attachHandlers(wsClient);
    this.clients.set(wsClient.connectionId, wsClient);
  }

  private async disconnect(wsClient: WebSocketClient) {
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

  private addHandler(event: string, handler: Function): void {
    if (this.handlers.has(event)) {
      this.handlers.get(event).push(handler);
    } else {
      this.handlers.set(event, [handler]);
    }
  }

  private attachHandlers(client: WebSocketClient): void {
    const getObject = (data: RawData): any => {
      try {
        return JSON.parse(String(data));
      } catch {
        return undefined;
      }
    };

    client.on('message', async (data) => {
      const obj = getObject(data);

      if (obj && obj.hasOwnProperty('event')) {
        if (this.handlers.has(obj.event)) {
          const functions = this.handlers.get(obj.event);
          const responses = [];
          for (const func of functions) {
            const res = await func(data);
            if (res) {
              responses.push(res);
            }
          }
          if (responses.length === 1) {
            client.send(JSON.stringify(responses[0]));
          }
          if (responses.length > 1) {
            client.send(JSON.stringify(responses));
          }
        }
      }
    });
  }
}