import { Global, Module } from "@nestjs/common";
import { WebsocketGateway } from "./websocket.gateway";
import { WebsocketManager } from "./websocket.manager";

@Global()
@Module({
  providers: [
    WebsocketGateway,
    WebsocketManager
  ],
  exports: [
    WebsocketManager
  ]
})
export class WebsocketModule {}