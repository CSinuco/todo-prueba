import { User } from '../../domain/entities/user.entity';
import { UserOrmEntity } from '../persistence/user.orm-entity';

export class UserMapper {
  static toDomain(entity: UserOrmEntity): User {
    return new User(entity.id, entity.name, entity.email);
  }

  static toOrmEntity(user: User): UserOrmEntity {
    const orm = new UserOrmEntity();
    orm.id = user.id;
    orm.name = user.name;
    orm.email = user.email;
    return orm;
  }
}
