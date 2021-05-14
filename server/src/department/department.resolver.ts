import { DepartmentType } from './department.type';
import { DepartmentService } from './department.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateDepartmentInput } from './department.input';

@Resolver(() => DepartmentType)
export class DepartmentResolver {
  constructor(private departmentService: DepartmentService) {}

  @Query(() => [DepartmentType])
  async getAllDepartments() {
    return await this.departmentService.getAllDepartment();
  }

  @Mutation(() => DepartmentType)
  async createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    return await this.departmentService.createDepartment(createDepartmentInput);
  }
}
