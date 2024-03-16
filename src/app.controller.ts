import { Controller, Get, Res, Post, Delete, Req, UseInterceptors, UploadedFile  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // will create unique Bucket and upload file on it
  @Post("createBucketAndUploadFile/:bucketName")
  @UseInterceptors(FileInterceptor('file')) // Tie the FileInterceptor to the route handler
  async createBucketAndUploadFile(@Req() req: Request, @UploadedFile() file){
    let body = await this.appService.createBucketAndUploadFile(req, file)
    console.log(req.params, file)
    return {"message": "created bucket"}
  }

  // Will return all Buckets
  @Get("getAllBuckets")
  async getAllBuckets(@Req() req: Request){
    let body = await this.appService.getAllBuckets()
    return {"allbuckets": body}
  }

  // will return All Objects in specific Bucket
  @Get("getAllListsInBucket/:bucketName")
  async getAllListsInBucket(@Req() req: Request){
    let body = await this.appService.getAllListsInBucket(req)
    return {"allListsInBucket": body}
  }

  // will delete specific Object from specific Bucket
  @Delete("deleteObjectFromBucket/:chooseBucketFromDelete/:chooseObjectToDelete")
  async deleteObjectFromBucket(@Req() req: Request){
    const result = await this.appService.deleteObjectFromBucket(req)
    console.log(result)
    return {"message": "deleted object in bucket"}
  }
}
