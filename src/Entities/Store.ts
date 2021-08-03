import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "stores"})
export class Store {

  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: String;

  @Column()
  address : String;

}
