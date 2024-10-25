import { Module } from '@nestjs/common';
import { ExampleModule } from '../example/example.module';
import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  imports: [WebsocketModule],
})
export class AppModule {}
