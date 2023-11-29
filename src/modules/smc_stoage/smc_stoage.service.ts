import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { SmcStoageFileInfo } from './dto/smc_stoage.dto';

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
  BUCKET_NAME = this.configService.get("AWS_S3_BUCKET");

  async createUserFolder(userName){
    await this.s3.putObject({
      Bucket: this.BUCKET_NAME,
      Key: `[User] ${userName}/`
    }).promise();
  }

  async uploadFile(file, userName, prefix) {
    const { originalname } = file;
    
    return await this.s3_upload(
      file.buffer,
      this.BUCKET_NAME,
      originalname,
      file.mimetype,
      `[User] ${userName}`,
      prefix,
    );
  }

  private async s3_upload(file, bucket, name, mimetype, userFolder, prefix) {
    if (prefix === '/') {
      const params = {
        Bucket: bucket,
        Key: `${userFolder}/${String(name)}`,
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
    else {
      const params = {
        Bucket: bucket,
        Key: `${userFolder}/${prefix}${String(name)}`,
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

  async getFiles(userName) {
    const filesInfo: SmcStoageFileInfo[] = [];
    const params = {
      Bucket: this.BUCKET_NAME,
      MaxKeys: this.MAX_KEYS,
      FetchOwner: true,
      Prefix: `[User] ${userName}/`,
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

  async downloadFile(fileName, userName, prefix){
    try {
      if (prefix && prefix.length > 0){
        const signedUrl = await this.s3.getSignedUrl("getObject", {
          Bucket: this.BUCKET_NAME,
          Key: `[User] ${userName}/${prefix}/${fileName}`,
          Expires: 15,
        });
  
        return signedUrl
      }
      else {
        const signedUrl = await this.s3.getSignedUrl("getObject", {
          Bucket: this.BUCKET_NAME,
          Key: `[User] ${userName}/${fileName}`,
          Expires: 15,
        });
  
        return signedUrl 
      }
    } catch (error) {
      throw new Error(`Failed to download object: ${error.message}`);
    }
  }

  async createFolder(folderName){
    await this.s3.putObject({
      Bucket: this.BUCKET_NAME,
      Key: folderName + "/"
    }).promise();
  }

  // async moveObject(sourceKey: string, destinationKey: string): Promise<void> {
  //   try {
  //     // 객체 이동
  //     await this.s3.copyObject({
  //       Bucket: this.BUCKET_NAME,
  //       CopySource: encodeURI(`/${this.BUCKET_NAME}/${sourceKey}`),
  //       Key: destinationKey + "/" + sourceKey,
  //     }).promise();

  //     // 이동한 객체 삭제
  //     await this.s3.deleteObject({
  //       Bucket: this.BUCKET_NAME,
  //       Key: sourceKey,
  //     }).promise();
  //   } catch (error) {
  //     throw new Error(`Failed to move object: ${error.message}`);
  //   }
  // }
}
