## Trybe Futebol Clube

Projeto desenvolvido no módulo de Back-end do curso de Desenvolvimento Web da [Trybe](https://www.betrybe.com/).

## Sobre o projeto

<div align="justify">
O TFC é um site informativo sobre partidas e classificações de futebol. Nele, além de consultar o desempenho dos times, é possível adicionar e atualizar partidas. Recebemos um front-end já implementado e tivemos que construir um back-end dockerizado utilizando a modelagem de dados através do ORM Sequelize. Fomos desafiados a aplicar o paradigma da programação orientada à objetos (POO) e da arquitetura SOLID, utilizando Typescript e método TDD (Test Driven Development).
</div>

## Desenvolvimento

<div align="justify">
Neste primeiro projeto full stack, tivemos que construir uma API RESTful e integrá-la ao front-end através do docker-compose, de forma que elas funcionem consumindo um banco de dados SQL. Para criação e atualização de partidas é necessário que o usuário esteja logado na aplicação e, para isso, foi utilizado JWT (JSON Web Token) na geração do token e verificação das permissões. A aplicação foi desenvolvida utilizando a arquitetura MSC (model-service-controller) e foram implementadas validações, em middlewares ou na camada service, e regras de negócios para popular adequadamente a tabela que será exibida no front-end.

Além disso, foram desenvolvidos testes de integração afim de garantir o bom funcionamento da aplicação, com cobertura de no mínimo 80% da aplicação.
</div>

## Tecnologias

* Typescript
* Node.js
* Express
* MySQL
* Sequelize
* Mocha
* Chai
* Sinon
* Docker

## Como rodar o projeto com Docker

1 - Navegue até a pasta desejada e rode o comando abaixo no terminal para clonar o projeto:

`git clone git@github.com:Fernanda-Vidal/trybe-futebol-clube.git`

2 - Entre na pasta desejada:

`cd trybe-futebol-clube`

3 - Instale as dependências do projeto:

`npm install`

4 - Execute o comando abaixo para subir o container Docker.

`npm run compose:up`

Acesse o front-end através de http://localhost:3000

5 - Para rodar o teste de cobertura execute os seguintes comandos:

`cd app/backend && npm run test:coverage`

