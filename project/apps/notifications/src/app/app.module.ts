import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmailSubscriberModule } from '@project/email-subscriber';
import { getMongooseOptions, NotificationsConfigModule } from '@project/notifications-config';


@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotificationsConfigModule,
    EmailSubscriberModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
