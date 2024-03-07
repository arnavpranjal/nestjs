import { IsDate, IsDateString, IsNotEmpty, IsObject, IsOptional, IsString, isString } from "class-validator";

export class createDealDto {
    
    
   
    @IsString()
    @IsNotEmpty()
    name:string;

    
    @IsString()
    @IsNotEmpty()
    description : string 
    
    @IsString()
    @IsNotEmpty()
    status: string 


    
    @IsString()
    @IsNotEmpty()
    owner:string;
    

   
    @IsDateString()
    @IsNotEmpty()
    startDate : string ;
 
  
    @IsDateString()
    @IsNotEmpty()
    endDate : string ;


    @IsString()
    @IsNotEmpty()
    phase: string 


    @IsString()
    @IsNotEmpty()
    phaseStatus: string 

    @IsDateString()
    @IsNotEmpty()
    phaseStartDate : string ;
 
  
    @IsDateString()
    @IsNotEmpty()
    phaseEndDate : string ;

    @IsObject()
    templates:any ;

    @IsOptional()
    @IsObject()
    customField? : any ;

    @IsOptional()
    @IsString()
    files? : string ;


}