import { randomUUID } from 'crypto';

import { Entity, EntityFactory, StorableEntity } from '@project/core';
import { Repository } from './repository.interface';

export abstract class BaseMemoryRepository<T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>> implements Repository<T> {
  protected entities: Map<T['id'], ReturnType<T['toPOJO']>> = new Map;

  constructor(
    protected entityFactory: EntityFactory<T>
  ) {}

  public async findById(id: T['id']): Promise<T | null> {
    const fountEntity = this.entities.get(id);
    if(!fountEntity) {
      return null;
    }

    return this.entityFactory.create(fountEntity);
  }

  public async save(entity: T): Promise<void> {
    if(! entity.id) {
      entity.id = randomUUID();
    }

    this.entities.set(entity.id, entity.toPOJO());
  }

  public async deleteById(id: T['id']): Promise<void> {
    if(! this.entities.has(id)) {
      throw new Error('Entity not found');
    }

    this.entities.delete(id);
  }

  public async update(entity: T): Promise<void> {
    if(! this.entities.has(entity.id)) {
      throw new Error('Entity not found');
    }

    this.entities.set(entity.id, entity.toPOJO());
  }
}
