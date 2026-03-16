require('dotenv').config();
const fs = require('fs/promises');
const path = require('path');
const pool = require('../config/db');

async function runSeeds() {
  const seedsDir = path.resolve(__dirname, '../../database/seeds');
  const files = (await fs.readdir(seedsDir))
    .filter((file) => file.endsWith('.sql'))
    .sort();

  if (files.length === 0) {
    console.log('No seed files found.');
    return;
  }

  const client = await pool.connect();

  try {
    for (const file of files) {
      const filePath = path.join(seedsDir, file);
      const sql = await fs.readFile(filePath, 'utf8');
      await client.query(sql);
      console.log(`Applied seed: ${file}`);
    }

    console.log('Seeding completed successfully.');
  } finally {
    client.release();
  }
}

runSeeds()
  .catch((error) => {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
