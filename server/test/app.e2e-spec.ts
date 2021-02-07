import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import { DepartmentModule } from '../src/department/department.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmTestConfig } from '../src/config/typeorm.test.config';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlConfig } from '../src/config/graphql.config';
import { DepartmentType } from '../src/department/department.type';
import { UserModule } from '../src/user/user.module';
import { UserType } from '../src/user/user.type';

const TEST_DEPARTMENT: DepartmentType = {
  id: null,
  deptName: 'test_dept',
  deptCode: '1234',
};

const SECOND_TEST_DEPARTMENT: DepartmentType = {
  id: null,
  deptName: 'test_dept2',
  deptCode: '4567',
};

const TEST_USER: UserType = {
  id: null,
  deviceId: 'test_deviceId',
  expoPushToken: 'test_expoPushToken',
  //departmentId arrays
  departments: null,
};

describe('AppModule (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let connection: Connection;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmTestConfig),
        GraphQLModule.forRoot(graphqlConfig),
        DepartmentModule,
        UserModule,
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

  describe('DepartmentModule(e2e)', () => {
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

    it('creates second department', () => {
      const createDepartmentQuery = `
        mutation {
          createDepartment(createDepartmentInput: {
            deptCode: ${JSON.stringify(SECOND_TEST_DEPARTMENT.deptCode)}
            deptName: ${JSON.stringify(SECOND_TEST_DEPARTMENT.deptName)}
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
          SECOND_TEST_DEPARTMENT.id = data.id;

          expect(data.deptName).toBe(SECOND_TEST_DEPARTMENT.deptName);
          expect(data.deptCode).toBe(SECOND_TEST_DEPARTMENT.deptCode);
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
            {
              deptCode: SECOND_TEST_DEPARTMENT.deptCode,
              deptName: SECOND_TEST_DEPARTMENT.deptName,
              id: SECOND_TEST_DEPARTMENT.id,
            },
          ]);
        });
    });
  });

  describe('UserModule (e2e)', () => {
    it('creates new user', () => {
      TEST_USER.departments = [TEST_DEPARTMENT.id];
      const createUserQuery = `
          mutation {
            createUser(createUserInput: {
              deviceId: ${JSON.stringify(TEST_USER.deviceId)}
              expoPushToken: ${JSON.stringify(TEST_USER.expoPushToken)}
              departments: ${JSON.stringify(TEST_USER.departments)}
            }) {
              id
              deviceId
              expoPushToken
              departments {
                deptCode
                deptName
                id
              }
            }
          }`;

      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: createUserQuery })
        .expect(200)
        .expect((response) => {
          const data = response.body.data.createUser;
          TEST_USER.id = data.id;

          expect(data.deviceId).toBe(TEST_USER.deviceId);
          expect(data.expoPushToken).toBe(TEST_USER.expoPushToken);
          expect(data.departments[0].id).toBe(TEST_USER.departments[0]);
          expect(data.id).not.toBeNull();
        });
    });

    it('gets user by userid', () => {
      const getUserQuery = `
        query {
            getUser(id: ${JSON.stringify(TEST_USER.id)}) {
            deviceId
            id
            expoPushToken
            departments {
                deptCode
                deptName
                id
            }
          }
        }`;

      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: getUserQuery })
        .expect(200)
        .expect((response) => {
          expect(response.body.data.getUser).toEqual({
            deviceId: TEST_USER.deviceId,
            id: TEST_USER.id,
            expoPushToken: TEST_USER.expoPushToken,
            departments: [TEST_DEPARTMENT],
          });
        });
    });

    it(`updates user's departments list`, () => {
      const updateUserDepartmentQuery = `
        mutation {
            updateUserDepartment(id: ${JSON.stringify(
              TEST_USER.id,
            )}, department: ${JSON.stringify(SECOND_TEST_DEPARTMENT.id)}) {
                deviceId
                id
                expoPushToken
                departments {
                    deptCode
                    deptName
                    id
                }
            }
        }`;
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: updateUserDepartmentQuery })
        .expect(200)
        .expect((response) => {
          expect(response.body.data.updateUserDepartment).toEqual({
            deviceId: TEST_USER.deviceId,
            id: TEST_USER.id,
            expoPushToken: TEST_USER.expoPushToken,
            departments: [TEST_DEPARTMENT, SECOND_TEST_DEPARTMENT],
          });
        });
    });
  });
});
