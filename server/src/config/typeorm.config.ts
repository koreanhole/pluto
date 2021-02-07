import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Department } from '../department/department.entity';
import { Notice } from '../notice/notice.entity';
import { User } from '../user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost/notice',
  synchronize: true,
  useUnifiedTopology: true,
  entities: [Notice, Department, User],
};
