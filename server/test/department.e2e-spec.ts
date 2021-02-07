import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import { DepartmentModule } from '../src/department/department.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmTestConfig } from '../src/config/typeorm.test.config';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlConfig } from '../src/config/graphql.config';

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

  it('createDepartment by deptCode: 1234, deptName: test_dept', () => {
    const createDepartmentQuery = `
      mutation {
        createDepartment(createDepartmentInput: {
          deptCode: "1234"
          deptName: "test_dept"
        }) {
          deptCode
          deptName
        }
      }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: createDepartmentQuery })
      .expect(200)
      .expect((response) => {
        expect(response.body.data.createDepartment).toEqual({
          deptCode: '1234',
          deptName: 'test_dept',
        });
      });
  });

  it('gets all departments', () => {
    const getAllDepartmentQuery = `
      query {
        getAllDepartment {
          deptCode
          deptName
        }
      }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: getAllDepartmentQuery })
      .expect(200)
      .expect((response) => {
        expect(response.body.data.getAllDepartment).toEqual([
          { deptCode: '1234', deptName: 'test_dept' },
        ]);
      });
  });
});
