import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Notice } from 'src/notice/notice.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost/notice',
  synchronize: true,
  useUnifiedTopology: true,
  entities: [Notice],
};
