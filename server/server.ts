// Imports and Middleware Setup
import cors from "cors";
import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";

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
import { ItemPageController } from "./controller/ItemPageController";
import { ItemPageService } from "./services/ItemPageService";
import { OptionSlideService } from "./services/OptionSlideService";
import { OptionSlideController } from "./controller/OptionSlideController";
import { MenuIdService } from "./services/MenuService";
import { MenuController } from "./controller/MenuController";
import { CommentsController } from "./controller/CommentsController";
import { CommentService } from "./services/CommentService";
import { StripeService } from "./services/StripeService";
import { StripeController } from "./controller/StripeController";

// Database Connection Setup
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// Stripe Setup
// const stripeService = new StripeService(knex);
// const stripeController = new StripeController(stripeService);

// app.use("/stripe", stripeController.rowuter);

// Controller and Service Instantiation
const userAuthService = new UserAuthService(knex);
const userAuthController = new UserAuthController(userAuthService);
const businessAuthService = new BusinessAuthService(knex);
const businessAuthController = new BusinessAuthController(businessAuthService);
const shopService = new ShopService(knex);
const shopController = new ShopController(shopService);
const itemPageService = new ItemPageService(knex);
const itemPageController = new ItemPageController(itemPageService);
const optionSlideService = new OptionSlideService(knex);
const optionSlideController = new OptionSlideController(optionSlideService);
const menuIdService = new MenuIdService(knex);
const menuController = new MenuController(menuIdService);

// Instantiate CommentService and then CommentsController
const commentService = new CommentService(knex);
const commentsController = new CommentsController(commentService);

// Route Setup
app.use("/auth", userAuthController.router);
app.use("/auth", businessAuthController.router);
app.use("/shops", shopController.router);
app.use("/itemPage", itemPageController.router);
app.use("/itemPage", optionSlideController.router);
app.use("/menus", menuController.router);
app.use("/comments", commentsController.router); // Mount CommentsController's router at the "/comments" endpoint

app.get("/hi", (req, res) => res.send("hi"));

// Starting the Server
const PORT = 8100;
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
