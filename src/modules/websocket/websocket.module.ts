import { Module } from "@nestjs/common";
import { WebsocketGateway } from "./websocket.gateway";
import { WebsocketManager } from "./websocket.manager";

@Module({
  providers: [
    WebsocketGateway,
    WebsocketManager
  ]
})
export class WebsocketModule {}