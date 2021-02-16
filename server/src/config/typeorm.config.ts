import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Department } from '../department/department.entity';
import { Notice } from '../notice/notice.entity';
import { User } from '../user/user.entity';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  url: dbConfig.url,
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  useUnifiedTopology: true,
  entities: [Notice, Department, User],
};
