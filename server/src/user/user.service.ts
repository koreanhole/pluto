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

  async getUserInfo(id: string): Promise<User> {
    return await this.userRepository.findOne({ id });
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
