import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsDefined,
  IsDateString,
  IsEmpty,
  IsArray,
} from 'class-validator';
import {
  userBaseInfo,
  UserInfo,
  userStrongInfo,
} from '../entities/user.entity';

export class CreateUserDto extends UserInfo {
  @ApiProperty({ type: Date })
  @IsDateString()
  @IsOptional()
  createdAt?: Date;
}

// export class CreateUsersDto {
//   @ApiProperty({ type: () => [CreateUserDto] })
//   @IsArray()
//   @IsDefined()
//   items: CreateUserDto[];
// }
