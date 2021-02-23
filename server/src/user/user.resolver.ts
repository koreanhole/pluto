import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
} from '@nestjs/graphql';
import { UserType } from './user.type';
import { UserService } from './user.service';
import { DepartmentService } from '../department/department.service';
import { CreateUserInput } from './user.input';
import { User } from './user.entity';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private userService: UserService,
    private departmentService: DepartmentService,
  ) {}

  @Query(() => UserType)
  async User(@Args('id') id: string) {
    return await this.userService.getUserByUserId(id);
  }

  @Mutation(() => UserType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserType)
  async updateUserDepartment(
    @Args('id') id: string,
    @Args('department') department: string,
  ) {
    return await this.userService.updateUserDepartment(id, department);
  }

  @ResolveField('departments')
  async departments(@Parent() user: User) {
    return this.departmentService.getManyDepartmentsById(user.departments);
  }
}
