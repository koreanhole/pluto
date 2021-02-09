import { Injectable } from '@nestjs/common';
import { DepartmentService } from '../department/department.service';
import { NoticeService } from '../notice/notice.service';

@Injectable()
export class ScrapperService {
  constructor(
    private departmentService: DepartmentService,
    private noticeService: NoticeService,
  ) {}
}
