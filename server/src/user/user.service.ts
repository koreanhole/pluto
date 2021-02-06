import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUserByUserId(id: string): Promise<User> {
    return await this.userRepository.findOne({ id });
  }
  // departmentId로 User를 찾아 반환한다.
  async getUserExpoPushTokensByDepartmentId(
    departmentId: string,
  ): Promise<string[]> {
    const users = await this.userRepository.find({
      where: {
        departments: departmentId,
      },
    });
    const expoPushTokens = users.map((user) => {
      return user.expoPushToken;
    });

    return expoPushTokens;
  }

  async updateUserDepartment(id: string, department: string): Promise<User> {
    const user = await this.userRepository.findOne({ id });
    user.departments = [...user.departments, department];
    return await this.userRepository.save(user);
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { deviceId, expoPushToken, departments } = createUserInput;
    const user = this.userRepository.create({
      id: uuid(),
      deviceId,
      expoPushToken,
      departments,
    });
    return await this.userRepository.save(user);
  }
}
