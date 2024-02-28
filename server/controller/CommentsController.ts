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
    this.router.get('/all', this.getAllComments.bind(this));

    // New route
  }

  private async createComment(req: express.Request, res: express.Response) {
    const { shopId, transactionId, rating, description } = req.body;
    console.log("Rating:", rating);
    try {
      const result = await this.commentService.createComment(shopId, transactionId, rating, description);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  private async getAllComments(req: express.Request, res: express.Response) {
    try {
      const comments = await this.commentService.getAllComments();
      res.status(200).json(comments);
    } catch (error) {
      console.error("Error fetching all comments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
  }

