## 🖥️ Projeto API Node.js com autenticação, perfis de usuários e permissões

### Descrição

Este projeto é uma aplicação que implementa autenticação de usuários utilizando JSON Web Tokens (JWT), CRUD completo para gerenciamento de dados e integração com um banco de dados usando o ORM Sequelize. Além disso, o projeto inclui a criação de middlewares para autenticação, perfis de usuário (roles) e permissões.

### Tecnologias Utilizadas

- Node.js 🌐
- Express 📦
- Sequelize (ORM) 🔗
- PostgreSQL (ou outro banco de dados relacional) 🗄️
- JSON Web Tokens (JWT) 🔒
- Middleware de autenticação 🔑

### Funcionalidades

#### 1. Autenticação

- Implementação de autenticação de usuários utilizando JWT.
- Registro de novos usuários.
- Login e geração de tokens de acesso.
- Proteção de rotas sensíveis utilizando middlewares.

#### 2. CRUD Completo

- Criação de recursos (Create).
- Leitura de recursos (Read).
- Atualização de recursos (Update).
- Exclusão de recursos (Delete).

#### 3. ORM Sequelize

- Integração com o Sequelize para interagir com o banco de dados.
- Definição de modelos de dados e migrações.
- Consultas complexas utilizando Sequelize.

#### 4. Relacionamentos entre Tabelas

- Implementação de relacionamentos entre tabelas do banco de dados (ex.: um para muitos, muitos para muitos).
- Manipulação de dados relacionados utilizando o Sequelize.

#### 5. Middlewares de Autenticação e Permissões

- Criação de middlewares para autenticação de usuários.
- Implementação de diferentes perfis de usuário (roles) e permissões.
- Proteção de rotas com base nas permissões do usuário.



