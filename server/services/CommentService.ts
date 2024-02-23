import { Knex } from "knex";

export class CommentService {
  static createComment: any;
  constructor(private knex: Knex) {}

  table() {
    // Change the table name to "project_coffee"
    return this.knex("comment");
  }

  async createComment(shopId:number, transactionId: number,rating: number, description: string)  {
    try {
      let result = await this.table().insert({ shop_id:shopId, transaction_id:transactionId, rating:rating, description:description }).returning("*");

      console.log("result", result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async addItem(rating: number, description: string) {
    try {
      // Insert new item into the "project_coffee" table
      await this.table().insert({ rating, description });

      console.log("Item added successfully");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
