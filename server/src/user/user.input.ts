import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  expoPushToken: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID])
  departments: string[];
}
