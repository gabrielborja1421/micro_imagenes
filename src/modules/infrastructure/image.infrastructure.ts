import { Repository } from "typeorm";
import ImageEntity from "../domain/entity/image.entity";
import ImageRepository, { ContentResult, ContentdeleteResult } from "../domain/repository/image.repository";
import Image from "./models/image.model";
import { dataSource } from "../../bootstrap/database.bootstrap";
import { err, ok } from "neverthrow";
import { IError } from "../../core/exceptions/error.exception";

export default class ContentInfrastructure implements ImageRepository {
    private readonly model: Repository<Image>;
    constructor(){
        this.model = dataSource.getRepository(Image);
    }
    async create(data: ImageEntity): Promise<ContentResult> {
        try {
            const content = this.model.create({...data.properties});
            await this.model.save(content);
            return ok(content);
        }catch(error){
            const resultErr = new IError('Error al momento de eliminar: ' + error.message, 500);
            return err(resultErr);
        }
    }
    async update(data: ImageEntity, user_is: number): Promise<ContentResult> {
        try {
            const content = await this.model.findOne({where: {user_id: user_is}});
            if(!content){
                throw new IError('No se encontro el contenido', 404);
            }
            content.name = data.properties.name;
            content.extension = data.properties.extension;
            content.link = data.properties.link;
            content.publicId = data.properties.publicId;
            await this.model.save(content);
            return ok(content);
        }catch(error){
            const resultErr = new IError('Error al momento de eliminar: ' + error.message, 500);
            return err(resultErr);
        }
    }
    async getByUserId(user_id: number): Promise<ContentResult> {
        try {
            const image = await this.model.findOne({where: {user_id}});
            return ok(image);
        }catch(error){
            const resultErr = new IError('Error al momento de consultar: ' + error.message, 500);
            return err(resultErr);
        }
    }

    async deleteContent(user_id: number): Promise<ContentdeleteResult> {
        try {
            const image = await this.model.findOne({where: {user_id}});
            if(!image){
                throw new IError('No se encontro el contenido', 404);
            }
            await this.model.delete(image);
            return ok('Contenido eliminado');
        }catch(error){
            const resultErr = new IError('Error al momento de eliminar: ' + error.message, 500);
            return err(resultErr);
        }
    }
}