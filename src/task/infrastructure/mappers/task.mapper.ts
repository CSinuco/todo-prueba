import { Task, TaskStatus } from '../../domain/entities/task.entity';
import { TaskOrmEntity } from '../persistence/task.orm-entity';

export class TaskMapper {
  static toDomain(entity: TaskOrmEntity): Task {
    return new Task(
      entity.id,
      entity.title,
      entity.description,
      entity.status as TaskStatus,
      entity.createdAt,
      entity.userId,       
      entity.isDeleted,
    );
  }

  static toOrmEntity(task: Task): TaskOrmEntity {
    const orm = new TaskOrmEntity();
    orm.id = task.id;
    orm.title = task.title;
    orm.description = task.description;
    orm.status = task.status;
    orm.createdAt = task.createdAt;
    orm.userId = task.userid;   
    orm.isDeleted = task.isDeleted;
    return orm;
  }
}
