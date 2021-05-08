import { HttpException, Module } from '@nestjs/common';
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
import { NodesModule } from './nodes/nodes.module';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
    NodesModule,
    RavenModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor({
        filters: [
          {
            type: HttpException,
            filter: (exception: HttpException) => 500 > exception.getStatus(),
          },
        ],
      }),
    },
  ],
})
export class AppModule {}
