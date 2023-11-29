import { IsNotEmpty, IsString, IsOptional } from 'class-validator';



export class SmcStoageFileDownloadParms {
  @IsNotEmpty()
  @IsString()
  file_name: string;

  @IsOptional()
  @IsString()
  prefix: string;
}

export interface SmcStoageFileInfo {
  key: string,
  upload_time: Date,
  size: number,
  extension: string
}


