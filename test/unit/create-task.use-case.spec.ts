import { CreateTaskUseCase } from '../../src/task/application/use-cases/create-task.use-case';
import { TaskStatus, Task } from '../../src/task/domain/entities/task.entity';

describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
  let mockTaskRepo: any;
  let mockUserRepo: any;

  beforeEach(() => {
    mockTaskRepo = {
      create: jest.fn().mockImplementation((task: Task) => Promise.resolve({ ...task, id: 1 })),
    };
    mockUserRepo = {
      findById: jest.fn().mockResolvedValue({ id: 1, name: 'Test User', email: 'test@test.com' }),
    };

    useCase = new CreateTaskUseCase(mockTaskRepo, mockUserRepo);
  });

  it('should create a new task for an existing user', async () => {
    const task = await useCase.execute(1, 'Test Task', 'Description');
    expect(task.id).toBe(1);
    expect(task.title).toBe('Test Task');
    expect(task.status).toBe(TaskStatus.PENDING);
    expect(mockTaskRepo.create).toHaveBeenCalled();
  });

  it('should throw an error if user does not exist', async () => {
    mockUserRepo.findById.mockResolvedValueOnce(null);
    await expect(useCase.execute(99, 'Fail Task')).rejects.toThrow('User not found');
  });
});
