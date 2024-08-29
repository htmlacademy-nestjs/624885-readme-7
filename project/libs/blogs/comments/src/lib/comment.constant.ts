export const CommentErrorMessage = {
  MessageIsEmpty: 'Message must be not empty',
  InvalidId: 'Author Id must be MongoId.'
} as const;

export const CommentResponseMessage = {
  CommentsFound: 'Comments found',
  CommentsNotFound: 'Comments not found',
  CommentCreated: 'Comment created'
}
