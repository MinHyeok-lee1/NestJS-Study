import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseArrayPipe,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User, UserRole } from './entities/user.entity';
import { DeleteResult } from 'mongodb';

@ApiTags('user API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('dummyUsers/:numbers')
  @ApiOperation({
    summary: `Number만큼의 Dummy Users 추가`,
  })
  @ApiParam({ name: 'numbers', description: `해당 숫자만큼 생성` })
  async createDummyUser(@Param('numbers') numbers: number) {
    return this.userService.createMany(numbers);
  }

  @Post()
  @ApiBody({ type: [CreateUserDto] })
  @ApiOperation({
    summary: `새로운 Users 추가`,
  })
  @ApiCreatedResponse({
    type: [CreateUserDto],
  })
  async createUsers(
    @Body(new ParseArrayPipe({ items: CreateUserDto }))
    usersDto: CreateUserDto[],
  ) {
    return this.userService.create(usersDto);
  }

  @Post('one')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({
    summary: `새로운 User 추가`,
  })
  async createUser(@Body() usersDto: CreateUserDto) {
    console.log(usersDto);
    return this.userService.createOne(usersDto);
  }

  @Get()
  @ApiOperation({
    summary: ` 조건에 해당하는 데이터 반환`,
  })
  @ApiResponse({ description: '모든 차량 리스트' })
  async filterByRole(): Promise<User[]> {
    return this.userService.userPagenation();
  }

  @Get('all')
  @ApiOperation({
    summary: `User 정보 전체 반환`,
  })
  @ApiResponse({ description: '모든 차량 리스트' })
  async findAllCars(): Promise<User | User[]> {
    return await this.userService.getAll();
  }

  // @Get('all')
  // @ApiOperation({
  //   summary: `  차량 정보 전체 반환`,
  // })
  // @ApiResponse({ description: '모든 차량 리스트' })
  // async findAllCars(): Promise<User> {
  //   return await this.userService.getAll();
  // }

  @Delete('all')
  @ApiOperation({
    summary: `차량 전체 삭제 반환`,
  })
  @ApiResponse({ description: '모든 차량 리스트' })
  async deleteAllCars(): Promise<DeleteResult> {
    return await this.userService.deleteAll();
  }
}
