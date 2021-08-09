import { Request, Response } from "express";
import { getRepository, UpdateResult, DeleteResult } from "typeorm";
import { PaginationAwareObject } from "typeorm-pagination/dist/helpers/pagination";
import { Store } from "../Entities/Store";

const ITEMS_PER_PAGE = 10;

export class StoreRepository {
  findAll(): Promise<PaginationAwareObject> {
    return getRepository(Store).createQueryBuilder("store").paginate(ITEMS_PER_PAGE);
  }

  count():Promise<Number>{
    return getRepository(Store).count()
  }

  findByName(name: any): Promise<Store> {
    return getRepository(Store).findOneOrFail({
      where: {
        name: name,
      },
    });
  }

  remove(store: Store): Promise<Store> {
    return getRepository(Store).remove(store);
  }

  findId(id: string): Promise<Store | undefined> {
    return getRepository(Store).findOne({
      where: {
        id: id,
      },
    });
  }

  saveStore(store: Store): Promise<Store> {
    return getRepository(Store).save(store);
  }
}
