"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports and Middleware Setup
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const knex_1 = __importDefault(require("knex"));
// Database Connection Setup
const knexConfig = require("./knexfile");
const knex = (0, knex_1.default)(knexConfig[process.env.NODE_ENV || "development"]);
const app = (0, express_1.default)();
const server = new http_1.default.Server(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"],
    },
});
app.use((0, cors_1.default)());
const StripeService_1 = require("./services/client/StripeService");
const StripeController_1 = require("./controller/client/StripeController");
// Stripe Setup
const stripeService = new StripeService_1.StripeService(knex);
const stripeController = new StripeController_1.StripeController(stripeService);
app.use("/stripe", stripeController.router);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const AuthController_1 = require("./controller/AuthController");
// Client-app
const ShopController_1 = require("./controller/client/ShopController");
const ShopService_1 = require("./services/client/ShopService");
const ItemPageController_1 = require("./controller/client/ItemPageController");
const ItemPageService_1 = require("./services/client/ItemPageService");
const OptionSlideService_1 = require("./services/client/OptionSlideService");
const OptionSlideController_1 = require("./controller/client/OptionSlideController");
const MenuService_1 = require("./services/client/MenuService");
const MenuController_1 = require("./controller/client/MenuController");
// Business-app
const MenuPreviewController_1 = require("./controller/business/MenuPreviewController");
const MenuPreviewServices_1 = require("./services/business/MenuPreviewServices");
const PromotionInfoService_1 = require("./services/business/PromotionInfoService");
const PromotionInfoController_1 = require("./controller/business/PromotionInfoController");
const DialogAddCategoryController_1 = require("./controller/business/DialogAddCategoryController");
const DialogAddCategoryService_1 = require("./services/business/DialogAddCategoryService");
const AllItemService_1 = require("./services/business/AllItemService");
const AllItemController_1 = require("./controller/business/AllItemController");
const AddItemService_1 = require("./services/business/AddItemService");
const AddItemController_1 = require("./controller/business/AddItemController");
// Both Client & Business
const AuthService_1 = require("./services/AuthService");
const ReceiptService_1 = require("./services/ReceiptService");
const ReceiptController_1 = require("./controller/ReceiptController");
const CommentsController_1 = require("./controller/CommentsController");
const CommentService_1 = require("./services/CommentService");
const OrderService_1 = require("./services/business/OrderService");
const OrderController_1 = require("./controller/business/OrderController");
const mainService_1 = require("./services/business/mainService");
const mainController_1 = require("./controller/business/mainController");
const EditShopInfoController_1 = require("./controller/business/EditShopInfoController");
const EditShopInfoService_1 = require("./services/business/EditShopInfoService");
// Controller and Service Instantiation (Client)
const userAuthService = new AuthService_1.UserAuthService(knex);
const userAuthController = new AuthController_1.UserAuthController(userAuthService);
const shopService = new ShopService_1.ShopService(knex);
const shopController = new ShopController_1.ShopController(shopService);
const itemPageService = new ItemPageService_1.ItemPageService(knex);
const itemPageController = new ItemPageController_1.ItemPageController(itemPageService);
const optionSlideService = new OptionSlideService_1.OptionSlideService(knex);
const optionSlideController = new OptionSlideController_1.OptionSlideController(optionSlideService);
const menuIdService = new MenuService_1.MenuIdService(knex);
const menuController = new MenuController_1.MenuController(menuIdService);
const receiptService = new ReceiptService_1.ReceiptService(knex);
const receiptController = new ReceiptController_1.ReceiptController(receiptService);
// Controller and Service Instantiation (Business)
const businessAuthService = new AuthService_1.BusinessAuthService(knex);
const businessAuthController = new AuthController_1.BusinessAuthController(businessAuthService);
const menuPreviewService = new MenuPreviewServices_1.MenuPreviewService(knex);
const menuPreviewController = new MenuPreviewController_1.MenuPreviewController(menuPreviewService);
const dialogAddCategoryService = new DialogAddCategoryService_1.DialogAddCategoryService(knex);
const dialogAddCategoryController = new DialogAddCategoryController_1.DialogAddCategoryController(dialogAddCategoryService);
const orderService = new OrderService_1.OrderService(knex);
const orderController = new OrderController_1.OrderController(orderService);
const mainService = new mainService_1.MainService(knex);
const mainController = new mainController_1.MainController(mainService);
// Instantiate CommentService and then CommentsController
const commentService = new CommentService_1.CommentService(knex);
const commentsController = new CommentsController_1.CommentsController(commentService);
//ForPromotionInfo
const promotionInfoService = new PromotionInfoService_1.PromotionInfoService(knex);
const promotionInfoController = new PromotionInfoController_1.PromotionInfoController(promotionInfoService);
//For AllItem
const allItemService = new AllItemService_1.AllItemService(knex);
const allItemController = new AllItemController_1.AllItemController(allItemService);
//For AddItem
const addItemService = new AddItemService_1.AddItemService(knex);
const addItemController = new AddItemController_1.AddItemController(addItemService);
//For EditShopInfo
const editShopInfoService = new EditShopInfoService_1.EditShopInfoService(knex);
const editShopInfoController = new EditShopInfoController_1.EditShopInfoController(editShopInfoService);
// Route Setup (Client & Business)
app.use("/auth", userAuthController.router);
app.use("/comments", commentsController.router);
// Route Setup (Client)
app.use("/shops", shopController.router);
app.use("/itemPage", itemPageController.router);
app.use("/itemPage", optionSlideController.router);
app.use("/menus", menuController.router);
app.use("/receipt", receiptController.router);
app.use("/initialState", itemPageController.router);
app.use("/PromotionInfo", promotionInfoController.router);
app.use("/category", dialogAddCategoryController.router);
app.use("/AllItem", allItemController.router);
app.use("/AddItem", addItemController.router);
app.get("/getmapAPI", async (req, res) => {
    const key = process.env.GOOGLE_MAP_API_KEY;
    return res.status(200).json({ key: key });
});
// Route Setup (Business)
app.use("/business/auth", businessAuthController.router);
app.use("/businessRegister", businessAuthController.router);
app.use("/menuPreviews", menuPreviewController.router);
app.use("/orders", orderController.router);
app.use("/shopopentime", businessAuthController.router);
app.use("/mainPage", mainController.router);
app.use("/EditShopInfo", editShopInfoController.router);
app.get("/hi", (req, res) => res.send("hi"));
// Starting the Server
const PORT = 8100;
server.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});
