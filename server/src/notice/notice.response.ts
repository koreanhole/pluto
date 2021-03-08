import { ObjectType } from '@nestjs/graphql';
import relayTypes from '../relay.types';
import { NoticeType } from './notice.type';

@ObjectType()
export default class NoticeResponse extends relayTypes<NoticeType>(
  NoticeType,
) {}
