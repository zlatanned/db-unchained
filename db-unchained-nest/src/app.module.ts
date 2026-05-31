import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QueryModule } from './query/query.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // isGlobal: true = no need to import in every module
    QueryModule,
  ],
})
export class AppModule {}
