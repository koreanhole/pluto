import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { v4 as uuid } from 'uuid';
import { CreateDepartmentInput } from './department.input';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async getAllDepartment(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  async getDepartmentById(id: string): Promise<Department> {
    return await this.departmentRepository.findOne({ id });
  }

  async getManyDepartmentsById(ids: string[]): Promise<Department[]> {
    return await this.departmentRepository.find({
      where: {
        id: {
          $in: ids,
        },
      },
    });
  }

  async createDepartment(
    createDepartmentInput: CreateDepartmentInput,
  ): Promise<Department> {
    const { deptCode, deptName } = createDepartmentInput;

    const department = this.departmentRepository.create({
      id: uuid(),
      deptCode,
      deptName,
    });

    return await this.departmentRepository.save(department);
  }
}
