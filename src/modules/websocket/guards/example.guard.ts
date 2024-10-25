import { IncomingMessage } from "http";
import { WebSocketClient } from "../interface";
import { WebsocketGuard } from "../interface/websocket.guard";
import { randomUUID } from "node:crypto";

export class ExampleGuard implements WebsocketGuard {
  canActivate(client: WebSocketClient, request: IncomingMessage): boolean {

    client.userId = 1;
    client.connectionId = randomUUID();

    return true;
  }
}

export class ReallyLastGuard implements WebsocketGuard {
  async canActivate(client: WebSocketClient, request: IncomingMessage): Promise<boolean> {
    const jwtVerifyMock = async (token: string) => { 
      return { userId: 1 };
    };
    // 25.10.2024 it was actual 
    // It is better to not separate token as Bearer xxx
    // Without space between them!!!
    const token = request.headers['sec-websocket-protocol'];
    const { userId } = await jwtVerifyMock(token);
    
    client.userId = userId;
    client.connectionId = randomUUID();

    return true;
  }
}