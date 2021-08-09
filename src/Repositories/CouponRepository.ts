import { Request, Response } from "express";
import {
  getRepository,
  UpdateResult,
  DeleteResult,
  IsNull,
  Not,
} from "typeorm";
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

  findCodeByCustomerEmail(code: any, customerEmail: any): Promise<Coupon> {
    return getRepository(Coupon).findOneOrFail({
      where: {
        code: code,
        customerEmail: customerEmail,
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

  findAll(): Promise<Coupon[]> {
    return getRepository(Coupon).createQueryBuilder("coupon").getMany();
  }

  totalCount(): Promise<number> {
    return getRepository(Coupon).count();
  }

  assignedCount(): Promise<number> {
    return getRepository(Coupon).count({
      where: {
        customerEmail: Not(IsNull()),
      },
    });
  }

  notAssignedCount(): Promise<number> {
    return getRepository(Coupon).count({
      where: {
        customerEmail: IsNull(),
      },
    });
  }

  groupByCreatedAt(): Promise<any[]> {
    return getRepository(Coupon)
      .createQueryBuilder("coupon")
      .select("DATE(coupon.createdAt), COUNT(*)")
      .groupBy("1")
      .getRawMany();
  }

  groupByAssignedAt(): Promise<any[]> {
    return getRepository(Coupon)
      .createQueryBuilder("coupon")
      .select("DATE(coupon.asignedAt), COUNT(*)")
      .where("coupon.asignedAt IS NOT NULL")
      .groupBy("1")
      .getRawMany();
  }
}
