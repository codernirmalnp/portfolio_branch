import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User as U } from "./../users/user.entity";

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column()
  public street!: string;

  @Column()
  public city!: string;

  @Column()
  public country!: string;

  @OneToOne(() => U, (user: U) => user.address)
  public user!: U;
}

export default Address;
