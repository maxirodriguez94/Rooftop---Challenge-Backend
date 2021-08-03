import { Request, Response } from "express";
import { getRepository, UpdateResult, DeleteResult } from "typeorm";
import { Coupon } from "../Entities/Coupon";

export class CouponRepository {
  saveCoupon(coupon: Coupon): Promise<Coupon> {
    return getRepository(Coupon).save(coupon);
  }

  findByIdAndEmail(
    id: String,
    email: String | null
  ): Promise<Coupon | undefined> {
    return getRepository(Coupon).findOne({
      where: {
        id: id,
        customerEmail: email,
      },
    });
  }

  remove(coupon: Coupon): Promise<Coupon> {
    return getRepository(Coupon).remove(coupon);
  }

  findAll(): Promise<Coupon[]> {
    return getRepository(Coupon).createQueryBuilder("coupon").getMany();
  }

  findCode(id: String): Promise<Coupon> {
    return getRepository(Coupon).findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  findId(id: String): Promise<Coupon> {
    return getRepository(Coupon).findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  findAvailable(): Promise<Coupon | undefined> {
    return getRepository(Coupon).findOne({
      where: {
        customerEmail: null,
      },
    });
  }

  findByEmail(customerEmail: String): Promise<Coupon | undefined> {
    return getRepository(Coupon).findOne({
      where: {
        customerEmail: customerEmail,
      },
    });
  }

}
