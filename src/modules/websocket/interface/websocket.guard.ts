import { IncomingMessage } from "http";
import { WebSocketClient } from "./websocket.client";

export interface WebsocketGuard {
  canActivate(client: WebSocketClient, request: IncomingMessage): boolean | Promise<boolean>;
};