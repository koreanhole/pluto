import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { DepartmentModule } from '../department/department.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DepartmentModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
