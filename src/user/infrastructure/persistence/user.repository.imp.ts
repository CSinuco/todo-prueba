import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserOrmEntity } from './user.orm-entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const ormEntity = UserMapper.toOrmEntity(user);
    const saved = await this.repo.save(ormEntity);
    return UserMapper.toDomain(saved);
  }

  async update(user: User): Promise<User> {
    await this.repo.update(user.id, UserMapper.toOrmEntity(user));
    const updated = await this.repo.findOneBy({ id: user.id });
    if (!updated) {
      throw new Error(`User with id ${user.id} not found`);
    }
    return UserMapper.toDomain(updated);
  }

  async findById(id: number): Promise<User | null> {
    const entity = await this.repo.findOneBy({ id });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<User[]> {
    const entities = await this.repo.find();
    return entities.map(UserMapper.toDomain);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repo.findOneBy({ email });
    return entity ? UserMapper.toDomain(entity) : null;
  }
}
