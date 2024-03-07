import { Optional } from "@nestjs/common";
import {IsDateString, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

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
    @IsDateString()
    @IsNotEmpty()
    startDate : string ;
 
    @IsOptional()
    @IsDateString()
    @IsNotEmpty()
    endDate : string ;


    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description : string 
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    status: string 

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    phase: string 

   
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    phaseStatus: string 
    
    @IsOptional()
    @IsDateString()
    @IsNotEmpty()
    phaseStartDate : string ;
 
   
    @IsOptional()
    @IsDateString()
    @IsNotEmpty()
    phaseEndDate : string ;


    @IsOptional()
    @IsObject()
    templates:any ;

    @IsOptional()
    @IsObject()
    customField? : any ;

    @IsOptional()
    @IsString()
    files? : string ;

}