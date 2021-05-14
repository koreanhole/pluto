import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { v4 as uuid } from 'uuid';
import { CreateDepartmentInput } from './department.input';
import { DeptType } from './department.enum';

@Injectable()
export class DepartmentService {
  private logger = new Logger('DepartmentService');
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async getAllDepartment(): Promise<Department[]> {
    try {
      return await this.departmentRepository.find();
    } catch (error) {
      this.logger.error('get All Department Error', error.stack);
    }
  }

  async getDepartmentById(id: string): Promise<Department> {
    try {
      return await this.departmentRepository.findOne({ id });
    } catch (error) {
      this.logger.error('get department by id error', error.stack);
    }
  }

  async getDepartmentByDeptType(deptType: DeptType): Promise<Department> {
    try {
      return await this.departmentRepository.findOne({
        deptType,
      });
    } catch (error) {
      this.logger.error('get department by id error', error.stack);
    }
  }

  // 여러개의 departmentId를 받아서 배열로 반환한다.
  async getManyDepartmentsById(ids: string[]): Promise<Department[]> {
    try {
      return await this.departmentRepository.findByIds(ids);
    } catch (error) {
      this.logger.error('get many department by id error', error.stack);
    }
  }

  async updateLastFetchedListId(id: string, listId: string): Promise<void> {
    try {
      const department = await this.getDepartmentById(id);
      department.lastFetchedListId = listId;
      await this.departmentRepository.save(department);
    } catch (error) {
      this.logger.error('update last fetched list id error', error.stack);
    }
  }

  async createDepartment(
    createDepartmentInput: CreateDepartmentInput,
  ): Promise<Department> {
    const {
      deptCode,
      subDeptCode,
      deptType,
      deptClassification,
      lastFetchedListId,
    } = createDepartmentInput;

    if (
      typeof (await this.departmentRepository.findOne({
        deptType: deptType,
      })) !== 'undefined'
    ) {
      this.logger.error('Department Duplicated Error');
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: '이미 존재하는 부서입니다.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const department = this.departmentRepository.create({
      id: uuid(),
      deptCode,
      subDeptCode,
      deptType,
      deptClassification,
      lastFetchedListId,
    });

    try {
      return await this.departmentRepository.save(department);
    } catch (error) {
      this.logger.error('save department error', error.stack);
    }
  }
}
