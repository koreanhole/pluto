import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from 'src/notice/notice.entity';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { v4 as uuid } from 'uuid';
import { CreateDepartmentInput } from './department.input';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Notice>,
  ) {}

  async getAllDepartment(): Promise<Department[]> {
    return await this.departmentRepository.find();
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
