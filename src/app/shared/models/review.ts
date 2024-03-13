import { User } from "./user";

export class Review {
  id: number;
  comment: string;
  rating: number;
  date: Date;
  user: User;

  constructor(review:any){
    this.id = review.id || 0;
    this.comment = review.comment || '';
    this.rating = review.rating || 0;
    this.date = review.date || new Date();
    this.user = review.user || new User({});
  }
}
