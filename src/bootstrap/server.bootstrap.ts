import { Application } from "express";
import path from "path";
import { paths } from "../helpers/paths";
import cors from 'cors';
import express from "express";
import fileUpload from 'express-fileupload';
import http from 'http';
import imageRouter from "../modules/Index";

export default class Server {
    private readonly app: Application;
    private port: string | number;
    private paths: paths;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8000;
        this.paths = {
            image: '/image',
        };
        this.middlewares();
        this.routes();
    }
    middlewares(){
        const publicPath = path.resolve(__dirname, '../uploads');
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/files', express.static(publicPath));        
        this.app.use(fileUpload({
            limits: {
              fileSize: 50 * 1024 * 1024 // límite de 50 MB
            },
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
          }));
    }
    routes() {
        this.app.use(this.paths.image, imageRouter.router);
    }
    initialize() {
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app);
            server
                .listen(this.port || 8000)
                .on("listening", () => {
                    resolve(true);
                    console.log("Server started in port: " + this.port);
                })
                .on("error", (error: Error) => {
                    console.log("Server failed to start: ", error);
                    reject(true);
                });
        });
    }
}