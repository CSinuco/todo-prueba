export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}
export class Task{
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public status: TaskStatus,
        public createdAt: Date,
        public userid: number,
        public isDeleted: boolean,
    ){}
}