import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeModule } from './notice/notice.module';
import { Notice } from './notice/notice.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/notice',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Notice],
    }),
    NoticeModule,
  ],
})
export class AppModule {}
