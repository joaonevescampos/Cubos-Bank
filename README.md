# Cubos Bank
## Descrição
Este é um projeto back-end de um banco digital. Foi criada uma API RESTfull que permitiu:

- [x] Criar conta bancária
- [x] Listar contas bancárias
- [x] Atualizar os dados do usuário da conta bancária
- [x] Excluir uma conta bancária
- [x] Depósitar em uma conta bancária
- [x] Sacar de uma conta bancária
- [x] Transferir valores entre contas bancárias
- [x] Consultar saldo da conta bancária
- [x] Emitir extrato bancário

## Preview do projeto
<p>No Insomnia, é possível testar os endpoints da aplicação. Confira a visualização do projeto funcionando.</p>

![print - cubos bank](https://github.com/joaonevescampos/hotel-campos/assets/126534395/6bc7d985-5002-4d15-8aa0-0c631bbd16c2)

## Pré-requisitos
node v18.17.0+

## Tecnologias utilizadas
- VS Code
- Node JS
- Nodemon
- Express
- Date FNS
- Insomnia

## Execução
1. Clonar este repositório: `git clone git@github.com:joaonevescampos/cubos-bank.git`
2. Entrar na pasta do projeto: `cd \cubos-bank\`
3. Instalar pacote NPM: `npm install`
4. Executar o projeto: `npm run dev`
5. Testar os endpoints pelo Insomnia usando a porta 3000. Baixe o app para Windows: https://insomnia.rest/download

- Listar contas: `GET` `/contas?senha_banco=Cubos123Bank`
  #### OBS: Tem que ser exatamente esta senha para ter acesso a lista de contas.
  
- Criar conta: `POST` `/contas`
  Exemplo de requisição:
  ```
  {
	"nome": "Foo Bar",
	"cpf": "00011122233",
	"data_nascimento": "2021-03-15",
	"telefone": "71999998888",
	"email": "foo@bar.com",
	"senha": "123456"
  }
  ```
  
- Editar conta: `PUT` `/contas/:numeroConta/usuario`
- Excluir conta: `DELETE` `/contas/:numeroConta`
- Depositar: `POST` `/transacoes/depositar`
  Exemplo de requisição:
  ```
  {
	"numero_conta": "1",
	"valor": 1900
  }
  ```
  #### OBS: O valor a ser informado tem que ser sempre em centavos.
  
- Sacar: `POST` `/transacoes/sacar`
  Exemplo de requisição:
  ```
  {
	"numero_conta": "1",
	"valor": 1900,
	"senha": "123456"
  }
  ```

- Transferir: `POST` `/transacoes/transferir`
  Exemplo de requisição:
  ```
  {
	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 200,
	"senha": "123456"
  }
  ```
  
- Ver saldo: `GET` `/contas/saldo?numero_conta=1&senha=123456`
- Ver extrato: `GET` `/contas/extrato?numero_conta=1&senha=123456`

## Autoria
- Autor: João Victor Neves Campos de Jesus
- Empresa Associada: Cubos Academy

## Contato
- e-mail: joaon.c.jv@gmail.com
- [LinkedIn](inkedin.com/in/joão-victor-neves-campos-de-jesus-415946180/)
- WhatsApp: (61)98248-1039
