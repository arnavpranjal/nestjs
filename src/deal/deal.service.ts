import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { createDealDto, updateDealDto } from './dto';

@Injectable()
export class DealService {

    constructor(private prisma: PrismaService){}

    async create(dto:createDealDto) {
      const deal = await this.prisma.deal.findUnique({
        where : {
            name : dto.name 
        }
      })  

      if (deal) throw new ConflictException("Deal with same name already Exists") ;

      const startDate = new Date(dto.startDate);
      const endDate = new Date(dto.endDate);
      const phaseStartDate = new Date(dto.phaseStartDate);
      const phaseEndDate = new Date(dto.phaseEndDate);
      const newDeal = await this.prisma.deal.create({
       data : {
        ...dto,
        startDate : startDate,
        endDate : endDate,
        phaseStartDate : phaseStartDate ,
        phaseEndDate:phaseEndDate
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

    async updateById(id : number,dto:updateDealDto) {
      try {
        const existingDeal = await this.prisma.deal.findUnique({ where: { id } });
        const { phaseStartDate,phaseEndDate,startDate, endDate, ...restDto } = dto;

    const data = {
      ...restDto,
      startDate: startDate ? new Date(startDate) : existingDeal?.startDate,
      endDate: endDate ? new Date(endDate) : existingDeal?.endDate,
      phaseStartDate: phaseStartDate ? new Date(phaseStartDate) : existingDeal?.phaseStartDate,
      phaseEndDate: phaseEndDate ? new Date(phaseEndDate) : existingDeal?.phaseEndDate,

    };
       

        const updatedResult = await this.prisma.deal.update({
          where : {
            id : id,
          },
          data,
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
