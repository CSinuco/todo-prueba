import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './infrastructure/controller/user.controller';
import { UserRepositoryImpl } from './infrastructure/persistence/user.repository.imp';
import { UserOrmEntity } from './infrastructure/persistence/user.orm-entity';
import { USER_REPOSITORY } from './domain/repositories/user.repository';

// Casos de uso
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { ListUsersUseCase } from './application/use-cases/list-users.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UserController],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
    CreateUserUseCase,
    ListUsersUseCase,   // 👈 aquí debe estar
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}

