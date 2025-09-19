import { Injectable, Inject } from "@nestjs/common";
import { Task } from "src/task/domain/entities/task.entity";
import { ITaskRepository, TASK_REPOSITORY } from "src/task/domain/repositories/task.repository";

@Injectable()
export class ListTasksUseCase {
    constructor(
        @Inject(TASK_REPOSITORY) private readonly taskRepo: ITaskRepository,
    ) {}
    async execute(): Promise<Task[]> {
        return this.taskRepo.findAll();
    }
}