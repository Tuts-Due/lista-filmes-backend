const pool = require('../config/database');
const Usuario = require('../models/Usuario');

const EMAIL_TESTE = 'teste@teste.com';
const SENHA_TESTE = 'teste123';
const NOME_TESTE = 'Usuário Teste';

async function seed() {
  try {
    const existente = await Usuario.buscarPorEmail(EMAIL_TESTE);

    if (existente) {
      console.log('Usuário de teste já existe:', EMAIL_TESTE);
    } else {
      await Usuario.criar(NOME_TESTE, EMAIL_TESTE, SENHA_TESTE);
      console.log('Usuário de teste criado com sucesso.');
    }

    console.log(`Email: ${EMAIL_TESTE}`);
    console.log(`Senha: ${SENHA_TESTE}`);

    await pool.end();
    process.exit(0);
  } catch (erro) {
    console.error('Erro ao criar usuário de teste:', erro.message);
    process.exit(1);
  }
}

seed();
