import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TaskStatus } from '../../domain/entities/task.entity';
import { UserOrmEntity } from '../../../user/infrastructure/persistence/user.orm-entity';

@Entity('tasks')
export class TaskOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  userId: number;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'userId' })
  user: UserOrmEntity;
}
