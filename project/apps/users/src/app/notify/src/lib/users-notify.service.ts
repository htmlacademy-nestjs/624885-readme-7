import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { rabbitConfig } from '@users/config'
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@project/core';


@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.AddSubscriber,
      {...dto}
    );
  }
}
