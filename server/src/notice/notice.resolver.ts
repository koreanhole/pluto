import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { NoticeType } from './notice.type';
import { NoticeService } from './notice.service';
import { CreateNoticeInput } from './notice.input';
import { Notice } from './notice.entity';
import { DepartmentService } from 'src/department/department.service';

@Resolver(() => NoticeType)
export class NoticeResolver {
  constructor(
    private noticeService: NoticeService,
    private departmentService: DepartmentService,
  ) {}

  @Query(() => NoticeType)
  async getNotice(@Args('id') id: string) {
    return await this.noticeService.getNotice(id);
  }

  @Query(() => [NoticeType])
  async getPaginatedNotice(@Args('offset') offset: number) {
    return await this.noticeService.getPaginatedNotices(offset);
  }

  @Query(() => [NoticeType])
  async getNoticeByDeptCode(
    @Args('deptCode') deptCode: string,
    @Args('offset') offset: number,
  ) {
    return await this.noticeService.getNoticeByDeptCode(deptCode, offset);
  }

  @Mutation(() => NoticeType)
  async createNotice(
    @Args('createNoticeInput') createNoticeInput: CreateNoticeInput,
  ) {
    return await this.noticeService.createNotice(createNoticeInput);
  }

  @ResolveField('department')
  async department(@Parent() notice: Notice) {
    return await this.departmentService.getDepartmentById(notice.department);
  }
}
