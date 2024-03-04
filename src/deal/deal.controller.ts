import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DealService } from './deal.service';
// import { createDealDto } from './dto/createdeal.dto';
import { createDealDto, updateDealDto } from './dto';


@Controller('deal')
export class DealController {  
    constructor(private dealService:DealService){}
    @Post('create')
    async Create(@Body() dto:createDealDto ){
        return await this.dealService.create(dto) ;
    }

    @Get()
    async getDeals() {
        
        return await this.dealService.findAll() ;
    }

    @Get(':id')
    async getDealById(@Param('id') id : string) {
        const dealId = parseInt(id,10) ;
     
        return await this.dealService.findById(dealId) ;
    }

    @Delete(':id')
    async deleteDeal(@Param('id') id:string) {
          const dealId = parseInt(id,10) ;

          return await this.dealService.deleteById(dealId) ;
    }

    @Put(':id')
    async updateDeal(@Param('id') id:string,@Body() dto : updateDealDto) {
         const dealId = parseInt(id,10) ;

         return await this.dealService.updateById(dealId,dto) ;
    }
}
