import { Controller, Inject, Logger, OnModuleInit, Type } from "@nestjs/common";
import { WebsocketManager } from "../websocket.manager";

export function WebsocketController() {
  const logger = new Logger("EventController");

  return function <T extends Type<any>>(constructor: T) {
    @Controller()
    class WrappedController extends constructor implements OnModuleInit {

      @Inject()
      readonly websocketManager: WebsocketManager;

      async onModuleInit() {
        const methodNames = Object.getOwnPropertyNames(constructor.prototype)
          .filter((methodName) => methodName !== 'constructor');

        for (const methodName of methodNames) {
          const descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, methodName);
          if (descriptor && typeof descriptor.value === 'function') {
            const originalMethod = descriptor.value;
            const event = Reflect.getMetadata(methodName, descriptor.value);
            descriptor.value = async (...args: any[]) => {
              try {
                return await originalMethod.apply(this, args);
              } catch (err) {
                logger.error(err.message);
              }
            };
            Object.defineProperty(this, methodName, descriptor);
            this.websocketManager['addHandler'](event, descriptor.value);
          }
        }
      }
    }
    return WrappedController;
  };
}

export function Event(title: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(propertyKey, title, descriptor.value);
  }
} 