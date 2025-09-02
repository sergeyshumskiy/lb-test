import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import config from './config';
import { validate } from './validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validate,
    }),
  ],
})
export class ConfigModule {}
