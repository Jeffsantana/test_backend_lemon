import "reflect-metadata";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Connection, createConnection } from 'typeorm';

// eslint-disable-next-line no-unused-vars
const undoAllMigrations = async (connection: Connection) => {
  for (let i = 0; i < connection.migrations.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await connection.undoLastMigration();
  }
  console.log('🚀 TypeORM: All migrations were undone');
};

// eslint-disable-next-line no-unused-vars
const undoLastMigration = async (connection: Connection) => {
  await connection.undoLastMigration();
  console.log('🚀 TypeORM: Last migration was undone');
};

(async () => {

  const connection = await createConnection();
  console.log('🚀 Connection', connection.isConnected);
  // undoAllMigrations(connection);
  // undoLastMigration(connection);
  await connection.runMigrations();

  console.log('🚀 TypeORM: Runned migrations');
})();
