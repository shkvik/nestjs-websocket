import { Module } from '@nestjs/common';
import { SubscribeExampleService } from './subscribe_example.service';
import { SubscribeExampleController } from './subscribe_example.controller';

@Module({
  controllers: [SubscribeExampleController],
  providers: [SubscribeExampleService],
})
export class SubscribeExampleModule {}
