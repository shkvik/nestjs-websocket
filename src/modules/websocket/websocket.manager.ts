import { Injectable, Logger } from "@nestjs/common";
import { WebSocketClient } from "./interface";

@Injectable()
export class WebsocketManager {
  private readonly handlers = new Map<string, Array<Function>>();
  private readonly logger = new Logger(WebsocketManager.name);
  private readonly clients = new Map<string, WebSocketClient>();

  public async connect(wsClient: WebSocketClient) {
    // Here you can use any database or other methods to controll user sessions
    this.attachHandlers(wsClient);
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

  public addHandler(event: string, handler: Function): void {
    if (this.handlers.has(event)) {
      this.handlers.get(event).push(handler);
    } else {
      this.handlers.set(event, [handler]);
    }
  }

  private attachHandlers(client: WebSocketClient): void {
    client.on('message', async (data) => {
      const obj = JSON.parse(String(data));

      if (obj.hasOwnProperty('event')) {
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