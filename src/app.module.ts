import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DealModule } from './deal/deal.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [PrismaModule,ConfigModule.forRoot({isGlobal:true}), DealModule, UploadModule],
})
export class AppModule {}
