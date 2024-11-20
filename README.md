# API RESTful AdonisJS 6 com autenticação JWT + MYSQL

Este projeto é uma API RESTful construída com AdonisJS 6, apresentando signup, login, autenticação de usuário usando JWT, com bancco de dados MYSQL . A API também inclui endpoints para gerenciamento de clientes, produtos e vendas.

---

## Features

- Autenticação de usuário com JWT Personalizado.
- Terminais seguros de inscrição e login.
- Operações CRUD para clientes, produtos e vendas.
- Middleware para proteger rotas.
- Totalmente tipado com TypeScript.
- Seeders para preencher o banco de dados com dados iniciais.
- Validators: Vine

---

## Requirements

- Node.js (version >= 20)
- npm
- MySQL

**OBS.: Seu Node precisa estar atualizado para alguma versão acima de 20**

---

## Instalação

1. Clone o repositório e acesse o diretório

```bash
git clone https://github.com/JadsonMattos/backend-api-adonis.git
cd backend-api-adonis
```

2: Configure suas variáveis de ambiente (faremos isso renomeando o arquivo .env.example para .env).
    - **IMPORTANTE**: coloque uma senha de sua preferência em DB_PASSWORD=sua_senha

```bash
mv .env.example .env
```

3: Rode o container adicional para o banco de dados para usar com docker-compose.

```bash
docker-compose up -d
```

4: Instale as dependências.

```bash
npm install
```

5: Rode as migrations:

```bash
node ace migration:run
```

6: Rode os seeders (Opcional para ter alguns exemplos básicos)

```bash
node ace db:seed
```

7: Inicie a API (o padrão é localhost/3333)

```bash
npm run dev
```

- Comando opcional se quiser resetar o banco de dados:

```bash
node ace migration:rollback
```

em seguida, continue a partir do passo 5.

## Instruções para não ficar preso

- Use Postman, Insomnia ou ThunderClient para fazer as requisições.
- Rotas: /signup, /login, /, /clients, /products, /sales.
- Você pode tentar acessar qualquer rota, mas não vai conseguir. Alô hackers.
- Para começar a brincar nas rotas, você terá que fazer POST com email e password para /signup semelhante ao exemplo a seguir:

```json
{
    "email: "teste@teste.com",
    "password": "meSelecionaRecrutador!"
}
```

- Então, você terá que fazer um POST para /login com as mesmas informações, retornará um token.
- Então, você terá que ir em headers e acrescentar ao cabeçalho com check: a seguir exemplo fictício.


```bash
Authorization          Bearer lhdgaukshvkanva.fvhnakvbksfvak.vkajdnvk.asdbvkabdvk.abva
```

- Por fim, agora você pode fazer um GET para / e irá retornar suas informações de usuário e somente assim você conseguirá fazer operações como GET, POST, PUT, DELETE, SOFTDELETE nas outras rotas.

---

## Estrutura dos Requisitos + atributos adicionais + considerações

1. A elaboração do projeto contém as seguintes rotas:
    - /signup: cadastro de usuário
    - /login: login com criação de autenticação JWT
    - /clients: é possível listar dotos clientes cadastrados com dados principais, ordenação por ID, detalhes do cliente e vendas a ele atribuídos, as vendas mais recentes estão vindo primeiro, filtro de vendas por mês e ano, adicionar um novo cliente, atualizar um cliente, deletar um cliente, deletar um cliente.
    - /products: lista todos produtos cadastrados, ordenação por nome, detalhes do produto, adicionar um novo produto, atualizar um produto, deletar um produto de forma suave.
    - /sales: registra a venda de um produto a um cliente.

2. Validações feitas com Vine, um validador de objetos para AdonisJS. Estruturas de autenticação personalizadas com JWT em relação com Adonis6. Middleware para proteger rotas. Robusteza do código com mais estruturas de validações e aperfeiçoamentos de try/catch.

3. Atributos adicionais: rota de logout para deslogar o usuário, rota de softdelete para deletar um cliente de forma suave, rota de filtro de vendas por mês e ano, rota de vendas por cliente, rota de vendas por produto, rota de vendas por cliente e produto. Migration de blacklist para relembrar o token gerado e não permitir que ele seja usado novamente. Testes funcionais com japa.

4. Considerações e propostas se tivesse mais tempo: Faria mais testes cobrindo todas as funcionalidades, e melhoraria a estrutura de validações para cada rota. Também iria implementar um sistema de recuperação de senha, implementar um sistema de envio de e-mails, implementar um sistema de notificações, implementar um sistema de cache, implementar um sistema de logs, implementar um sistema de auditoria, implementar um sistema de internacionalização, implementar um sistema de monitoramento, implementar um sistema de documentação, implementar um sistema de testes automatizados.

5. Desafios: tive algumas dificuldades para ldiar com o blacklist criado em relação a testes e na estruturação do seeder. 

**Ao não conseguir, sem problemas, me contrate para sua empresa.** :smile:
