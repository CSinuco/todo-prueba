import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../../src/task/infrastructure/controller/task.controller';
import { CreateTaskUseCase } from '../../src/task/application/use-cases/create-task.use-case';
import { ListTasksUseCase } from '../../src/task/application/use-cases/list-tasks.use-case';
import { FindTaskByIdUseCase } from '../../src/task/application/use-cases/find-task-by-id.use-case';
import { UpdateTaskStatusUseCase } from '../../src/task/application/use-cases/update-task-by-status.use-case';
import { DeleteTaskUseCase } from '../../src/task/application/use-cases/delete-task.use-case';

describe('TaskController', () => {
  let controller: TaskController;
  let mockCreateTaskUC: any;
  let mockListTasksUC: any;
  let mockFindTaskByIdUC: any;
  let mockUpdateTaskUC: any;
  let mockDeleteTaskUC: any;

  beforeEach(async () => {
    mockCreateTaskUC = { execute: jest.fn() };
    mockListTasksUC = { execute: jest.fn() };
    mockFindTaskByIdUC = { execute: jest.fn() }; // 👈 faltaba este
    mockUpdateTaskUC = { execute: jest.fn() };
    mockDeleteTaskUC = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        { provide: CreateTaskUseCase, useValue: mockCreateTaskUC },
        { provide: ListTasksUseCase, useValue: mockListTasksUC },
        { provide: FindTaskByIdUseCase, useValue: mockFindTaskByIdUC }, // 👈 agregado
        { provide: UpdateTaskStatusUseCase, useValue: mockUpdateTaskUC },
        { provide: DeleteTaskUseCase, useValue: mockDeleteTaskUC },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should call CreateTaskUseCase on create', async () => {
    await controller.create({ userId: 1, title: 'test' });
    expect(mockCreateTaskUC.execute).toHaveBeenCalled();
  });

  it('should call ListTasksUseCase on findAll', async () => {
    await controller.findAll();
    expect(mockListTasksUC.execute).toHaveBeenCalled();
  });
});
