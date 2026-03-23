/**
 * database/migrate.js
 * Runs all SQL migration files in order.
 * Usage: npm run migrate
 */

require('dotenv').config();
const { Pool } = require('pg');
const fs   = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function migrate() {
  const migrationsDir = path.join(__dirname, 'migrations');

  // Read migration files sorted alphabetically
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  console.log(`🛡️  Running ${files.length} migration(s)…`);

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql      = fs.readFileSync(filePath, 'utf8');
    console.log(`   → ${file}`);
    try {
      await pool.query(sql);
    } catch (err) {
      console.error(`   ✗ Failed on ${file}:`, err.message);
      process.exit(1);
    }
  }

  console.log('✅  Migrations complete.');
  await pool.end();
}

migrate().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
