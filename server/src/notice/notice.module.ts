import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './notice.entity';
import { NoticeResolver } from './notice.resolver';
import { NoticeService } from './notice.service';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notice]), DepartmentModule],
  providers: [NoticeResolver, NoticeService],
})
export class NoticeModule {}
