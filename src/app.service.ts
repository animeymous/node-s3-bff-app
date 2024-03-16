import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { MongoClient, GridFSBucket, ObjectId } from 'mongodb'
import * as fs from "fs"
// import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor( @InjectConnection() private objectId: ObjectId) {}

  // will create unique Bucket and upload file on it
  async createBucketAndUploadFile(req, file){
    const mongoDBConnection = await MongoClient.connect('mongodb://localhost:27017/node-s3');
    const db = mongoDBConnection.db();
    const bucket = new GridFSBucket(db, {
      bucketName: req.params.bucketName
    })
    
    const filePath = (new Date().getTime()) + "-" + file.originalname
    fs.createReadStream("C:\\Users\\Ashutosh\\AppData\\Local\\Temp\\upload_f80cd148ea3003854168d7638b517e36").pipe(
      bucket.openUploadStream(filePath, {
      chunkSizeBytes: 1048576,
      metadata: {
        name: file.originalname,
        size: file.size,
        type: file.mimetype
      }
    })
    )

    return {
      done: file
    }
  }

  // Will return all Buckets
  async getAllBuckets(){
    const mongoDBConnection = await MongoClient.connect('mongodb://localhost:27017/node-s3');
    const db = mongoDBConnection.db();

    const collectionNames = await db.listCollections().toArray();
        const bucketNames = collectionNames
            .filter((collection) => collection.name.endsWith('.files'))
            .map((collection) => collection.name.replace('.files', ''));

        return bucketNames;
  }

  // will return All Objects in specific Bucket
  async getAllListsInBucket(req){
    const mongoDBConnection = await MongoClient.connect('mongodb://localhost:27017/node-s3');
    const db = mongoDBConnection.db();

    const bucket = new GridFSBucket(db, {
      bucketName: req.params.bucketName
    })

    const files = await bucket.find({}).sort({uploadDate: -1}).toArray()

    return files;
  }

  // will delete specific Object from specific Bucket
  async deleteObjectFromBucket(req){
    const mongoDBConnection = await MongoClient.connect('mongodb://localhost:27017/node-s3');
    const db = mongoDBConnection.db();

    const bucket = new GridFSBucket(db, {
      bucketName: req.params.chooseBucketFromDelete
    })

    const result = await bucket.delete(new ObjectId(req.params.chooseObjectToDelete))

    return result
  }
}
