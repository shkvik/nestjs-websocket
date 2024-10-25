import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscribeExampleService {
  public getHello(): string {
    return 'Hello World!';
  }
}
