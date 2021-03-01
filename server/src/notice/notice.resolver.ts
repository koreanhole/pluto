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
import { DepartmentService } from '.././department/department.service';
import { UserService } from '../user/user.service';
import { NotificationService } from '../notification/notification.service';
import { DeptType } from '../department/department.enum';
import NoticeResponse from './notice.response';
import ConnectionArgs from '../connection.args';
import { connectionFromArraySlice } from 'graphql-relay';

@Resolver(() => NoticeType)
export class NoticeResolver {
  constructor(
    private noticeService: NoticeService,
    private departmentService: DepartmentService,
    private userService: UserService,
    private notificationService: NotificationService,
  ) {}

  @Query(() => NoticeType)
  async NoticeByNoticeId(@Args('id') id: string) {
    return await this.noticeService.getNotice(id);
  }

  @Query(() => NoticeResponse)
  async PaginatedNotice(@Args() args: ConnectionArgs): Promise<NoticeResponse> {
    const { limit, offset } = args.pagingParams();
    const [notices, count] = await this.noticeService.getPaginatedNotices(
      limit,
      offset,
    );
    const page = connectionFromArraySlice(notices, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
    return { page, PageData: { count, limit, offset } };
  }

  @Query(() => [NoticeType])
  async NoticeByDepartmentId(
    @Args('departmentId') departmentId: string,
    @Args('offset') offset: number,
  ) {
    return await this.noticeService.getNoticeByDepartmentId(
      departmentId,
      offset,
    );
  }

  @Query(() => [NoticeType])
  async NoticeByDepartmentName(
    @Args('deptName') deptName: DeptType,
    @Args('offset') offset: number,
  ) {
    const department = await this.departmentService.getDepartmentByName(
      deptName,
    );
    return await this.noticeService.getNoticeByDepartmentId(
      department.id,
      offset,
    );
  }

  @Mutation(() => NoticeType)
  async createNotice(
    @Args('createNoticeInput') createNoticeInput: CreateNoticeInput,
  ) {
    const notice = await this.noticeService.createNotice(createNoticeInput);

    // createdNotice를 저장한 User의 expoPushTokens를 가져온다.
    const expoPushTokens = await this.userService.getUserExpoPushTokensByDepartmentId(
      notice.department,
    );

    const department = await this.departmentService.getDepartmentById(
      notice.department,
    );

    // 거져온 expoPushTokens를 사용해 notificationService를 통해 푸시알림을 보낸다.
    await this.notificationService.sendPushNotification({
      pushTokenList: expoPushTokens,
      title: department.deptType,
      body: notice.title,
      extraData: { deptCode: department.deptCode, listId: notice.listId },
    });

    return notice;
  }

  @ResolveField('department')
  async department(@Parent() notice: Notice) {
    return await this.departmentService.getDepartmentById(notice.department);
  }
}
