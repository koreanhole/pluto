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
import { NoticeType } from '../src/notice/notice.type';
import { NoticeModule } from '../src/notice/notice.module';
import { NOTICE_PAGINATED_BUNDLE_SIZE } from '../src/notice/notice.service';

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

const TEST_NOTICE: NoticeType = {
  id: null,
  attachmentLinks: [
    {
      fileLink: 'test file link',
      fileName: 'test file name',
    },
  ],
  authorDept: 'test author dept',
  authorName: 'test author name',
  contentHtml: 'test content html',
  contentString: 'test content string',
  createdDatetime: '2021-02-07T12:27:08.059Z',
  department: null,
  listId: 'test list id',
  title: 'test title',
  url: 'test url',
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
        NoticeModule,
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

  describe('NoticeModule (e2e)', () => {
    it('creates new notice', async () => {
      TEST_NOTICE.department = TEST_DEPARTMENT.id;
      const createNewNoticeQuery = `
      mutation {
        createNotice(createNoticeInput: {
          attachmentLinks: [{
            fileLink: ${JSON.stringify(TEST_NOTICE.attachmentLinks[0].fileLink)}
            fileName: ${JSON.stringify(TEST_NOTICE.attachmentLinks[0].fileName)}
          }]
          authorDept: ${JSON.stringify(TEST_NOTICE.authorDept)}
          authorName: ${JSON.stringify(TEST_NOTICE.authorName)}
          contentHtml: ${JSON.stringify(TEST_NOTICE.contentHtml)}
          contentString: ${JSON.stringify(TEST_NOTICE.contentString)}
          createdDatetime: ${JSON.stringify(TEST_NOTICE.createdDatetime)}
          department: ${JSON.stringify(TEST_NOTICE.department)}
          listId: ${JSON.stringify(TEST_NOTICE.listId)}
          title: ${JSON.stringify(TEST_NOTICE.title)}
          url: ${JSON.stringify(TEST_NOTICE.url)}
        }) {
          attachmentLinks {
            fileName
            fileLink
          }
          authorDept
          authorName
          contentHtml
          contentString
          createdDatetime
          department {
            deptCode
            deptName
            id
          }
          listId
          title
          url
          id
        }
      }`;
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: createNewNoticeQuery })
        .expect(200)
        .expect((response) => {
          const data = response.body.data.createNotice;
          TEST_NOTICE.id = data.id;
          expect(data).toEqual({
            attachmentLinks: [
              {
                fileName: TEST_NOTICE.attachmentLinks[0].fileName,
                fileLink: TEST_NOTICE.attachmentLinks[0].fileLink,
              },
            ],
            authorDept: TEST_NOTICE.authorDept,
            authorName: TEST_NOTICE.authorName,
            contentHtml: TEST_NOTICE.contentHtml,
            contentString: TEST_NOTICE.contentString,
            createdDatetime: TEST_NOTICE.createdDatetime,
            department: {
              deptCode: TEST_DEPARTMENT.deptCode,
              deptName: TEST_DEPARTMENT.deptName,
              id: TEST_DEPARTMENT.id,
            },
            listId: TEST_NOTICE.listId,
            title: TEST_NOTICE.title,
            url: TEST_NOTICE.url,
            id: TEST_NOTICE.id,
          });
        });
    });
    it('gets notice by notice id', () => {
      const getNoticeQuery = `
      query {
        getNotice(id: ${JSON.stringify(TEST_NOTICE.id)}) {
          attachmentLinks {
            fileName
            fileLink
          }
          authorDept
          authorName
          contentHtml
          contentString
          createdDatetime
          department {
            deptCode
            deptName
            id
          }
          listId
          title
          url
          id
        }
      }`;
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: getNoticeQuery })
        .expect(200)
        .expect((response) => {
          expect(response.body.data.getNotice).toEqual({
            attachmentLinks: [
              {
                fileName: TEST_NOTICE.attachmentLinks[0].fileName,
                fileLink: TEST_NOTICE.attachmentLinks[0].fileLink,
              },
            ],
            authorDept: TEST_NOTICE.authorDept,
            authorName: TEST_NOTICE.authorName,
            contentHtml: TEST_NOTICE.contentHtml,
            contentString: TEST_NOTICE.contentString,
            createdDatetime: TEST_NOTICE.createdDatetime,
            department: {
              deptCode: TEST_DEPARTMENT.deptCode,
              deptName: TEST_DEPARTMENT.deptName,
              id: TEST_DEPARTMENT.id,
            },
            listId: TEST_NOTICE.listId,
            title: TEST_NOTICE.title,
            url: TEST_NOTICE.url,
            id: TEST_NOTICE.id,
          });
        });
    });
    // TODO: 1. query로 input 전달하는 효율적인 방법 찾아서 2. 두번째 notice도 생성 후 결과 확인하는 테스트도 작성
    it(`it gets paginated notices, bundleSize: ${NOTICE_PAGINATED_BUNDLE_SIZE}`, () => {
      const getPaginatedNoticeQuery = `
      query {
        getPaginatedNotice(offset: 0) {
          attachmentLinks {
            fileName
            fileLink
          }
          authorDept
          authorName
          contentHtml
          contentString
          createdDatetime
          department {
            deptCode
            deptName
            id
          }
          listId
          title
          url
          id
        }
      }`;
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: getPaginatedNoticeQuery })
        .expect((response) => {
          expect(response.body.data.getPaginatedNotice).toEqual([
            {
              attachmentLinks: [
                {
                  fileName: TEST_NOTICE.attachmentLinks[0].fileName,
                  fileLink: TEST_NOTICE.attachmentLinks[0].fileLink,
                },
              ],
              authorDept: TEST_NOTICE.authorDept,
              authorName: TEST_NOTICE.authorName,
              contentHtml: TEST_NOTICE.contentHtml,
              contentString: TEST_NOTICE.contentString,
              createdDatetime: TEST_NOTICE.createdDatetime,
              department: {
                deptCode: TEST_DEPARTMENT.deptCode,
                deptName: TEST_DEPARTMENT.deptName,
                id: TEST_DEPARTMENT.id,
              },
              listId: TEST_NOTICE.listId,
              title: TEST_NOTICE.title,
              url: TEST_NOTICE.url,
              id: TEST_NOTICE.id,
            },
          ]);
        })
        .expect(200);
    });
    it('gets notice by departmentId', () => {
      const getNoticeByDepartmentIdQuery = `
      query {
        getNoticeByDepartmentId(departmentId: ${JSON.stringify(
          TEST_DEPARTMENT.id,
        )}, offset: 0) {
          attachmentLinks {
            fileName
            fileLink
          }
          authorDept
          authorName
          contentHtml
          contentString
          createdDatetime
          department {
            deptCode
            deptName
            id
          }
          listId
          title
          url
          id
        }
      }`;
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: getNoticeByDepartmentIdQuery })
        .expect((response) => {
          expect(response.body.data.getNoticeByDepartmentId).toEqual([
            {
              attachmentLinks: [
                {
                  fileName: TEST_NOTICE.attachmentLinks[0].fileName,
                  fileLink: TEST_NOTICE.attachmentLinks[0].fileLink,
                },
              ],
              authorDept: TEST_NOTICE.authorDept,
              authorName: TEST_NOTICE.authorName,
              contentHtml: TEST_NOTICE.contentHtml,
              contentString: TEST_NOTICE.contentString,
              createdDatetime: TEST_NOTICE.createdDatetime,
              department: {
                deptCode: TEST_DEPARTMENT.deptCode,
                deptName: TEST_DEPARTMENT.deptName,
                id: TEST_DEPARTMENT.id,
              },
              listId: TEST_NOTICE.listId,
              title: TEST_NOTICE.title,
              url: TEST_NOTICE.url,
              id: TEST_NOTICE.id,
            },
          ]);
        });
    });
  });
});
