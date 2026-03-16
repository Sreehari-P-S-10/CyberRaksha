require('dotenv').config();
const fs = require('fs/promises');
const path = require('path');
const pool = require('../config/db');

async function runMigrations() {
  const migrationsDir = path.resolve(__dirname, '../../database/migrations');
  const files = (await fs.readdir(migrationsDir))
    .filter((file) => file.endsWith('.sql'))
    .sort();

  if (files.length === 0) {
    console.log('No migration files found.');
    return;
  }

  const client = await pool.connect();

  try {
    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = await fs.readFile(filePath, 'utf8');
      await client.query(sql);
      console.log(`Applied migration: ${file}`);
    }

    console.log('Migrations completed successfully.');
  } finally {
    client.release();
  }
}

runMigrations()
  .catch((error) => {
    console.error('Migration failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
