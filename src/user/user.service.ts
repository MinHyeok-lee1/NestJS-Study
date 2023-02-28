import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private model: Model<User>,
  ) {
    model.events.on('error', (err) => console.log('* ERROR * = ', err.message));
  }

  async createMany(numbers: number): Promise<User[]> {
    let userList: CreateUserDto[] = [];
    for (let i = 0; i < Number(numbers); i++) {
      let randomNumber = this.getRandomNumberRange(1, 3);
      let createAt = this.getRandomDate(new Date(2023, 0, 1), new Date());

      let user: CreateUserDto = {
        name: `userDummy${i}`,
        major: 1,
        age: 1,
        role:
          randomNumber === 1
            ? UserRole.Warrior
            : randomNumber === 2
            ? UserRole.Magician
            : randomNumber === 3
            ? UserRole.Thief
            : null,

        level: 1,
        skills: ['NONE'],
        sheildPower: 1,
        magicPower: 1,
        swordPower: 1,

        createdAt: createAt,
      };
      userList.push(user);
    }

    const createUser = this.model.insertMany(userList);
    return createUser;
  }

  async create(createUserDto: CreateUserDto[]): Promise<User[]> {
    for (let userDto of createUserDto) {
      userDto.createdAt = new Date();
    }

    return await this.model.create(createUserDto);
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.createdAt = new Date(Date.now());
    const createUser = new this.model(createUserDto);

    return createUser.save();
  }

  getRandomNumberRange(min: number, max: number) {
    if (min === max) return 'equal Number';
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomNumberDigit(digit: number) {
    if (digit < 1) return 'parameter is bigger than 0';
    let divide = 1;
    for (let i = 0; i < digit; i++) divide = divide * 10;
    return Math.floor(Math.random() * divide);
  }

  getRandomDate(start: Date, end: Date) {
    const startDate = start.getTime();
    const endDate = end.getTime();

    return new Date(startDate + Math.random() * (endDate - startDate));
  }

  async userPagenation(): Promise<User[]> {
    let page1: User[], page2: User[], page3: User[];
    // try {
    //   page1 = await this.model.find().limit(2);
    // } catch (err: unknown) {
    //   console.log(err);
    // }
    // try {
    //   page2 = await this.model.find().skip(2).limit(2);
    // } catch (err: unknown) {
    //   console.log(err);
    // }
    page1 = await this.model.find().limit(2);
    page2 = await this.model.find().skip(2).limit(2);
    let latest = null;
    const cursor = this.model.collection.find().limit(2);
    while (await cursor.hasNext()) {
      latest = await cursor.next();
    }

    // try {
    //   page3 = await this.model
    //     .find({ createdAt: { $gt: latest.createdAt } })
    //     .limit(2);
    // } catch (err: unknown) {
    //   console.log(err);
    // }
    page3 = await this.model
      .find({ createdAt: { $gt: latest.createdAt } })
      .limit(2);
    return page3;
  }

  async getAll(): Promise<User> {
    // .exec()
    // return await this.model
    //   .findOne({ _id: '63fd6d2b5702c1bfcd8ab20d' })
    //   .catch();

    try {
      await this.model.findOne({ _id: 'zz' });
    } catch (err) {
      console.log('@@@@', err.message);
    }
    return await this.model.findOne({ _id: 'zz' }).catch();
  }

  async deleteAll(): Promise<DeleteResult> {
    // let fQuery: FilterQuery<User> = { _Id: token._Id };
    return await this.model.deleteMany({});
  }
}
