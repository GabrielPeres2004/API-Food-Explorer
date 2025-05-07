
# Food Explorer

O Food Explorer é um projeto backend desenvolvido para gerenciar informações sobre restaurantes e seus pratos. A API permite que os clientes façam pedidos e visualizem os pratos, enquanto os administradores têm a capacidade de criar, editar, atualizar e excluir informações dos restaurantes e dos pratos.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework para construção de APIs.
- **Knex.js**: Biblioteca para trabalhar com banco de dados SQL.
- **MySQL2**: Driver para conexão com banco de dados MySQL.
- **dotenv**: Carregamento de variáveis de ambiente.
- **cookie-parser**: Middleware para parseamento de cookies.
- **jsonwebtoken (JWT)**: Utilizado para autenticação de usuários e criação de tokens.
- **PM2**: Gerenciador de processos para Node.js, utilizado para facilitar a execução em ambientes de produção.

## Como Rodar o Projeto

### 1. Clonar o Repositório

Clone este repositório para sua máquina local:

```bash
git clone https://github.com/GabrielPeres2004/API-Food-Explorer.git
```

### 2. Instalar Dependências

Instale as dependências do projeto usando o npm (gerenciador de pacotes do Node.js):

```bash
cd food-explorer
npm install
```

### 3. Configurar as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente para configurar a conexão com o banco de dados. Se você estiver utilizando um banco de dados **MySQL** (local ou remoto), configure os seguintes valores:

#### Banco de Dados Local
Caso esteja utilizando um banco de dados MySQL local, crie o banco de dados e preencha os valores abaixo:

```plaintext
DB_CLIENT=mysql2
DB_HOST_LOCAL= host do banco de dados
DB_PORT_LOCAL= porta do banco de dados
DB_USER_LOCAL= usuário do banco de dados
DB_PASSWORD_LOCAL= sua senha do banco de dados
DB_NAME_LOCAL= nome do banco de dados
```

#### Banco de Dados Remoto
Se estiver utilizando um banco de dados **MySQL remoto**, como um serviço de hospedagem, utilize as credenciais fornecidas pelo serviço de hospedagem (ex: AWS RDS, Heroku, etc.):

```plaintext
DB_HOST_DEPLOY= host do banco de dados
DB_PORT_DEPLOY= porta do banco de dados
DB_USER_DEPLOY= usuário do banco de dados
DB_PASSWORD_DEPLOY= sua senha do banco de dados
DB_NAME_DEPLOY= nome do banco de dados
```

### 4. Rodar o Projeto

Para rodar o projeto em **desenvolvimento**:

```bash
npm run dev
```

### 5. Testar a API

Após iniciar o servidor, a API estará disponível em `http://localhost:3333` para o ambiente de desenvolvimento ou na URL de produção (se configurada).

## Licença

Todos os direitos reservados © Gabriel Peres
