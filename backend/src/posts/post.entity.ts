import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public title!: string;

  @Column()
  public content!: string;

  @Column()
  public image!: string;

  // Add this column to your entity!
  @DeleteDateColumn()
  deletedAt?: Date;
}
