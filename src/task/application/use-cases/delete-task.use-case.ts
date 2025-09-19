import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { TASK_REPOSITORY, type ITaskRepository } from '../../domain/repositories/task.repository';
import { Task } from '../../domain/entities/task.entity';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepo: ITaskRepository,
  ) {}

  async execute(taskId: number): Promise<Task> {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new NotFoundException('Task not found');

    task.isDeleted = true; 
    return this.taskRepo.update(task);
  }
}