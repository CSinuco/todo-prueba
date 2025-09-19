import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { UserOrmEntity } from './user/infrastructure/persistence/user.orm-entity';
import { TaskOrmEntity } from './task/infrastructure/persistence/task.orm-entity';

@Module({
  imports: [
    // Configuración global de .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuración de TypeORM con variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [UserOrmEntity, TaskOrmEntity],
        synchronize: true,
      }),
    }),

    UserModule,
    TaskModule,
  ],
})
export class AppModule {}
