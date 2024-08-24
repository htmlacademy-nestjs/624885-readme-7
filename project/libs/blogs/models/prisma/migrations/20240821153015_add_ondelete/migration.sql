-- DropForeignKey
ALTER TABLE "LinkPost" DROP CONSTRAINT "LinkPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "photo_post" DROP CONSTRAINT "photo_post_postId_fkey";

-- DropForeignKey
ALTER TABLE "quote_post" DROP CONSTRAINT "quote_post_postId_fkey";

-- DropForeignKey
ALTER TABLE "text_post" DROP CONSTRAINT "text_post_postId_fkey";

-- DropForeignKey
ALTER TABLE "video_post" DROP CONSTRAINT "video_post_postId_fkey";

-- AddForeignKey
ALTER TABLE "video_post" ADD CONSTRAINT "video_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_post" ADD CONSTRAINT "text_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_post" ADD CONSTRAINT "quote_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_post" ADD CONSTRAINT "photo_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkPost" ADD CONSTRAINT "LinkPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
