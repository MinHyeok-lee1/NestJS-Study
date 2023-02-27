import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://kfdd6630:test1234!@cluster0.exm9u.mongodb.net/test',
      ),
  },
];
