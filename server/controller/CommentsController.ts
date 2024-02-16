// CommentsController.ts
import express from 'express';
import { CommentService } from '../services/CommentService';

export class CommentsController {
  public router = express.Router();

  constructor(private commentService: CommentService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/rating', this.createComment.bind(this));
  }

  private async createComment(req: express.Request, res: express.Response) {
    const { rating, description } = req.body;
    console.log("Rating:", rating);
    try {
      // Call the createComment method on the commentService
      const result = await this.commentService.createComment({ rating, description });
      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}  