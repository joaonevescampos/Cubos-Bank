const { contas } = require('./bancodedados')

const verificadorSenhaBanco = (req, res, next) => {
    const { senha_banco } = req.query
    if(!senha_banco){
        return res.status(400).json({ mensagem: 'Senha não informada. Favor colocar senha!'})
    }
    if (senha_banco !== 'Cubos123Bank'){
        return res.status(401).json({ mensagem: 'Senha inválida. Tente novamente.'})
    }
    next()  
}

const verificadorContaExistente = (req, res, next) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body
    
    if(!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Falta de dados. Todos dados são obrigatórios."})
    }

    const existeConta = contas.some((conta) => {
        return conta.usuario.cpf === cpf || conta.usuario.email === email
    })

    if(existeConta){
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!'})
    }

    next()

}

const verificadorNumero = (req, res, next) => {
    const { numeroConta } = req.params

    const existeNumero = contas.some((conta) => {
        return conta.numero === numeroConta
    })

    if(!existeNumero){
        return res.status(404).json({ mensagem: 'Número não encontrado na base de dados.'})
    }

    next()
}

const verificadorDeposito = (req, res, next) => {
    const { numero_conta, valor } = req.body

    if(!numero_conta || !valor){
        return res.status(400).json({ mensagem: 'O número da conta e o valor (positivo) são obrigatórios!'})
    }

    if(!Number.isInteger(valor) || valor <= 0){
        return res.status(400).json({ mensagem: 'O depósito tem que ser um número inteiro positivo em centavos.'})
    }

    const existeConta = contas.some((conta) => {
        return conta.numero === numero_conta
    })

    if(!existeConta){
        return res.status(404).json({ mensagem: 'Conta não foi encontrada na base de dados.'})
    }

    next()
}

const verificadorSaque = (req, res, next) => {
    const { numero_conta, valor, senha } = req.body

    if(!numero_conta || !valor || !senha){
        return res.status(400).json({ mensagem: 'O número da conta, o valor e senha são obrigatórios!'})
    }

    if(!Number.isInteger(valor) || valor <= 0){
        return res.status(400).json({ mensagem: 'O saque tem que ser um número inteiro positivo em centavos.'})
    }

    const existeConta = contas.some((conta) => {
        return conta.numero === numero_conta
    })

    if(!existeConta){
        return res.status(404).json({ mensagem: 'Conta não foi encontrada na base de dados.'})
    }

    const senhaCorreta = contas.some((conta) => {
        return conta.usuario.senha === senha
    })

    if(!senhaCorreta){
        return res.status(401).json({mensagem : 'Senha incorreta! Tente novamente.'})
    }

    const posicao = contas.findIndex((conta) => {
        return conta.numero === numero_conta
    })

    const saldoDaConta = contas[posicao].saldo

    if(saldoDaConta < valor){
        return res.status(403).json({ mensagem: 'Não há esse valor no saldo para ser sacado.'})
    }

    next()
}

const verificadorTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    if(!numero_conta_origem || !numero_conta_destino || !valor || !senha){
        return res.status(400).json({ mensagem: 'O número da conta de origem, conta de destino, o valor e senha são obrigatórios!'})
    }

    if(!Number.isInteger(valor) || valor <= 0){
        return res.status(400).json({ mensagem: 'O saque tem que ser um número inteiro positivo em centavos.'})
    }

    const existeContaOrigem = contas.some((conta) => {
        return conta.numero === numero_conta_origem
    })

    const existeContaDestino = contas.some((conta) => {
        return conta.numero === numero_conta_destino
    })

    if(!existeContaOrigem || !existeContaDestino){
        return res.status(404).json({ mensagem: 'Conta não foi encontrada na base de dados.'})
    }

    if(numero_conta_destino === numero_conta_origem){
        return res.status(400).json({ mensagem: 'A conta de origem não pode ser igual a de destino.'})
    }

    const senhaCorreta = contas.some((conta) => {
        return conta.usuario.senha === senha
    })

    if(!senhaCorreta){
        return res.status(401).json({mensagem : 'Senha incorreta! Tente novamente.'})
    }

    const posicao = contas.findIndex((conta) => {
        return conta.numero === numero_conta_origem
    })

    const saldoDaContaOrigem = contas[posicao].saldo

    if(saldoDaContaOrigem < valor){
        return res.status(403).json({ mensagem: 'Não há esse valor no saldo de origem para ser transferido.'})
    }

    next()
}

const verificadorQueryNumero = (req, res, next) => {
    const { numero_conta } = req.query

    const existeNumero = contas.some((conta) => {
        return conta.numero === numero_conta
    })

    if(!existeNumero){
        return res.status(404).json({ mensagem: 'Número da Conta não encontrado na base de dados.'})
    }

    next()
}

const verificadorSenhaConta = (req, res, next) => {
    const { senha, numero_conta } = req.query

    const posicaoConta = contas.findIndex((conta) => {
        return conta.numero === numero_conta
    })

    const senhaConta = contas[posicaoConta].usuario.senha

    if(!senha){
        return res.status(400).json({ mensagem: 'Senha não informada. Favor colocar senha!'})
    }
    if (senha !== senhaConta){
        return res.status(401).json({ mensagem: 'Senha inválida. Tente novamente.'})
    }
    next()  
}

module.exports = {
    verificadorSenhaBanco, verificadorContaExistente, verificadorNumero, verificadorDeposito, verificadorSaque, verificadorTransferencia, verificadorQueryNumero, verificadorSenhaConta
}