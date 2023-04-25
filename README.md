
# Master Project
![Badge In Development](http://img.shields.io/static/v1?label=STATUS&message=IN%20DEVELOPMENT&color=blue&style=for-the-badge)  ![Badge Versão](https://img.shields.io/badge/VERSION-1.0.0-blue?style=for-the-badge)

## Index

* [Descrição](#descrição)
* [Iniciando](#iniciando)
	* [Preparando o ambiente](#preparando-o-ambiente)
* [Documentação](#documentação)
* [Tecnologias](#tecnologias)
* [Autor](#autor)

## Descrição

O Master Project é uma aplicação para gerenciamento de projetos . Nela o usuário pode realizar seu cadastro e logo após o login será redirecionado para a página principal da aplicação, onde lá será possível visualizar, adicionar, editar, excluir ou marcar o projeto como concluído.

## Iniciando

### Preparando o ambiente
Clone o repositório:

    git clone https://github.com/dchueri/master-project.git

Iniciando o back-end*:

    cd master-project/server
    yarn
    yarn start:dev

Iniciando o front-end*:

    cd master-project/web
    yarn
    yarn dev
    
Após instalar os pacotes do front e do back você poderá iniciar as duas partes da aplicação a partir da pasta raiz (master-project/) com o comando:

    yarn start:dev

PS.: Lembre-se de criar os arquivos `.env`. Em cada diretório, existe um arquivo .env.example com as variáveis de ambiente utilizadas.
    
## Documentação
Acesse a documentação através do endpoint `/docs` na rota do "server".

Ex.:

    localhost:3000/docs

## Tecnologias

* `TypeScript`
* `NestJS`
* `ReactJS`
* `PostgreSQL`
* `TailwindCSS`

## Autor

| [<img src="https://avatars.githubusercontent.com/u/84249430?s=400&u=b789830e57ccc23a4d4d758542785461dd656b5f&v=4" width=115><br><sub>Diego  Chueri</sub>](https://github.com/dchueri) | 
