import express from 'express';
import ImageController from './image.controller';
export default class  ContentRouter {
    private readonly _router: express.Router;
    constructor(
        private readonly controller: ImageController
    ){
        this._router = express.Router();
        this.mountRoutes();
    }
    mountRoutes(){
        this._router.get("/:user_id", this.controller.get);
        this._router.post("/", this.controller.create);
        this._router.put("/:user_id", this.controller.update);
        this._router.delete("/:user_id", this.controller.delete);
    }
    get router(){
        return this._router;
    }
}