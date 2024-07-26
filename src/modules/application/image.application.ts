import { InternalServerErrorException } from "../../core/exceptions/internalserver.exception";
import ImageEntity from "../domain/entity/image.entity";
import ImageRepository, { ContentData } from "../domain/repository/image.repository";
import ImageInfrastructure from "../infrastructure/image.infrastructure";

export default class ContentApplication {
    constructor(
        private readonly repository: ImageRepository
    ){}
    async delete(user_id: number){
        const contentResult = await this.repository.deleteContent(user_id);
        if(contentResult.isErr())
            throw new InternalServerErrorException(contentResult.error.message);
        return contentResult.value;
    }

    async create(data: ContentData){
        const content = new ImageEntity({...data});
        const contentResult = await this.repository.create(content);
        if(contentResult.isErr())
            throw new InternalServerErrorException(contentResult.error.message);
        return contentResult.value;
    }

    async update(data: ContentData, user_id: number){
        const content = new ImageEntity({...data});
        const contentResult = await this.repository.update(content, user_id);
        if(contentResult.isErr())
            throw new InternalServerErrorException(contentResult.error.message);
        return contentResult.value;
    }

    async getByUserId(user_id: number){
        const contentResult = await this.repository.getByUserId(user_id);
        if(contentResult.isErr())
            throw new InternalServerErrorException(contentResult.error.message);
        return contentResult.value;
    }
}