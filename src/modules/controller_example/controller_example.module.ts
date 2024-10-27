import { Module } from '@nestjs/common';
import { ExampleService } from './controller_example.service';
import { ExampleController } from './controller_example.controller';

@Module({
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class SubscribeExampleModule {}
