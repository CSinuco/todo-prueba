import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
}

export const USER_REPOSITORY = 'IUSER_REPOSITORY';