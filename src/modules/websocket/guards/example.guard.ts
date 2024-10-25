import { IncomingMessage } from "http";
import { WebSocketClient } from "../interface";
import { WebsocketGuard } from "../interface/websocket.guard";

export class TestGuard implements WebsocketGuard {
  canActivate(client: WebSocketClient, request: IncomingMessage): boolean {
    return true;
  }
}