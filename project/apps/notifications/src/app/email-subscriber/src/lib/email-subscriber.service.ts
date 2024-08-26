import { Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if(existsSubscriber) {
      return existsSubscriber;
    }

    const emailSubscriber = new EmailSubscriberEntity(subscriber);
    const createdEmailSubscriber = await this.emailSubscriberRepository.save(emailSubscriber);

    return createdEmailSubscriber;
  }
}
