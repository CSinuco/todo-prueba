import { Injectable, Inject } from "@nestjs/common";
import { Task, TaskStatus } from "src/task/domain/entities/task.entity";
import { ITaskRepository, TASK_REPOSITORY } from "src/task/domain/repositories/task.repository";
import { USER_REPOSITORY, IUserRepository } from "src/user/domain/repositories/user.repository";

@Injectable()
export class CreateTaskUseCase {
    constructor(
        @Inject(TASK_REPOSITORY) private readonly taskRepo: ITaskRepository,
        @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,

    ) {}
    async execute( 
        userId: number,
        title: string,
        description?: string,
        dueDate?: Date,

    ): Promise<Task> {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const task = new Task(
            0,
            title,
            description || '',
            TaskStatus.PENDING,
            dueDate || new Date(),
            userId,
            false,
    
        );
        return this.taskRepo.create(task);

    }
}