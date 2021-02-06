import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUserByUserId(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ id });
    } catch (error) {
      this.logger.error(`get one user by userId: ${id} error`, error.stack);
    }
  }
  // departmentId로 User를 찾아 반환한다.
  async getUserExpoPushTokensByDepartmentId(
    departmentId: string,
  ): Promise<string[]> {
    let users: User[];
    try {
      users = await this.userRepository.find({
        where: {
          departments: departmentId,
        },
      });
    } catch (error) {
      this.logger.error(
        `get user expo push tokens by departmentId: ${departmentId} error`,
        error.stack,
      );
    }

    const expoPushTokens = users.map((user) => {
      return user.expoPushToken;
    });

    return expoPushTokens;
  }

  async updateUserDepartment(id: string, department: string): Promise<User> {
    const user = await this.getUserByUserId(id);
    try {
      user.departments = [...user.departments, department];
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error(
        `update user departmentId error, userId: ${id}, departmentId: ${department}`,
        error.stack,
      );
    }
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { deviceId, expoPushToken, departments } = createUserInput;
    const user = this.userRepository.create({
      id: uuid(),
      deviceId,
      expoPushToken,
      departments,
    });
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error(
        `save createdUser error, deviceId: ${deviceId}, expoPushToken: ${expoPushToken}`,
        error.stack,
      );
    }
  }
}
