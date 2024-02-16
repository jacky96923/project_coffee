import { Knex } from "knex";

export class CommentService {
  static createComment: any;
  constructor(private knex: Knex) {}

  table() {
    // Change the table name to "project_coffee"
    return this.knex("comment");
  }

  async createComment(comment: { rating: number; description: string })  {
    try {
      let result = await this.table().insert({ rating:comment.rating, description:comment.description }).returning("*");

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
