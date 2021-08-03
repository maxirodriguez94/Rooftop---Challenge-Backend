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
const couponSchema = require("./validates/coupon");
const boom = require("@hapi/boom");
var bodyParser = require("body-parser");

const couponRepository = new CouponRepository();

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

app.get("/", (req, res) => {
  res.send("ok");
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

app.listen(9119);
