export function getMongoConnectionString({host, port, user, password, db}): string {
  return `mongodb://${user}:${password}@${host}:${port}/${db}`;
}
