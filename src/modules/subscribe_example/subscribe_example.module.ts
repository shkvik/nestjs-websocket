import { Module } from '@nestjs/common';
import { ExampleService } from './subscribe_example.service';
import { ExampleController } from './subscribe_example.controller';

@Module({
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class SubscribeExampleModule {}
