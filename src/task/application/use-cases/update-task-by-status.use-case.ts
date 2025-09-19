import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { TASK_REPOSITORY, type ITaskRepository } from '../../domain/repositories/task.repository';
import { Task, TaskStatus } from '../../domain/entities/task.entity';

@Injectable()
export class UpdateTaskStatusUseCase {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepo: ITaskRepository,
  ) {}

  async execute(taskId: number, status: TaskStatus): Promise<Task> {
    const task = await this.taskRepo.findById(taskId);
    if (!task || task.isDeleted) {
      throw new NotFoundException('Task not found');
    }

    task.status = status;
    return this.taskRepo.update(task);
  }
}
