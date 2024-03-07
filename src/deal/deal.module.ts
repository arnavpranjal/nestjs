import { Module } from '@nestjs/common';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';


@Module({
  controllers: [DealController],
  providers: [DealService,PrismaService,UploadService]
})
export class DealModule {}
