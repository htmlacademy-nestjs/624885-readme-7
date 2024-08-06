export interface Comment {
  id?: string;
  text: string;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
  postId: string;
}
