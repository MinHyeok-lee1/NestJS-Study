import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserRole, userStrongInfo } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  major: number;

  @ApiProperty({ type: () => userStrongInfo })
  // @Type(() => userStrong)
  @IsOptional()
  status: userStrongInfo;

  @ApiProperty({ enum: ['Warrior', 'Magician', 'Thief'] })
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;
}
