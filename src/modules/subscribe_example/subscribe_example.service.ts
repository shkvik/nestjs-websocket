import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscribeExampleService {
  public getHello(): void {
    console.log('Hello World!');
  }
}