import { Controller, Get, Post, Res, UseInterceptors, UploadedFiles, Query, StreamableFile, HttpStatus, Body, Put } from '@nestjs/common';
import { SmcStoageService } from './smc_stoage.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as path from 'path';

@Controller('smc-stoage')
export class SmcStoageController {
  constructor(private readonly smcStoageService: SmcStoageService) {}

  @Get()
    async getStorageInfo() {
      return await this.smcStoageService.createBucket("rlawoals2590rlaosidhaoihsd");
    }
  
  @Get('/get')
  getFiles(){
    return this.smcStoageService.getFiles();
  }

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        await this.smcStoageService.uploadFile(file);
      })
    );
    return {
      statusCode: 201,
      message: `success upload file`
    };
  }

  @Get('/download')
  async downloadFile(@Res() res: Response, @Query('file_name') file_name: string){
    const presignedUrl = await this.smcStoageService.downloadFile(file_name);
    res.redirect(presignedUrl);
  }

  @Post('/create_folder')
  async createFolder(@Body('folder_name') folder_name: string){
    await this.smcStoageService.createFolder(folder_name)
    return {
      statusCode: 201,
      message: `success create folder`
    };
  }

  @Put('/move_object')
  async moveFileInFolder(@Query('folder_name') folder_name: string, @Query('file_name') file_name: string){
    await this.smcStoageService.moveObject(file_name, folder_name)
    return {
      statusCode: 201,
      message: `success move object`
    };
  }
}

