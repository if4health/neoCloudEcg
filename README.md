# Projeto de ECG remoto
  
![](./img/img.png)

Aqui voce encontra o codigo fonte do servidor (back-end) do projeto _ECG remoto_. _ECG remoto_ eh um projeto de pesquisa com apoio do [IFSul](www.ifsul.edu.br)
 
Este servidor esta preparado para receber dados de exames de Eletrocardiograma (ECG) enviados de dispositivos com capacidade de coneccao a internet.
O hardware para realizacao do exame e envio dos dados coletados esta em desenvolvimento.

O servidor esta hospedado em [https://ecgremote.herokuapp.com](https://ecgremote.herokuapp.com/).

A visualizacao dos dados do servidor esta disponivel no nosso front-end 
O front-end esta em [http://tsi.charqueadas.ifsul.edu.br/~ecgremoto/](http://tsi.charqueadas.ifsul.edu.br/~ecgremoto/) - versao em desenvolvimento

## Preliminares


Voce tem 2 formas de utilizar o servidor deste repositorio
 1. **Full Local** - Configurando todo o ambiente em sua maquina local. Nesta opcao voce vai precisar instalar todas as ferramentas e fazer o download deste repositorio. 
 2. **Docker Version** - Montando o ambiente pronto e sem fazer download. Nesta opcao voce so precisa instalar o Docker e montar a imagem do ambiente pronto diretamente da nuvem, sem fazer download.

## Requisitos
#### Full Local 
- NodeJS [https://nodejs.org/en/](https://nodejs.org/en/)
- MongoDB [https://www.mongodb.com/](https://www.mongodb.com/)
- Python 3.x [https://www.python.org/downloads/](https://www.python.org/downloads/)
- yarn [https://yarnpkg.com/package/download](https://yarnpkg.com/package/download)
- Biblioteca Python biosppy [https://biosppy.readthedocs.io/en/stable/](https://biosppy.readthedocs.io/en/stable/)
- Aplicação ECG Remoto (este repositório)

#### Docker Version
- Docker e Docker Compose [https://docs.docker.com/](https://docs.docker.com/)

#### Heroku CLI
- Heroku CLI [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)


## Instalação
#### Full Local 
1. Faca download deste repositorio
```sh
git clone https://github.com/MarceloSkank/ECGRemote .
```
2. Instale o pacote yarn do NodeJS 
```sh
npm install --global yarn
cd EcgRemote/
yarn install
```
3. Instale o BiosSPy e outras bibliotecas nescessarias por meio do pip 
```sh
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
pip install biosspy
pip install certifi
pip install requests
pip install pymongo[srv]
pip install python-dotenv
```
4. Verifique a instalacao do BiosSPy
```sh
cd python_src
python test.py
```

## Utilizacao
Apos o set-up do ambiente escolhido, voce precisa destes comandos para executar
#### Full Local 
No diretorio `ECGRemote` execute:
```sh
yarn dev
```
Visualize o servidor rodando no navegador:
```sh
http://localhost:${SERVER_PORT}/
```

#### Docker Version
Utilize o comando abaixo para montar e rodar a API ECG Remoto e o Banco de Dados MongoDB. 
```sh
sudo docker-compose up -d
```
O script do Docker Compose monta uma imagem para o MongoDB e uma imagem para a API ECG Remoto. A imagem do MongoDB vem diretamente do repositorio publico [Docker Hub](https://hub.docker.com/_/mongo). Ja a imagem sera construida localmente seguindo as instrucoes do `Dockerfile` deste repo. Em seguida, dois containers sao instaciados a partir das imagens.

1. Verifique se ***DB_ECG*** e ***CLOUD_ECG*** estao na lista de containers e se estao executando
```sh
sudo docker ps -a
```
Coluna *STATUS* da figura esta em **Up** quando o container esta executando. *STATUS* **Exited** indica o container parado. 

2. Caso ***DB_ECG*** ou ***CLOUD_ECG***  estejam parados, ou seja, na lista de containers com status **Exited**, voce pode inicializa-los:
```sh
sudo docker container start NOME_CONTAINER
```
Caso ***DB_ECG*** ou ***CLOUD_ECG***  estejam executando, ou seja, na lista de containers com status **UP**, voce pode inicializa-los:
```sh
sudo docker container stop NOME_CONTAINER
```
3. Voce pode remover toda a instalacao com o comando:
```sh
docker-compose down
```


#### Utilização
1. Com ambos os containeres executando (status **Up**), verifique se voce consegue acessar:
```sh
# API ECG remoto
curl http://localhost:${SERVER_PORT}/`
# Mongo DB
curl http://localhost:27017/ 
```
2. Em caso de problemas, verifique os logs:
```sh
docker-compose logs -f
```

## Rotas
| Rota               | Metodo | Descricao                                                                                                  |
|--------------------|--------|------------------------------------------------------------------------------------------------------------|
| `/well-known/smart-configuration` | GET | Mostra as configurações para autenticação |
| `/auth/register` | GET | Inicia o processo de autenticação |
| `/auth/login` | GET | Exibe a tela de login |
| `/auth/login` | POST | Efetua o login do usuário, sendo paciente ou médico |
| `/auth/authorize` | GET | Exibe a tela das permissões solicitadas pela aplicação |
| `/auth/authorize` | POST | Confirma a autorização da aplicação pelo usuário |
| `/auth/list` | GET | Exibe lista de pacientes do login do médico |
| `/auth/select` | POST | Seleciona o paciente para exibir os dados |
| `/auth/token` | POST | Gera um token com os grant_types: 'authorization_code' e 'client_credentials' |


### Variáveis de ambiente
- SERVER_PORT - Porta do servidor, se alterado, lembrar de alterar o Apache/Nginx da instancia que estiver rodando para fazer o proxy reverso e redirecionar para a porta 80 e 443 e o site funcionar.
- DB_HOST - Host do mongo
- DB_NAME - Database do mongo
- DB_USER - Usuário do mongo
- DB_PASS - Senha do mongo
- OAUTH_PUB - Chave pública para verificar tokens, pode ser o caminho relativo, local, ou o nome do arquivo no S3
- OAUTH_PRIVATE - Chave privada para assinar tokens, pode ser o caminho relativo, local, ou o nome do arquivo no S3
- OAUTH_SECRET - Segredo de assinatura utilizado para assinar e verificar tokens de dispositivos
- DEFAULT_URL - Referencia da URL atual do servidor, vai ser exibido nos arquivos de configuração SMART e Metadata FHIR
- AWS_BUCKET_NAME - Nome do bucket do S3 que está localizado as chaves
- AWS_BUCKET_REGION - Região do bucket
- AWS_ACCESS_KEY - Chave de acesso
- AWS_SECRET_KEY - Segredo único do S3, precisa ser criado um novo ao registrar no env, não fica acessível na AWS.

### Criar dispositivos
Para adicionar registro de novos dispositivos, a collection Dispositivos é usada, basta criar um client-id e client-secret

### Usuários
Os pacientes são cadastrados na tabela pacientes, não confundir com Patient do FHIR, ambas são relacionadas, mas a tabela pacientes possui o login e senha.
Os médicos seguem o mesmo padrão, na tabela médicos e Practitioners.
Ambos se relacionam na tabela Patient, que possui o campo generalPractitioner, que vai ter o id do practitioner.
Patient e Practitioner possuem um identifier que podem possuir mais de um id de sistemas diferentes, o próprio servidor vai ser o 'own' ou 'local'.

### Comunicação entre Servidor <-> Hardware

#### Heroku CLI
Para fazer Deploy do seu container no Heroku.

1. Faça Login na sua conta heroku
```sh
heroku login
```

2. Faça Login também no cnotainer Heroku.
```sh
heroku container:login
```

3. Crie uma aplicação e escolha o nome ***name_app***
```sh
heroku create name_app
```

4. Contrua um conteinaer utilizando o docker no resgistro do heroku e de um *push*.
```sh
docker build -t registry.heroku.com/name_app/web 
docker push registry.heroku.com/name_app/web
```

4. usando o herou e um release no seu app e depois abra.
```sh
heroku container:release web -a name_app
heroku open -a name_app
```

### Trabalho a ser feito
- Desenvolver plataforma para registro de usuários, dispositivos e aplicações
- Habilitar formAction e script-src-attr no helmet no server.js para que as views funcionem, ou mudar estrutura do front (preferível)