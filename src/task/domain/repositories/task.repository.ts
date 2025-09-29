import {Task} from "../entities/task.entity";

export interface ITaskRepository{
    create(task: Task): Promise<Task>;
    update(task: Task): Promise<Task>;
    findById(userId: number): Promise<Task | null>;
    findAll(): Promise<Task[]>;
    findByStatus(status: string): Promise<Task[]>;
    softDelete(id: number): Promise<Task>;
    findByUserId(userId: number): Promise<Task | null>;
}
export const TASK_REPOSITORY = 'ITASK_REPOSITORY';
