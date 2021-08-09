import express from "express";
import "reflect-metadata";
import {
  Connection,
  createConnection,
  getRepository,
  Repository,
} from "typeorm";
import { Coupon } from "./Entities/Coupon";
import { CouponRepository } from "./Repositories/CouponRepository";
import { Store } from "./Entities/Store";
import { StoreRepository } from "./Repositories/StoreRepository";
import { compile, date, string } from "joi";
const couponSchema = require("./Validates/Coupon/code");
const storeSchema = require("./Validates/Store/store");
import { pagination } from "typeorm-pagination";
import { json } from "body-parser";
const boom = require("@hapi/boom");
var bodyParser = require("body-parser");

const couponRepository = new CouponRepository();
const storeRepository = new StoreRepository();

createConnection()
  .then((connection) => {})
  .catch((error) => console.log(error));

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(pagination);

//COUPON
app.get("/coupons", (req, res) => {
  const code = req.query.code;
  const customerEmail = req.query.customerEmail;

  if (code && customerEmail) {
    couponRepository
      .findCodeByCustomerEmail(code, customerEmail)
      .then((coupon) => res.send(coupon))
      .catch((err) => {
        res.status(404).json({ message: "error" });
      });
  } else {
    couponRepository.findAll().then((coupons) => res.send(coupons));
  }
});

app.post("/coupons", async (req, res) => {
  let code = req.body.code;
  let result = couponSchema.validate(req.body, { abortEarly: false });

  //corregir mensaje
  if (result.error) {
    return res.status(422).json(result);
  }
  couponRepository.saveCoupon(req.body).then((resultado) => res.send(code));
});

app.delete("/coupons/:id", async (req, res) => {
  let coupon = await couponRepository.findByIdAndEmail(req.params.id, null);

  if (coupon instanceof Coupon) {
    couponRepository
      .remove(coupon)
      .then(() =>
        res.status(201).json({ message: "Coupon succesfully deleted" }).send()
      );
  } else {
    res.status(404).send();
  }
});

app.patch("/coupons", async (req, res) => {
  const { email } = req.body;
  const coupon = await couponRepository.findByEmail(email);

  if (coupon) {
    return res.status(422).send();
  }

  const availableCoupon = await couponRepository.findAvailable();
  if (availableCoupon) {
    availableCoupon.customerEmail = email;
    await couponRepository.saveCoupon(availableCoupon);
    return res
      .status(201)
      .json({ message: "Coupon assigned", couponCode: availableCoupon.code });
  }
  res.status(422).json({ message: "No available coupons" });
});

//STORES
app.get("/stores/:name?", (req, res) => {
  if (req.params.name)
    storeRepository
      .findName(req.params.name)
      .then((resultado) => res.send(resultado))
      .catch((err) => {
        res.send({ message: "error" });
      });
  storeRepository.findAll().then((stores) => res.send(stores));
});

app.delete("/stores/:id", async (req, res) => {
  let store = await storeRepository.findId(req.params.id);
  if (store) {
    storeRepository
      .remove(store)
      .then(() => res.status(201).json({ message: "Store succesfull" }).send());
  } else {
    res.status(404).send();
  }
});

app.post("/stores", (req, res) => {
  let result = storeSchema.validate(req.body, { abortEarly: false });
  if (result.error) {
    return res.status(422).json(result);
  }
  storeRepository
    .saveStore(req.body)
    .then((date) =>
      res.status(200).json({ message: "Successfully created store" })
    );
});

app.get("/stats", async (req, res) => {
  const totalCoupon = await couponRepository.totalCount();
  const assignedCount = await couponRepository.assignedCount();
  const notAssignedCount = await couponRepository.notAssignedCount();
  const groupedByCreated = await couponRepository.groupByCreatedAt();
  const groupedByAssgined = await couponRepository.groupByAssignedAt();

  res.json({
    totalCoupon,
    assignedCount,
    notAssignedCount,
    groupedByCreated,
    groupedByAssgined,
  });
});

app.listen(5951);
