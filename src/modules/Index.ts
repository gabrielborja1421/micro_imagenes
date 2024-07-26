import ImageApplication from "./application/image.application";
import ImageInfrastructure from "./infrastructure/image.infrastructure";
import ImageController from "./interface/image.controller";
import ImageRouter from "./interface/image.router";


const contentI: ImageInfrastructure = new ImageInfrastructure();
const contentApp: ImageApplication =  new ImageApplication(contentI);
const controller: ImageController = new ImageController(contentApp);
const imageRouter: ImageRouter = new ImageRouter(controller);

export default imageRouter;