import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { IUserRepository, USER_REPOSITORY } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
  ) {}

  async execute(name: string, email: string): Promise<User> {
    const existing = await this.userRepo.findByEmail(email); 
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const user = new User(0, name, email);
    return this.userRepo.create(user);
  }
}
