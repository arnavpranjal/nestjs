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

      const newDeal = await this.prisma.deal.create({
        data : dto 
      })

      return newDeal ;
    }
    async findAll() {
      return await this.prisma.deal.findMany() ;
    }

    async findById(id : number) {
      return await this.prisma.deal.findUnique({
        where : {
          id: id, 
        },
      })
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
        const updatedResult = await this.prisma.deal.update({
          where : {
            id : id,
          },
          data : dto ,
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
