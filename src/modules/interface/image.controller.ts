import { Request, Response } from "express";
import ImageApplication from "../application/image.application";
import { ContentData, upload } from "../domain/repository/image.repository";
import { UploadedFile } from "express-fileupload";
import { deleteArchive, updateArchive, uploadArchive } from "../../helpers/validate_extensions";

const extensions = ['mp4','mp3'];

export default class ContentController {
    constructor(
        private readonly app: ImageApplication
    ){
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    async delete(req: Request, res: Response){
        try {
            const user_id = +req.params.user_id;
            const image = await this.app.getByUserId(user_id);
            const result = await deleteArchive(image.publicId);
            const response = await this.app.delete(user_id);
            return res.json({
                result,
                response
            });
        } catch (error) {
            return res.status(400).json({
                msg: error.message
            });
        }
    }
    async create(req: Request, res: Response){
        try {
            const data: ContentData = req.body;
            const user_id = req.body.user_id;
            if (!user_id) return res.status(400).json({msg: "Se necesita el id del usuario"});
            if (!data) return res.status(200).json({msg: "No hay nada para agregar"});
            if (req.files && Object.keys(req.files).length > 0 && req.files.image){
                const file = req.files.image as UploadedFile;
                const fileData: upload = await uploadArchive(file);
                data.link = fileData.link;
                data.name = fileData.name;
                data.extension = fileData.extension;
                data.publicId = fileData.publicId;
                data.user_id = user_id;
                const content = await this.app.create(data);
                return res.json(content);
            }
            return res.status(400).json({
                msg: "Se necesita el contenido a subir"
            });
        } catch (error) {
            return res.status(400).json({
                msg: error.message
            });
        }
    }
    
    async update(req: Request, res: Response){
        try {
            const user_id = +req.params.user_id;
            const image = await this.app.getByUserId(user_id);
            const data: ContentData = req.body;
            if (!data) return res.status(200).json({msg: "No hay nada para actualizar"});
            if (req.files && Object.keys(req.files).length > 0 && req.files.image){
                const file = req.files.image as UploadedFile;
                const fileData: upload = await updateArchive(file, image.publicId);
                data.link = fileData.link;
                data.name = fileData.name;
                data.extension = fileData.extension;
                data.publicId = fileData.publicId;
                const content = await this.app.update(data, user_id);
                return res.json(content);
            }
            return res.status(400).json({
                msg: "Se necesita el contenido a subir"
            });
        } catch (error) {
            return res.status(400).json({
                msg: error.message
            });
        }
    }

    async get(req: Request, res: Response){
        try {
            const user_id = +req.params.user_id;
            const content = await this.app.getByUserId(user_id);
            return res.json(content);
        } catch (error) {
            return res.status(400).json({
                msg: error.message
            });
        }
    }
}