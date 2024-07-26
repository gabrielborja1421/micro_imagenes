import { Err, Result } from "neverthrow";
import ImageEntity from "../entity/image.entity";
import Image from "../../infrastructure/models/image.model";


export interface ContentData {
    id?: number;
    name: string;
    extension: string;
    link: string;
    user_id: number;
    publicId: string;
}

export interface upload {
    name: string;
    extension: string;
    link: string;
    user_id?: number;
    publicId: string;
}

export default interface ImageRepository {
    create(data: ImageEntity): Promise<ContentResult>;
    update(data: ImageEntity, user_is: number): Promise<ContentResult>;
    getByUserId(user_id: number): Promise<ContentResult>;
    deleteContent(user_id: number): Promise<ContentdeleteResult>;
}

export type ContentResult = Result<Image, Error>;
export type ContentdeleteResult = Result<string, Error>;