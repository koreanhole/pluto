import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeModule } from './notice/notice.module';
import { GraphQLModule } from '@nestjs/graphql';
import { typeOrmConfig } from './config/typeorm.config';
import { DepartmentModule } from './department/department.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
    }),
    NoticeModule,
    DepartmentModule,
    UserModule,
    NotificationModule,
  ],
})
export class AppModule {}
