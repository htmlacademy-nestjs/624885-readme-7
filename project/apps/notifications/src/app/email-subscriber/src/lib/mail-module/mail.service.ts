import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@project/core';

import { NotificationsConfig } from '@project/notifications-config';

const EMAIL_ADD_SUBSCRIBER_SUBJECT = 'Подписка на рассылку оформлена';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) {}

  @Inject(NotificationsConfig.KEY)
  private readonly notificationsConfig: ConfigType<typeof NotificationsConfig>;

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notificationsConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`
      }
    })
  }
}
