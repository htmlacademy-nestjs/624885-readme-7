import { PostType, PrismaClient } from '@prisma/client';

const FIRST_TAG_UUID = '39614113-7ad5-45b6-8093-06455437e1e2';
const SECOND_TAG_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

const FIRST_COMMENT_UUID = '34be3ea7-dc89-410d-b5e4-db6b1d0b3565';
const SECOND_COMMENT_UUID = 'b8550a94-3a06-456c-b8e7-8901a5555375';

function getTags() {
  return [
    {
      id: FIRST_TAG_UUID,
      title: 'cats'
    },
    {
      id: SECOND_TAG_UUID,
      title: 'dogs'
    }
  ]
}

function getComments() {
  return [
    {
      id: FIRST_COMMENT_UUID,
      text: 'This is great!!!',
      authorId: FIRST_USER_ID,
      post: {
        connect: { id: SECOND_POST_UUID }
      }
    },
    {
      id: SECOND_COMMENT_UUID,
      text: 'Cool stuff',
      authorId: SECOND_USER_ID,
      post: {
        connect: { id: FIRST_POST_UUID }
      }
    }
  ]
}

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      authorId: FIRST_USER_ID,
      isDraft: false,
      type: PostType.TEXT,
      tags: {
        connect: [
          { id: FIRST_TAG_UUID }
        ]
      },
      comments: {
        connect: [
          { id: SECOND_COMMENT_UUID }
        ]
      },
      likes: undefined
    },
    {
      id: SECOND_POST_UUID,
      authorId: SECOND_USER_ID,
      isDraft: false,
      type: PostType.VIDEO,
      tags: {
        connect: [
          { id: FIRST_TAG_UUID },
          { id: SECOND_TAG_UUID }
        ]
      },
      comments: {
        connect: [
          { id: FIRST_COMMENT_UUID }
        ]
      },
      likes: undefined
    }
  ]
}

async function seedDB(prismaClient:PrismaClient) {
  const mockTags = getTags();
  console.log(mockTags);
  for (const tag of mockTags) {
    await prismaClient.tag.upsert({
      where: { id: tag.id },
      update: {},
      create: {
        id: tag.id,
        title: tag.title,
      }
    });
  }

  const mockComments = getComments();
  for (const comment of mockComments) {
    await prismaClient.comment.upsert({
      where: { id: comment.id },
      update: {},
      create: {
        id: comment.id,
        text: comment.text,
        authorId: comment.authorId,
        post: comment.post
      }
    })
  }

  const mockPosts = getPosts();
  for(const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        id: post.id,
        authorId: post.authorId,
        isDraft: post.isDraft,
        type: post.type,
        tags: post.tags,
        comments: post.comments,
        likes: post.likes,
        updatedAt: new Date()
      }
    })
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDB(prismaClient);
    globalThis.process.exit(0);
  } catch(error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    prismaClient.$disconnect();
  }
}

bootstrap();
