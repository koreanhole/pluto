import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { v4 as uuid } from 'uuid';
import { CreateDepartmentInput } from './department.input';

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

  async getManyDepartmentsById(ids: string[]): Promise<Department[]> {
    try {
      return await this.departmentRepository.find({
        where: {
          id: {
            $in: ids,
          },
        },
      });
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
      deptName,
      deptType,
      deptClassification,
      lastFetchedListId,
    } = createDepartmentInput;

    const department = this.departmentRepository.create({
      id: uuid(),
      deptCode,
      deptName,
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
