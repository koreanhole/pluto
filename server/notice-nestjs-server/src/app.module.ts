import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './notice/notice.entity';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/notice',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Notice],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    NoticeModule,
  ],
})
export class AppModule {}
