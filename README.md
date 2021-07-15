# medipreco-backend-jr
Esse repositório contém o teste técnico para a vaga de desenvolvedor backend júnior na Medipreço.

## Rodando localmente
### Pré requisitos
Tenha o node.js instalado
### Para rodar
1) Faça o clone do projeto no seu computador
2) Acesse a raiz da pasta do projeto.
3) Rode os seguintes comandos:
```
npm install
npm start
```
O arquivo .env foi enviado ao github para facilitar o processo de rodar localmente. Caso a porta 3000 já esteja sendo utilizada por outro serviço no seu computador, mude a variável API_MEDIPRECO_PORT para uma porta livre.

## Endpoints
A documentação dos endpoints foi feita utilizando o swagger e ela pode ser acessada no endpoint.
```
/v1/api-docs
```

Na pasta doc é possível encontrar a collection do serviço Postman com as requisições de cada endpoint. Junto dela temos o json do environment local utilizado no desenvolvimento. Importando esses dois documentos no postman é possível testar todos os endpoints.
 
Abaixo temos algumas especificações de alguns endpoints:

**Os times com mais de dois títulos brasileiros**

Para este endpoint foi definido um parâmetro de _número mínimo de vitórias (minimumNumberOfWins)_, que tem um valor padrão de 2, mas pode ser enviado via query param para obter times que possuem pelo menos "_minimumNumberOfWins_" vitórias. Por exemplo, caso queria buscar os times com pelo menos 3 vitórias, basta apenas passar o parâmetro ?minimumNumberOfWins=3.

**Os cinco (5) principais artilheiros da história do campeonato**

Para este endpoint foi definido um parâmetro de _top_, que tem um valor padrão de 5, mas pode ser enviado via query param para obter uma outra quantidade de principais artilheiros. Por exemplo, caso queria buscar os 10 principais artilheiros, basta apenas passar o parâmetro ?top=10.

**A lista de artilheiros que possuem determinada quantidade de gols**

Para este endpoint foi definido um parâmetro de _quantidade de gols (numberOfGoals)_, que é obrigatório, e deve ser enviado via query param para obter os artilheiros com aquela determinada quantidade de gols. Por exemplo, caso queria buscar os artilheiros que fizeram 5 gols em algum determinado campeonato, basta passar o parâmetro            ?numberOfGols=5.

## Desenvolvimento
### Banco de dados
Primeiramente, a API foi desenvolvida utilizando o arquivo .csv passado como banco de dados. A aplicação lê o arquivo e carrega o banco de dados conforme esse arquivo. Já a modelagem desenvolvida foi um pouco diferente da estrutura do arquivo. Com isso em mente vale observar que a API não segue a modelagem desenvolvida, mas sim a do arquivo csv.

**Modelagem**

Neste tópico explicarei melhor a modelagem do banco de dados. Primeiramente foi escolhida uma sintaxe específica, onde o nome da tabela/coluna é sempre precedido de uma sigla identificadora daquele campo. Por exemplo, a tabela campeonato teve seu nome no banco como tb_campeonato; já a coluna de artilheiros teve seu nome como no_artilheiros, identificando que naquela coluna temos os nomes dos artilheiros do campeonato. Essa sintaxe foi escolhida para um melhor entendimento das colunas durante o desenvolvimento, facilidando na hora de desenvolver queries SQL.

**Tabelas**

Foi designado apenas uma tabela *tb_campeonato* para o banco, considerando o escopo da aplicação e sua simplicidade, mas poderíamos ter outras tabelas como de times e/ou jogadores dependendo do escopo do projeto, e assim também teríamos chaves estrangeiras na tabela campeonatos em vez de dados brutos.

**Colunas**

