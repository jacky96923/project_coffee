// Imports and Middleware Setup
import cors from "cors";
import express from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";
import Knex from "knex";

// Database Connection Setup
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

const app = express();
const server = new http.Server(app);
const io = new SocketIO(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
  },
});

app.use(cors());
import { StripeService } from "./services/StripeService";
import { StripeController } from "./controller/StripeController";
// Stripe Setup
const stripeService = new StripeService(knex);
const stripeController = new StripeController(stripeService);

app.use("/stripe", stripeController.router);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import {
  BusinessAuthController,
  UserAuthController,
} from "./controller/AuthController";

// Client-app
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

// Business-app
import { BusinessAuthService, UserAuthService } from "./services/AuthService";
import { MenuPreviewController } from "./controller/MenuPreviewController";
import { MenuPreviewService } from "./services/MenuPreviewServices";
import { PromotionInfoService } from "./services/PromotionInfoService";
import { PromotionInfoController } from "./controller/PromotionInfoController";
import { DialogAddCategoryController } from "./controller/DialogAddCategoryController";
import { DialogAddCategoryService } from "./services/DialogAddCategoryService";
import { ReceiptService } from "./services/ReceiptService";
import { ReceiptController } from "./controller/ReceiptController";

// Controller and Service Instantiation (Client)
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
const receiptService = new ReceiptService(knex);
const receiptController = new ReceiptController(receiptService);

// Controller and Service Instantiation (Client)
const menuPreviewService = new MenuPreviewService(knex);
const menuPreviewController = new MenuPreviewController(menuPreviewService);

const dialogAddCategoryService = new DialogAddCategoryService(knex);
const dialogAddCategoryController = new DialogAddCategoryController(
  dialogAddCategoryService
);

// Instantiate CommentService and then CommentsController
const commentService = new CommentService(knex);
const commentsController = new CommentsController(commentService);

//ForPromotionInfo
const promotionInfoService = new PromotionInfoService(knex);
const promotionInfoController = new PromotionInfoController(
  promotionInfoService
);

// Route Setup
// Route Setup (Client)
app.use("/auth", userAuthController.router);

app.use("/shops", shopController.router);
app.use("/itemPage", itemPageController.router);
app.use("/itemPage", optionSlideController.router);
app.use("/menus", menuController.router);
app.use("/receipt", receiptController.router);
app.use("/comments", commentsController.router); // Mount CommentsController's router at the "/comments" endpoint
app.use("/initialState", itemPageController.router);
app.use("/menuPreviews", menuPreviewController.router);
app.use("/PromotionInfo", promotionInfoController.router);
app.use("/category", dialogAddCategoryController.router);

// Route Setup (Business)
app.use("/business/menuPreviews", menuPreviewController.router);
app.use("/business/auth", businessAuthController.router);
app.use("/businessRegister", businessAuthController.router);

app.get("/hi", (req, res) => res.send("hi"));

// Starting the Server
const PORT = 8100;
server.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
