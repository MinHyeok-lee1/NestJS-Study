import * as mongoose from 'mongoose';
import {
  ApiProperty,
  PartialType,
  IntersectionType,
  OmitType,
  PickType,
} from '@nestjs/swagger';
import {
  IsString,
  IsDefined,
  IsNumber,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
} from 'class-validator';

export enum UserRole {
  Warrior = 'Warrior',
  Magician = 'Magician',
  Thief = 'Thief',
}

export class userBaseInfo {
  @ApiProperty({ type: String })
  @IsString()
  @IsDefined()
  name: string;

  @ApiProperty({ enum: ['Warrior', 'Magician', 'Thief'] })
  @IsEnum(UserRole)
  @IsDefined()
  role: UserRole;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  age: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  major: number;
}

export class userStrongInfo {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  level: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsDefined()
  skills: string[];

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  sheildPower: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  magicPower: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  swordPower: number;
}

export class UserInfo extends IntersectionType(userStrongInfo, userBaseInfo) {
  @ApiProperty({ type: Date })
  @IsDateString()
  @IsOptional()
  playTime?: Date;
}

export class PartialTypeClass extends PartialType(userStrongInfo) {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  test1: number;
}

export class OmitTypeClass extends OmitType(userStrongInfo, [
  'magicPower',
] as const) {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  test2: number;
}

export class PickTypeClass extends PickType(userStrongInfo, [
  'level',
] as const) {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  test3: number;
}

export class PartialTypeOmitClass extends PartialType(
  OmitType(userStrongInfo, ['swordPower', 'magicPower'] as const),
) {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  test4: number;
}

// gg

export const UserSchema = new mongoose.Schema({
  name: String,
  role: String,
  age: Number,
  major: Number,
  level: Number,
  skills: Array,
  sheildPower: Number,
  magicPower: Number,
  swordPower: Number,

  createdAt: Date,
});

export interface User extends Document {
  readonly userinfo: UserInfo;
  createdAt: Date;
}