Foram designadas 5 colunas, irei explicar brevemente cada uma delas:
* co_campeonato: Chave primária identificadora do campeonato.
* nu_ano: Ano em que o campeonato ocorreu. Aqui foi escolhido uma coluna do tipo inteiro para guardar o ano, pois como não precisamos guardar um dia e uma hora temos uma coluna guardando apenas o essencial, o que não ocorreria se tivéssemos uma coluna do tipo date.
* no_times_melhores_colocados varchar(25)[4]: Array de nomes dos times melhores colocados. Foi decidido utilizar um array para facilitar a manutenção futura do sistema, caso quiséssemos começar a utilizar os 5 primeiros colocados, por exemplo. Nesse caso, um array de nomes facilitaria o desenvolvimento, ao contrário se fosse uma coluna para cada time melhor colocado.
* no_artilheiros: Nomes dos artilheiros dos campeonatos. Seguindo a mesma lógica da coluna acima, foi decidido utilizar um array para guardar o nome de cada artilheiro do campeonato.
* nu_gols: Número de gols feitos pelos artilheiros do campeonato. 

### Estrutura de pastas
```
├── app.js
├── bin
│   └── server.js
├── database
│   ├── campeoes_brasileiro.csv
│   ├── database.js
│   └── database.sql
├── doc
│   └── swaggerDocumentation.js
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── middlewares
    │   ├── requestTime.js
    │   ├── routeLogger.js
    │   └── transaction.js
    ├── repositories
    │   └── championship.js
    ├── routes
    │   ├── championship.js
    │   ├── health.js
    │   └── index.js
    └── utility
        ├── logger.js
        └── otherUtils.js
```

Arquivos:
* O arquivo app.js é onde está localizado o aplicativo do express, lá é chamado as rotas e os middlewares básicos necessários para a aplicação, como:
  * **bodyparser**: serve para tratar o body da requisição, facilitando seu uso mais para frente
  * **cors**: serve para ativar o cors na aplicação
  * **rateLimiterMiddleware**: middleware desenvolvido para limitar múltiplas requisições à nossa aplicação. O limite foi definido para 1 requisição por rota por segundo

* O arquivo bin/server.js configura o server da aplicação e em qual porta ele irá rodar.
* O arquivo database/campeoes_brasileiro.csv é o arquivo csv disponibilizado para ser utilizado como banco de dados.
* O arquivo database/database.js configura o banco de dados e o inicia. Ele lÊ o arquivo csv disponibilizado e o transforma em um conjunto de arrays de objetos em que cada objeto é uma linha do arquivo.
* O arquivo database/database.sql é o arquivo .sql pedido contendo a modelagem de dados no banco PostgreSQL, que foi escolhido pelo desenvolvedor.
* O arquivo doc/swaggerDocumentation.js contém a documentação swagger dos endpoints da aplicação.

Na pasta src temos as divisões de pastas:
* **middlewares**: que contém os middlewares utilizados pela aplicação, que são os seguintes:
  * **requestTime**: que armazena o exato momento do início da requisição.
  * **routeLogger**: que realiza o log da rota da requisição
  * **transaction**: que gera um id de transação para a requisição para facilitar no registro de informações da requisição
* **repositories**: que contém a lógica de cada endpoint
* **routes**: que contém os endpoints de cada grupo de rotas
  * **championship**: rota relacionada aos campeonatos brasileiros
  * **health**: rota de status da aplicação
  * **index**: arquivo que organiza os grupos de rotas e seus respectivos middlewares
* **utility**: que contém as funções de utilidades para a aplicação
  * **logger**: que contém o logger utilizado pela aplicação em todos o ciclo de vida da requisição
  * **otherUtils**: que contém funções pequenas de utilidades variadas

* .env: aqui temos as variáveis ambiente da aplicação, ele foi enviado ao github para facilitar o processo de rodar a api localmente. Nele temos as seguintes variáveis:
  * API_MEDIPRECO_PORT: que define em qual porta será rodada a aplicação
  * API_MEDIPRECO_VERSION: que define a versão da api
  * API_MEDIPRECO_MULTIPLE_REQUESTS_DELAY: que define o tempo entre uma requisição e outra da mesma rota

