import { Controller, Get, Post, Res, UseInterceptors, UploadedFiles, Query, Body } from '@nestjs/common';
import { SmcStoageService } from './smc_stoage.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { SmcStoageFileDownloadParms } from './dto/smc_stoage.dto';


@Controller('smc-stoage')
export class SmcStoageController {
  constructor(private readonly smcStoageService: SmcStoageService) {}

  @Get()
    async getStorageInfo() {
      return await this.smcStoageService.createUserFolder("rlawoals");
    }

  @Get('/get')
  getFiles(){
    return this.smcStoageService.getFiles("rlawoals");
  }

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body('prefix') prefix: string
  ) {
    await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        await this.smcStoageService.uploadFile(file, "rlawoals", prefix);
      })
    );
    return {
      statusCode: 201,
      message: `success upload file`
    };
  }

  @Get('/download')
  async downloadFile(@Res() res: Response, @Query() query: SmcStoageFileDownloadParms){
    const presignedUrl = await this.smcStoageService.downloadFile(query.file_name, "rlawoals", query.prefix);
    return res.status(200).send({ "presignedUrl": presignedUrl});
  }

  @Post('/create_folder')
  async createFolder(@Body() folder_name: string){
    await this.smcStoageService.createFolder(folder_name)
    return {
      statusCode: 201,
      message: `success create folder`
    };
  }

  // @Put('/move_object')
  // async moveFileInFolder(@Query('folder_name') folder_name: string, @Query('file_name') file_name: string){
  //   await this.smcStoageService.moveObject(file_name, folder_name)
  //   return {
  //     statusCode: 201,
  //     message: `success move object`
  //   };
  // }
}

