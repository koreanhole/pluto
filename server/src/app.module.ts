import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeModule } from './notice/notice.module';
import { GraphQLModule } from '@nestjs/graphql';
import { typeOrmConfig } from './config/typeorm.config';
import { DepartmentModule } from './department/department.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { graphqlConfig } from './config/graphql.config';
import { ScrapperModule } from './scrapper/scrapper.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot(graphqlConfig),
    ScheduleModule.forRoot(),
    NoticeModule,
    DepartmentModule,
    UserModule,
    NotificationModule,
    ScrapperModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
