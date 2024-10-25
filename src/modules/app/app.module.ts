import { Module } from '@nestjs/common';
import { ExampleModule } from '../example/example.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { SubscribeExampleModule } from '../subscribe_example/subscribe_example.module';

@Module({
  imports: [
    WebsocketModule,
    SubscribeExampleModule
  ],
})
export class AppModule {}
