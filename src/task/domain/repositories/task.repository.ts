import {Task} from "../entities/task.entity";

export interface ITaskRepository{
    create(task: Task): Promise<Task>;
    update(task: Task): Promise<Task>;
    findById(id: number): Promise<Task | null>;
    findAll(): Promise<Task[]>;
    findByStatus(status: string): Promise<Task[]>;
    softDelete(id: number): Promise<Task>;
}
export const TASK_REPOSITORY = 'ITASK_REPOSITORY';
