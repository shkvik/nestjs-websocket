import { Event, WebsocketController } from '../websocket/common';
import { ExampleService } from './subscribe_example.service';

@WebsocketController()
export class ExampleController {
  
  constructor(private exampleService: ExampleService) {}
    
  @Event('example')
  public getHello(): string {
    return this.exampleService.getHello();
  }
}
