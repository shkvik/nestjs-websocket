import { Event, WebsocketController } from '../websocket/common';
import { SubscribeExampleService } from './subscribe_example.service';

@WebsocketController()
export class SubscribeExampleController {
  
  constructor(private exampleService: SubscribeExampleService) {}
    
  @Event('example')
  public getHello(): string {
    return this.exampleService.getHello();
  }
}
