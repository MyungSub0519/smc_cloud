import { Controller, Get, Post, Res, UseInterceptors, UploadedFiles, Query, StreamableFile, HttpStatus } from '@nestjs/common';
import { SmcStoageService } from './smc_stoage.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('smc-stoage')
export class SmcStoageController {
  constructor(private readonly smcStoageService: SmcStoageService) {}

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

  @Get('/get')
  getFiles(){
    return this.smcStoageService.getFiles();
  }

  @Get('/download')
  async downloadFile(@Res() res: Response, @Query('filename') filename: string){
    const filePath = path.resolve(process.cwd(), "download", filename)
    return await res.download(filePath);
  }
}

