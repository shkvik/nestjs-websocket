import { Get } from '@nestjs/common';
import { Subscribe, SubscribeController } from '../websocket/common';
import { SubscribeExampleService } from './subscribe_example.service';
import { ModuleRef } from '@nestjs/core';

@SubscribeController()
export class SubscribeExampleController {
  
  constructor(
    private readonly subscribeExampleService: SubscribeExampleService
  ) {}

  @Subscribe('example')
  public getHello(): void {
    this.subscribeExampleService.getHello();
  }
}
