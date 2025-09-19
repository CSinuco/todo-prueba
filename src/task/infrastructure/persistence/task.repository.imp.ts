import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITaskRepository } from '../../domain/repositories/task.repository';
import { Task } from '../../domain/entities/task.entity';
import { TaskOrmEntity } from './task.orm-entity';
import { TaskMapper } from '../mappers/task.mapper';
import { TaskStatus } from '../../domain/entities/task.entity';

@Injectable()
export class TaskRepositoryImpl implements ITaskRepository {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private readonly repo: Repository<TaskOrmEntity>,
  ) {}

  async create(task: Task): Promise<Task> {
    const ormEntity = TaskMapper.toOrmEntity(task);
    const saved = await this.repo.save(ormEntity);
    return TaskMapper.toDomain(saved);
  }

async update(task: Task): Promise<Task> {
  await this.repo.update(task.id, TaskMapper.toOrmEntity(task));
  const updated = await this.repo.findOneBy({ id: task.id });
  if (!updated) {
    throw new Error(`Task with id ${task.id} not found`);
  }
  return TaskMapper.toDomain(updated);
}

  async findById(id: number): Promise<Task | null> {
    const entity = await this.repo.findOneBy({ id });
    return entity ? TaskMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<Task[]> {
    const entities = await this.repo.find();
    return entities.map(TaskMapper.toDomain);
  }

  async findByStatus(status: TaskStatus): Promise<Task[]> {
    const entities = await this.repo.find({ where: { status } });
    return entities.map(TaskMapper.toDomain);
  }

  async softDelete(id: number): Promise<Task> {
    await this.repo.update(id, { isDeleted: true });
    const updated = await this.repo.findOneBy({ id });
    if (!updated) {
      throw new Error(`Task with id ${id} not found`);
    }   
    return TaskMapper.toDomain(updated);
  }
}
