import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class createDealDto {
    
    
   
    @IsString()
    @IsNotEmpty()
    name:string;

    

    
    @IsString()
    @IsNotEmpty()
    owner:string;
    

   
    @IsString()
    @IsNotEmpty()
    startDate : string ;
 
  
    @IsString()
    @IsNotEmpty()
    endDate : string ;

}