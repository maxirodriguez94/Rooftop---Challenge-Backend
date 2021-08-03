import {Request, Response} from "express";
import { getRepository, UpdateResult, DeleteResult } from "typeorm";
import { Store } from "../Entities/Store"

export class StoreRepository {
findAll(): Promise<Store[]> {
    return getRepository(Store).createQueryBuilder("store").getMany();
}

}