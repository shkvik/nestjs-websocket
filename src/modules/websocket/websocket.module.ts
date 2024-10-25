import { Module } from "@nestjs/common";
import { WebsocketGateway } from "./websocket.gateway";
import { WebsocketManager } from "./websocket.manager";
import { WebsocketService } from "./websocket.service";

@Module({
  providers: [
    WebsocketGateway,
    WebsocketManager,
    WebsocketService
  ]
})
export class WebsocketModule {}