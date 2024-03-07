import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DealService } from './deal.service';
// import { createDealDto } from './dto/createdeal.dto';
import { createDealDto, updateDealDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('deal')
export class DealController {  
    constructor(private dealService:DealService){}
    @Post('create')
     @UseInterceptors(FileInterceptor('file'))
    async Create(@UploadedFile() file: Express.Multer.File, @Body() dto:createDealDto ){
        console.log(file);
        return await this.dealService.create(file , dto) ;
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
    @UseInterceptors(FileInterceptor('file'))
    async updateDeal(@Param('id') id:string,@Body() dto : updateDealDto,@UploadedFile() file: Express.Multer.File) {
         const dealId = parseInt(id,10) ;

         return await this.dealService.updateById(dealId,dto,file) ;
    }
}
