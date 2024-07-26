import { UploadedFile } from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import { upload } from '../modules/domain/repository/image.repository';
import { IError } from '../core/exceptions/error.exception';
import { v4 as uuid } from 'uuid';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

export const uploadArchive = async (file: UploadedFile, extensionesValidas = ['png','jpg', 'jpeg']): Promise<upload> => {

        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1]
        const temporalName = `${uuid()}.${extension}`;
        if(!extensionesValidas.includes( extension )){
            throw new IError(`La extensión ${extension} no es permitida, ${extensionesValidas}`);
        }
        try {
            const result = await cloudinary.uploader.upload(file.tempFilePath);
            return {
                name: temporalName,
                link: result.secure_url,
                extension: extension,
                publicId: result.public_id
            }
        } catch (error) {
            throw new IError("Error al subir");
        }
}
export const updateArchive = async (file: UploadedFile, publicId: string, extensionesValidas = ['png','jpg', 'jpeg']): Promise<upload> => {
    
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1]
        const temporalName = `${uuid()}.${extension}`;
        if(!extensionesValidas.includes( extension )){
            throw new IError(`La extensión ${extension} no es permitida, ${extensionesValidas}`);
        }
        try {
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                public_id: publicId
            });
            return {
                name: temporalName,
                link: result.secure_url,
                extension: extension,
                publicId: result.public_id
            }
        } catch (error) {
            throw new IError("Error al subir");
        }
    }

export const deleteArchive = async (publicId: string) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return 'Imagen eliminada: '+ result.result;
      } catch (error) {
        throw new IError('Error al eliminar el video:', error.message);
      }
}