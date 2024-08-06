-- CreateTable
CREATE TABLE "video_post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "video_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "announce" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "text_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_post" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "quote_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_post" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "photo_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkPost" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT,
    "postId" TEXT NOT NULL,

    CONSTRAINT "LinkPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "video_post_postId_key" ON "video_post"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "text_post_postId_key" ON "text_post"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "quote_post_postId_key" ON "quote_post"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "photo_post_postId_key" ON "photo_post"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "LinkPost_postId_key" ON "LinkPost"("postId");

-- AddForeignKey
ALTER TABLE "video_post" ADD CONSTRAINT "video_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_post" ADD CONSTRAINT "text_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_post" ADD CONSTRAINT "quote_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_post" ADD CONSTRAINT "photo_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkPost" ADD CONSTRAINT "LinkPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
