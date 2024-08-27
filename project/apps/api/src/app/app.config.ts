export enum ApplicationServiceURL {
  Blogs = 'http://localhost:3001/api/posts',
  Files = 'http://localhost:3002/api/files',
  Notify = 'http://localhost:3003/api/notifications',
  Users = 'http://localhost:3004/api/auth',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 3000;
