import { Request, Response } from "express";
import { getRepository, UpdateResult, DeleteResult } from "typeorm";
import { PaginationAwareObject } from "typeorm-pagination/dist/helpers/pagination";
import { Store } from "../Entities/Store";

export class StoreRepository {
  findAll(): Promise<PaginationAwareObject> {
    return getRepository(Store).createQueryBuilder("store").paginate(10);
  }

  findName(name?: String): Promise<Store> {
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
