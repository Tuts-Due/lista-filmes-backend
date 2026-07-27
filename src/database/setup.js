const pool = require('../config/database');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  try {
    console.log('Iniciando setup do banco de dados...');

    const sqlFile = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    await pool.query(sql);
    console.log('✓ Banco de dados inicializado com sucesso!');

    process.exit(0);
  } catch (erro) {
    console.error('✗ Erro ao inicializar banco de dados:', erro.message);
    process.exit(1);
  }
}

setupDatabase();
