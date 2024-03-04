import { Optional } from "@nestjs/common";
import {IsNotEmpty, IsOptional, IsString } from "class-validator";

export class updateDealDto {
    
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name:string;

    

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    owner:string;
    

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    startDate : string ;
 
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    endDate : string ;

}