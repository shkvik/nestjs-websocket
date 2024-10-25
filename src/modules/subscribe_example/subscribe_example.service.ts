import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscribeExampleService {
  public getHello(): string {
    console.log('Hello World!');
    return 'Hello World!';
  }
}
