# Be the Hero!

## Tecnologias utilizadas:
[NodeJS](https://nodejs.org/en/), [ReactJS](https://reactjs.org/) e [React Native](https://reactnative.dev/).

## Objetivo do projeto:
Esse projeto foi desenvolvido durante a **Semana Omnistack 11.0** da [Rocketseat](https://rocketseat.com.br/) (23/03/20 - 27/03/20). O objetivo é ensinar como desenvolver uma aplicação do back-end até o front-end (web + mobile), usando **NodeJS**, **ReactJS** e **React Native**.

# O projeto:
  **Plataforma Web**
As *ONG*'s podem se cadastrar no site e à partir daí cadastrar *casos* de animais abandonados, doentes e/ou que estejam precisando de ajuda. Em cada caso é informado título, descrição e valor de ajuda.

  **Aplicação mobile**
O usuário da aplicação mobile pode **listar todos os casos** e pode **entrar em contato com a ONG** responsável por aquele caso via email ou whatsapp para doar a quantia pedida.

# Como rodar o projeto
1. No diretório em que deseja clonar a aplicação, execute o seguinte comando:    
  `git clone https://github.com/andrelarruda/be-the-hero.git`

2. Entre no diretório criado:  
  `cd be-the-hero`

3. Entre em uma das pastas (*backend*, *frontend* ou *mobile*):  
  `cd pasta-desejada`

4. Instale as dependências:  
  `npm install`

5. Rode o projeto;  
  `npm start`

> *Obs.: Para o projeto todo funcionar (web + mobile + backend) é necessário que os passos de 3 a 5 sejam executados para as três pastas: backend, frontend e mobile.*


# Conhecimentos técnicos abordados

## Back-end
* Banco de dados [sqlite](http://sqlite.org/index.html) manipulado com o SQL Builder [Knex](http://knexjs.org/);
* Framework [Express](https://expressjs.com/);
* Pacote [cors](https://www.npmjs.com/package/cors) para controle de acesso à API;
* Cliente HTTP [axios](https://github.com/axios/axios) para consumo de APIs;
* Validação com [celebrate](https://github.com/arb/celebrate), que é um middleware da biblioteca de validações [Joi](https://github.com/hapijs/joi);
* Para execução em ambiente de desenvolvimento foi utilizada a ferramenta [nodemon](https://www.npmjs.com/package/nodemon) para reiniciar a aplicação automaticamente após alterações no código.

## Front-end
**1. Web**
* Foram utilizados ícones da biblioteca [Feather](http://feathericons.com) icons *react-icons/fi*;
* Cliente HTTP [axios](https://github.com/axios/axios) para consumo da API construída;
* Sistema de Rotas utlilizando elementos da *react-router-dom*;
* Uso do método *useEffect* para manipulação de dados durante a renderização de componentes.
* Biblioteca Intl (nativa no ReactJS) para padrões de internacionalização;

**2. Mobile**
* [expo](https://expo.io/) para rodar o app em dispositivos Android ou iOS;
* Cliente HTTP [axios](https://github.com/axios/axios) para consumo da API construída;
* Pacote *expo-constants* para utilizar constantes pré-definidas;
* Módulo [expo-mail-composer](https://docs.expo.io/versions/latest/sdk/mail-composer/) para compor emails;
* Abordagem [*deep link*](https://medium.com/@JohnCalistro/o-que-%C3%A9-deep-linking-d0208d746874) para abrir o aplicativo do Whatsapp e enviar mensagem. Para isso foi utilizado a classe *Linking* da própria biblioteca *react-native*;
* Uso da biblioteca *react-navigation* para navegação em aplicações mobile;
* Biblioteca Intl para padrões de internacionalização (Precisa instalação);
