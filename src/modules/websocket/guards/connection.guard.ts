import { IncomingMessage } from "http";
import { WebSocketClient } from "../interface";


export interface WebsocketGuard {
  canActivate(client: WebSocketClient, request: IncomingMessage): boolean | Promise<boolean>;
}

export class TestGuard implements WebsocketGuard {
  canActivate(client: WebSocketClient, request: IncomingMessage): boolean {
    return true;
  }
}

export function ConnectionGuard(...guards: (WebsocketGuard | { new(): WebsocketGuard })[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;

    descriptor.value = async function (client: WebSocketClient, request: IncomingMessage) {
      const guardInstances = guards.map(guard => 
        typeof guard === 'function' ? new guard() : guard
      );
      if (guardInstances.every(guard => guard.canActivate(client, request))) {
        await originalMethod.call(this, client, request);
      }
      else {
        client.send("Unauthorized");
        client.close();
      }
    };
  }
} 