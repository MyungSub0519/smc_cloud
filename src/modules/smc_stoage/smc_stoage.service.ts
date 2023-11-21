import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { SmcStorageFileInfo } from './smc_storage.interface';
import * as fs from 'fs';

@Injectable()
export class SmcStoageService {
  constructor(private configService: ConfigService) {}

  s3 = new AWS.S3({
    region: this.configService.get('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'),
    },
  })

  MAX_KEYS = 300;

  async uploadFile(file) {
    const { originalname } = file;
    await this.downloadFile(originalname);
    
    return await this.s3_upload(
      file.buffer,
      this.configService.get("AWS_S3_BUCKET"),
      originalname,
      file.mimetype,
    );
  }

  async getFiles() {
    const filesInfo: SmcStorageFileInfo[] = [];
    const params = {
      Bucket: this.configService.get("AWS_S3_BUCKET"),
      MaxKeys: this.MAX_KEYS,
      FetchOwner: true
    };

    let response = await this.s3.listObjectsV2(params).promise();

    for (let content of response.Contents) {
      const fileInfo = {
        key: content.Key,
        upload_time: content.LastModified,
        size: content.Size,
        extension: content.Key.split(".")[1],
      };
      filesInfo.push(fileInfo);
    }
    return filesInfo;
  }

  async downloadFile(fileName){
    const outStream = fs.createWriteStream("download/" + fileName);
    const inStream = this.s3.getObject({
        Bucket: this.configService.get("AWS_S3_BUCKET"),
        Key: fileName
    }).createReadStream();

    inStream.pipe(outStream);
    inStream.on('end', () => {
        return "Download Done";
    });
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-northeast-2',
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
