import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './notice.entity';
import { NoticeResolver } from './notice.resolver';
import { NoticeService } from './notice.service';
import { DepartmentModule } from '../department/department.module';
import { NotificationModule } from '../notification/notification.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notice]),
    DepartmentModule,
    NotificationModule,
    UserModule,
  ],
  providers: [NoticeResolver, NoticeService],
})
export class NoticeModule {}
