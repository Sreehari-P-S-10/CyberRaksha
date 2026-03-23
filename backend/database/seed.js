/**
 * database/seed.js
 * Runs all seed SQL files in order.
 * Usage: npm run seed
 *
 * Run migrations first: npm run migrate
 */

require('dotenv').config();
const { Pool } = require('pg');
const fs   = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function seed() {
  const seedsDir = path.join(__dirname, 'seeds');

  const files = fs.readdirSync(seedsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  console.log(`🌱  Running ${files.length} seed file(s)…`);

  for (const file of files) {
    const filePath = path.join(seedsDir, file);
    const sql      = fs.readFileSync(filePath, 'utf8');
    console.log(`   → ${file}`);
    try {
      await pool.query(sql);
    } catch (err) {
      console.error(`   ✗ Failed on ${file}:`, err.message);
      process.exit(1);
    }
  }

  console.log('✅  Seeding complete.');
  await pool.end();
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
