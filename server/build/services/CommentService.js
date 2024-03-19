"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
class CommentService {
    knex;
    // Remove the unnecessary property declaration
    // getCommentsByShopId: any;
    constructor(knex) {
        this.knex = knex;
    }
    table() {
        return this.knex("comment");
    }
    async createComment(shopId, transactionId, rating, description) {
        try {
            const result = await this.table().insert({ shop_id: shopId, transaction_id: transactionId, rating: rating, description: description }).returning("*");
            console.log("result", result);
            return result;
        }
        catch (error) {
            console.error("Error creating comment:", error);
            throw error;
        }
    }
    async getAllComments() {
        try {
            // Adjust the query to filter out comments with empty descriptions
            const comments = await this.table()
                .select('*')
                .andWhereNot('description', ''); // Ensure description is not empty
            return comments;
        }
        catch (error) {
            console.error("Error fetching comments by shopId:", error);
            throw error;
        }
    }
}
exports.CommentService = CommentService;
