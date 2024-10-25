import { IncomingMessage } from "http";
import { WebSocketClient, WebsocketGuard } from "../interface";

export function ConnectionGuard(...guards: (WebsocketGuard | { new(): WebsocketGuard })[]) {

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
       
    descriptor.value = async function (client: WebSocketClient, request: IncomingMessage) {
      const guardInstances = guards.map(guard =>
        typeof guard === 'function' ? new guard() : guard
      );
      const validation = guardInstances
        .every(async guard => await guard.canActivate(client, request));

      if (validation) {
        await originalMethod.call(this, client, request);
      } else {
        client.close();
      }
    };
    return descriptor;
  }
} 