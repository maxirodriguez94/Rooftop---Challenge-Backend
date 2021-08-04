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
import { compile } from "joi";
const couponSchema = require("./validates/coupon");
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

//COUPON
app.get("/coupons", (req, res) => {
  couponRepository.findAll().then((coupons) => res.send(coupons));
});

app.get("/coupons/:id", (req, res) => {
  couponRepository
    .findCode(req.params.id)
    .then((resultado) => res.send(resultado));
});

app.post("/coupons", (req, res) => {
  let code = req.body.code;
  let result = couponSchema.validate(req.body, { abortEarly: false });

  //corregir mensaje
  if (result.errocouponr) {
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

app.patch("/coupons/", async (req, res) => {
  const { email } = req.body;
  const coupon = await couponRepository.findByEmail(email);

  if (coupon) {
    return res.status(422).send();
  }
  //ver validacion errores
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
//paginate/cant tiendas
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
  console.log(store);

  if (store) {
    storeRepository
      .remove(store)
      .then(() => res.status(201).json({ message: "Store succesfull" }).send());
  } else {
    res.status(404).send();
  }
});

app.post("/stores", (req, res) => {
  storeRepository
    .saveStore(req.body)
    .then((date) =>
      res.status(200).json({ message: "Successfully created store" })
    );
});

app.listen(4538);
