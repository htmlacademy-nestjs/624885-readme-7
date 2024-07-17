export function getMongoConnectionString({host, port, user, password, db, authDB}): string {
  return `mongodb://${user}:${password}@${host}:${port}/${db}?authSource=${authDB}`;
}
