import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import Knex from "knex";
import {
  BusinessAuthController,
  UserAuthController,
} from "./controller/AuthController";
import { BusinessAuthService, UserAuthService } from "./services/AuthService";
import { ShopController } from "./controller/ShopController";
import { ShopService } from "./services/ShopService";
import { MenuIdService } from "./services/MenuService";
import { MenuController } from "./controller/MenuController";

const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

const PORT = 8100;

const userAuthService = new UserAuthService(knex);
const userAuthController = new UserAuthController(userAuthService);
const businessAuthService = new BusinessAuthService(knex);
const businessAuthController = new BusinessAuthController(businessAuthService);
const shopService = new ShopService(knex);
const shopController = new ShopController(shopService);
const menuIdService = new MenuIdService(knex);
const menuController = new MenuController(menuIdService);

app.use("/auth", userAuthController.router);
app.use("/auth", businessAuthController.router);
app.use("/shops", shopController.router);
app.use("/menus", menuController.router);

app.get("/hi", (req, res) => res.send("hi"));

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});

// let Holidays = require("date-holidays");
// let hd = new Holidays("HK");
// console.log(hd.getHolidays(2024));
