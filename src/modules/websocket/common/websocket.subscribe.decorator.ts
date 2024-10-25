import { Controller, Inject, Logger, OnModuleInit, Type } from "@nestjs/common";
import { WebsocketManager } from "../websocket.manager";

export function SubscribeController() {
  const logger = new Logger("EventController");

  const wrapMethod = (
    wsManager: WebsocketManager,
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    const event = Reflect.getMetadata(propertyKey, descriptor.value) as string;
    const context = target;

    descriptor.value = async function (...args: any[]) {
      try {
        await originalMethod.apply(context, args);
      } catch (err) {
        logger.error(err.message);
      }
    };

    wsManager.addHandler(event, descriptor.value)
    return descriptor;
  };

  return function <T extends Type<any>>(constructor: T) {
    @Controller()
    class WrappedController extends constructor implements OnModuleInit {

      @Inject()
      readonly websocketManager: WebsocketManager;

      async onModuleInit() {
        console.log("Catch?");

        const methodNames = Object.getOwnPropertyNames(constructor.prototype)
          .filter((methodName) => methodName !== 'constructor');

        for (const methodName of methodNames) {
          const descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, methodName);
          if (descriptor && typeof descriptor.value === 'function') {
            wrapMethod(this.websocketManager, this, methodName, descriptor);
            Object.defineProperty(this, methodName, descriptor);
          }
        }
      }
    }
    return WrappedController;
  };
}

export function Subscribe(title: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(propertyKey, title, descriptor.value);
  }
} 