import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import { DepartmentModule } from '../src/department/department.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmTestConfig } from '../src/config/typeorm.test.config';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlConfig } from '../src/config/graphql.config';
import { Department } from '../src/department/department.entity';
import { DepartmentType } from '../src/department/department.type';

const TEST_DEPARTMENT: Department = {
  _id: null,
  id: null,
  deptName: 'test_dept',
  deptCode: '1234',
};

describe('DepartmentModule (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let connection: Connection;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        DepartmentModule,
        TypeOrmModule.forRoot(typeOrmTestConfig),
        GraphQLModule.forRoot(graphqlConfig),
      ],
    }).compile();

    connection = module.get(Connection);
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await getConnection().synchronize(true);
    await module.close();
    await connection.close();
  });

  it('creates department', () => {
    const createDepartmentQuery = `
      mutation {
        createDepartment(createDepartmentInput: {
          deptCode: ${JSON.stringify(TEST_DEPARTMENT.deptCode)}
          deptName: ${JSON.stringify(TEST_DEPARTMENT.deptName)}
        }) {
          deptCode
          deptName
          id
        }
      }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: createDepartmentQuery })
      .expect(200)
      .expect((response) => {
        const data: DepartmentType = response.body.data.createDepartment;
        TEST_DEPARTMENT.id = data.id;

        expect(data.deptName).toBe(TEST_DEPARTMENT.deptName);
        expect(data.deptCode).toBe(TEST_DEPARTMENT.deptCode);
        expect(data.id).not.toBeNull();
      });
  });

  it('gets all departments', () => {
    const getAllDepartmentQuery = `
      query {
        getAllDepartment {
          deptCode
          deptName
          id
        }
      }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: getAllDepartmentQuery })
      .expect(200)
      .expect((response) => {
        expect(response.body.data.getAllDepartment).toEqual([
          {
            deptCode: TEST_DEPARTMENT.deptCode,
            deptName: TEST_DEPARTMENT.deptName,
            id: TEST_DEPARTMENT.id,
          },
        ]);
      });
  });
});
