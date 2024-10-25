import { WebSocket } from 'ws';

export interface WebSocketClient extends WebSocket {
  connectionId: string;
  userId: number;
}