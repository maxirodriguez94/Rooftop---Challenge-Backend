import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "coupons"})
export class Coupon {
    
    @PrimaryGeneratedColumn()
     id : Number

    @Column({name : "assigned_at"})
    asignedAt : Date

    @Column({
        length : 8
    })
    code : String

    @Column({name : "customer_email"})
    customerEmail : String

    @Column({name : "expires_at"})
    expireAt : Date

    @Column({name :"created_at"})
    createdAt : Date
}
