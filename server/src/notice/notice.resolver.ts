import { Resolver } from '@nestjs/graphql';
import { NoticeType } from './notice.type';

@Resolver(() => NoticeType)
export class NoticeResolver {}
