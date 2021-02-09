import { Module } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { DepartmentModule } from '../department/department.module';
import { NoticeModule } from '../notice/notice.module';

@Module({
  imports: [DepartmentModule, NoticeModule],
  providers: [ScrapperService],
})
export class ScrapperModule {}
