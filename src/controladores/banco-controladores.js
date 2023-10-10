const { contas, saques, depositos, transferencias} = require('../bancodedados')

const format = require('date-fns/format')

const listarContasBancarias = (req, res) => {
    res.status(201).json(contas)
}

const criarContaBancaria = (req, res) => {
    const usuario = req.body
    const numero = (contas.length + 1).toString()

    const novaConta = {
        numero,
        saldo: 0,
        usuario
    }

    contas.push(novaConta)

    return res.status(204).json()
}

const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    

    const posicao = contas.findIndex((conta) => {
        return conta.numero === numeroConta
    })

    const saldo = contas[posicao].saldo

    const contaAtualizada = {
        numero: numeroConta,
        saldo,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    contas.splice(posicao, 1, contaAtualizada)

    res.status(204).json()
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params

    const posicao = contas.findIndex((conta) => {
        return conta.numero === numeroConta
    })

    const saldo = contas[posicao].saldo

    if(saldo !== 0){
        return res.status(403).json({ mensagem: 'A conta só pode ser removida se o saldo for zero.'})
    }

    contas.splice(posicao, 1)

    res.status(204).json()

}

const depositarValor = (req, res) => {
    const { numero_conta, valor } = req.body

    const posicao = contas.findIndex((conta) => {
        return numero_conta === conta.numero
    })

    let contaDeposito = contas[posicao]

    contaDeposito.saldo += valor

    const data = format(new Date(), 'yyyy-MM-dd kk:mm:ss' )

    const dadosDeDeposito = {
        data,
        numero_conta,
        valor,
    }

    depositos.push(dadosDeDeposito)

    res.status(204).json()
}

const sacarValor = (req, res) => {
    const { numero_conta, valor } = req.body

    const posicao = contas.findIndex((conta) => {
        return conta.numero === numero_conta
    })

    let saldoDaConta = contas[posicao]

    saldoDaConta.saldo -= valor

    const data = format(new Date(), 'yyyy-MM-dd kk:mm:ss' )

    const dadosDeSaque = {
        data,
        numero_conta,
        valor,
    }

    saques.push(dadosDeSaque)

    return res.status(204).json()

}

const transferirValor = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor } = req.body

    const posicaoOrigem = contas.findIndex((conta) => {
        return conta.numero === numero_conta_origem
    })

    const posicaoDestino = contas.findIndex((conta) => {
        return conta.numero === numero_conta_destino
    })

    let saldoDaContaOrigem = contas[posicaoOrigem]
    let saldoDaContaDestino = contas[posicaoDestino]
    

    saldoDaContaOrigem.saldo -= valor
    saldoDaContaDestino.saldo += valor
    

    const data = format(new Date(), 'yyyy-MM-dd kk:mm:ss' )

    const dadosDeTransferencia = {
        data,
        numero_conta_origem,
        numero_conta_destino,
        valor,
    }

    transferencias.push(dadosDeTransferencia)

    return res.status(204).json()
    
}

const saldoConta = (req, res) => {
    const { numero_conta } = req.query

    posicaoConta = contas.findIndex((conta) => {
        return conta.numero === numero_conta
    })

    const saldo = contas[posicaoConta].saldo

    return res.status(200).json({saldo})
}

const extratoConta = (req, res) => {
    const { numero_conta } = req.query

    const depositosConta = depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta
    })

    const saquesConta = saques.filter((saque) => {
        return saque.numero_conta === numero_conta
    })

    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta
    })

    const transferenciasRecebidas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta
    })

    const extrato = {
        depositos: depositosConta,
        saques: saquesConta,
        transferenciasEnviadas,
        transferenciasRecebidas
    }

    res.status(200).json(extrato)

}

module.exports = {
    listarContasBancarias, criarContaBancaria, atualizarUsuario, excluirConta, depositarValor, sacarValor, transferirValor, saldoConta, extratoConta
}