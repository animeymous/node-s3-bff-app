import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory{

    constructor(private configService: ConfigService) {}

    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        // const username = this.configService.get("DATABASE_USER");
        // const password = this.configService.get("DATABASE_PASSWORD");
        // const host = this.configService.get("DATABASE_HOST");
        // const db = this.configService.get("DATABASE_NAME")

        // const uri = `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

        // return {
        //     uri
        // }
        let uri = "mongodb://localhost:27017/node-s3";
        return {
            uri
        }
    }

}