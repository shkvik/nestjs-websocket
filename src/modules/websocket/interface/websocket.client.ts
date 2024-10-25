import { WebSocket } from 'ws';

export interface WebSocketClient extends WebSocket {
  userId: string;
}