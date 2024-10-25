import { WebSocketGateway } from "@nestjs/websockets";
import { WebSocketClient } from "../interface";
import { IncomingMessage } from "node:http";
import { Logger } from "@nestjs/common";
import { applyDecorators, CustomDecorator } from '@nestjs/common';


export function WebSocketGatewayV2(port: number) {
  const logger = new Logger("WebSocket");

  return function (constructor: Function) {
    WebSocketGateway(port, { transports: ['websocket'] })(constructor);

    const methodNames = Object.getOwnPropertyNames(constructor.prototype).filter(
      (methodName) => methodName !== 'constructor'
    );
    for (const methodName of methodNames) {
      const descriptor = Object.getOwnPropertyDescriptor(
        constructor.prototype,
        methodName
      );
      if (descriptor && typeof descriptor.value === 'function') {
        Object.defineProperty(
          constructor.prototype,
          methodName,
          wrapMethod(constructor, methodName, descriptor, logger)
        );
      }
    }
    
  };
}

function wrapMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
  logger: Logger
) {
  const originalMethod = descriptor.value;
  
  descriptor.value = async function (client: WebSocketClient, request: IncomingMessage) {
    try {
      await originalMethod.apply(this, [client, request]);
    } catch (err) {
      logger.error(err.message);
    }
  };

  return descriptor;
}