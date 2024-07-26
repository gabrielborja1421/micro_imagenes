import { ContentData } from "../repository/image.repository";

export default class Image
{
    private id?: number = 0;
    private name: string;
    private extension: string;
    private link: string;
    private user_id: number;
    private publicId: string;

    constructor(data: ContentData)
    {
        this.name = data.name;
        this.extension = data.extension;
        this.link = data.link;
        this.user_id = data.user_id;
        this.publicId = data.publicId;
    }

    get properties()
    {
        return {
            id: this.id,
            name: this.name,
            extension: this.extension,
            link: this.link,
            user_id: this.user_id,
            publicId: this.publicId
        }
    }
}