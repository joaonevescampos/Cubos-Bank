const { listarContasBancarias, criarContaBancaria, atualizarUsuario, excluirConta, depositarValor, sacarValor, transferirValor, saldoConta, extratoConta } = require('./controladores/banco-controladores')
const { verificadorSenhaBanco, verificadorContaExistente, verificadorNumero, verificadorDeposito, verificadorSaque, verificadorTransferencia, verificadorQueryNumero, verificadorSenhaConta } = require('./intermediarios')
const express = require('express')
const app = express()

app.use(express.json())

app.get('/contas', verificadorSenhaBanco, listarContasBancarias)

app.post('/contas', verificadorContaExistente, criarContaBancaria)

app.put('/contas/:numeroConta/usuario', verificadorNumero, verificadorContaExistente, atualizarUsuario)

app.delete('/contas/:numeroConta', verificadorNumero, excluirConta)

app.post('/transacoes/depositar', verificadorDeposito, depositarValor)

app.post('/transacoes/sacar', verificadorSaque, sacarValor)

app.post('/transacoes/transferir', verificadorTransferencia, transferirValor)

app.get('/contas/saldo', verificadorQueryNumero, verificadorSenhaConta, saldoConta)

app.get('/contas/extrato', verificadorQueryNumero, verificadorSenhaConta, extratoConta)

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})

module.exports = {
    app
}