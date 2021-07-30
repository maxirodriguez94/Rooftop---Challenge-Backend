import { Request, Response } from "express";
import { getRepository, UpdateResult, DeleteResult } from "typeorm";
import { Coupon } from "../Entities/Coupon";

export class CouponRepository {
  saveCoupon(coupon: Coupon): Promise<Coupon> {
    return getRepository(Coupon).save(coupon);
  }

  findEmail(customerEmail: String): Promise<Coupon> {
    return getRepository(Coupon).findOneOrFail({
      where: {
        customerEmail: customerEmail,
      },
    });
  }
}
