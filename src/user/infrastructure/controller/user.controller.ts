import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { ListUsersUseCase } from '../../application/use-cases/list-users.use-case';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUC: CreateUserUseCase,
    private readonly listUsersUC: ListUsersUseCase,
  ) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john@example.com' },
      },
      required: ['name', 'email'],
    },
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() body: any) {
    return this.createUserUC.execute(body.name, body.email);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List all users' })
  findAll() {
    return this.listUsersUC.execute();
  }
}
