import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("images")
export default class Image {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("text")
    name: string;
    @Column("text")
    extension: string;
    @Column("text")
    link: string;
    @Column("int")
    user_id: number;
    @Column("text")
    publicId: string;
}