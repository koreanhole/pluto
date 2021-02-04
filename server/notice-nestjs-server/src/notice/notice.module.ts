import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeResolver } from './notice.resolver';
import { Notice } from './notice.entity';
import { NoticeService } from './notice.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  providers: [NoticeResolver, NoticeService],
})
export class NoticeModule {}
