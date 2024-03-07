import { ConflictException, Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { createDealDto, updateDealDto } from './dto';

import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class DealService {

    constructor(private prisma: PrismaService , private uploadService : UploadService){}
   
    async create(file:Express.Multer.File , dto:createDealDto) {
      const deal = await this.prisma.deal.findUnique({
        where : {
            name : dto.name 
        }
      })  

      if (deal) throw new ConflictException("Deal with same name already Exists") ;
      console.log(dto)
      const startDate = new Date(dto.startDate);
      const endDate = new Date(dto.endDate);
      const phaseStartDate = new Date(dto.phaseStartDate);
      const phaseEndDate = new Date(dto.phaseEndDate);
      const templates = JSON.parse(dto.templates);
      const customField = dto.customField?JSON.parse(dto.customField):null ;
     let url ;
     if (file){
      url =  await this.uploadService.upload(file.originalname,file.buffer);}
     
    const newDeal = await this.prisma.deal.create({
       data : {
        ...dto,
        startDate : startDate,
        endDate : endDate,
        phaseStartDate : phaseStartDate ,
        phaseEndDate:phaseEndDate,
        templates:templates,
        file:url,
        customField:customField
       }
      })
      return newDeal ;
    }
    async findAll() {
      return await this.prisma.deal.findMany() ;
    }

    async findById(id : number) {
      try {
      const deal = await this.prisma.deal.findUnique({
        where : {
          id: id, 
        },
      }) 
      return deal ;
    }
       catch (error) {
            if (error.code === 'P2025') {
               
                throw new NotFoundException(`Deal with ID ${id} not found`);
            }
            throw error;
        }

    }

    async deleteById(id : number) {
   
      try {

           const existingDeal = await this.prisma.deal.findUnique({ where: { id } });
           if (existingDeal.file){
            await this.uploadService.delete(existingDeal.file) ;
           }
            
            const deleteResult = await this.prisma.deal.delete({
                where: {
                    id: id,
                },
            });

            return deleteResult;
        } catch (error) {
            if (error.code === 'P2025') {
               
                throw new NotFoundException(`Deal with ID ${id} not found`);
            }
            throw error;
        }

    }

    async updateById(id : number,dto:updateDealDto,file:Express.Multer.File) {
      try {
        const existingDeal = await this.prisma.deal.findUnique({ where: { id } });
        const { phaseStartDate,phaseEndDate,startDate, endDate,templates,customField, ...restDto } = dto;

    const data = {
      ...restDto,
      startDate: startDate ? new Date(startDate) : existingDeal.startDate,
      endDate: endDate ? new Date(endDate) : existingDeal.endDate,
      phaseStartDate: phaseStartDate ? new Date(phaseStartDate) : existingDeal.phaseStartDate,
      phaseEndDate: phaseEndDate ? new Date(phaseEndDate) : existingDeal.phaseEndDate,
      templates : templates ? JSON.parse(templates) : existingDeal.templates,
      customField : customField ? JSON.parse(customField) : existingDeal.customField
    };
       let url;
        if (file) {
          
            if (existingDeal.file) {
                await this.uploadService.delete(existingDeal.file);
            }

            
            url = await this.uploadService.upload(file.originalname, file.buffer);
        }

        const updatedResult = await this.prisma.deal.update({
          where : {
            id : id,
          },
          data : {
            ...data,
            file : url ? url : existingDeal.file 
          }

         })

        return updatedResult ;
      }
      catch(error) {
          if (error.code === 'P2025') {
               
                throw new NotFoundException(`Deal with ID ${id} not found`);
            }
            throw error;
      }
    }
}
