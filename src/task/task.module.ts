import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskOrmEntity } from './infrastructure/persistence/task.orm-entity';
import { TaskRepositoryImpl } from './infrastructure/persistence/task.repository.imp';
import { TASK_REPOSITORY } from './domain/repositories/task.repository';
import { CreateTaskUseCase } from './application/use-cases/create-task.use-case';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.use-case';
import { FindTaskByIdUseCase } from './application/use-cases/find-task-by-id.use-case';
import { ListTasksUseCase } from './application/use-cases/list-tasks.use-case';
import { UpdateTaskStatusUseCase } from './application/use-cases/update-task-by-status.use-case';
import { TaskController } from './infrastructure/controller/task.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskOrmEntity]),
    UserModule
],
  providers: [
    {
      provide: TASK_REPOSITORY,
      useClass: TaskRepositoryImpl,
    },
    CreateTaskUseCase,
    DeleteTaskUseCase,
    FindTaskByIdUseCase,
    ListTasksUseCase,
    UpdateTaskStatusUseCase,
  ],
  controllers: [TaskController],
  exports: [],
})
export class TaskModule {}
