import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Department } from 'src/department/department.entity';
import { Notice } from 'src/notice/notice.entity';
import { User } from 'src/user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost/notice',
  synchronize: true,
  useUnifiedTopology: true,
  entities: [Notice, Department, User],
};
