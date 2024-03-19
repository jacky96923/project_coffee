"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
// CommentsController.ts
const express_1 = __importDefault(require("express"));
class CommentsController {
    commentService;
    router = express_1.default.Router();
    constructor(commentService) {
        this.commentService = commentService;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/rating', this.createComment.bind(this));
        this.router.get('/all', this.getAllComments.bind(this));
        // New route
    }
    async createComment(req, res) {
        const { shopId, transactionId, rating, description } = req.body;
        console.log("Rating:", rating);
        try {
            const result = await this.commentService.createComment(shopId, transactionId, rating, description);
            res.status(201).json(result);
        }
        catch (error) {
            console.error("Error creating comment:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    async getAllComments(req, res) {
        try {
            const comments = await this.commentService.getAllComments();
            res.status(200).json(comments);
        }
        catch (error) {
            console.error("Error fetching all comments:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.CommentsController = CommentsController;
