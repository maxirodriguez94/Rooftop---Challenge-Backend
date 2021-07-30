import express from "express";
import "reflect-metadata";
import { Connection, createConnection, getRepository } from "typeorm";
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

app.post("/coupon", (req, res) => {
  let code = req.body.code
  let result = couponSchema.validate(req.body, { abortEarly: false });

  //corregir mensaje de error
  if (result.error) {
    return res.status(422).json(result);
  }
  couponRepository
    .saveCoupon(req.body)
    .then((resultado) => res.send(code));
    
});

app.listen(5005);
