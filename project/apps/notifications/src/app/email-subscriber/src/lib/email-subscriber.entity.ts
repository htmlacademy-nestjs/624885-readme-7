import { Entity, StorableEntity, Subscriber } from '@project/core';

export class EmailSubscriberEntity extends Entity implements StorableEntity<Subscriber> {
  public email: string;
  public name: string;

  constructor(subscriber?: Subscriber) {
    super();

    if(subscriber) {
      this.id = subscriber.id ?? '';
      this.email = subscriber.email;
      this.name = subscriber.name;
    }
  }

  public toPOJO(): Subscriber {
    return {
      id: this.id,
      email: this.email,
      name: this.name
    }
  }
}
