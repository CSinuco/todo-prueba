import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { ListTasksUseCase } from '../../application/use-cases/list-tasks.use-case';
import { FindTaskByIdUseCase } from '../../application/use-cases/find-task-by-id.use-case';
import { UpdateTaskStatusUseCase } from '../../application/use-cases/update-task-by-status.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUC: CreateTaskUseCase,
    private readonly listTasksUC: ListTasksUseCase,
    private readonly findTaskByUserIdUC: FindTaskByIdUseCase,
    private readonly updateTaskStatusUC: UpdateTaskStatusUseCase,
    private readonly deleteTaskUC: DeleteTaskUseCase,
  ) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        title: { type: 'string', example: 'Primera tarea' },
        description: { type: 'string', example: 'Descripción de la tarea' },
        dueDate: { type: 'string', format: 'date-time', example: '2025-09-20T12:00:00Z' },
      },
      required: ['userId', 'title'],
    },
  })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  create(@Body() body: any) {
    return this.createTaskUC.execute(body.userId, body.title, body.description, body.dueDate);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List all tasks' })
  findAll() {
    return this.listTasksUC.execute();
  }

  @Get('user/:userId')
  @ApiResponse({ status: 200, description: 'Find tasks by userId' })
  findByUserId(@Param('userId') userId: number) {
    return this.findTaskByUserIdUC.execute(Number(userId));
  }

  @Patch(':id/status')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'], example: 'COMPLETED' },
      },
      required: ['status'],
    },
  })
  @ApiResponse({ status: 200, description: 'Update task status' })
  updateStatus(@Param('id') id: number, @Body() body: any) {
    return this.updateTaskStatusUC.execute(Number(id), body.status);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Soft delete task' })
  softDelete(@Param('id') id: number) {
    return this.deleteTaskUC.execute(Number(id));
  }
}
