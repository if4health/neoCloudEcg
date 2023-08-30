# CloudEcg + H2cloud
O servidor está hospedado em [https://ecgremote.herokuapp.com](https://ecgremote.herokuapp.com/).

A visualizacao dos dados do servidor esta disponível no nosso front-end [http://tsi.charqueadas.ifsul.edu.br/~ecgremoto/](http://tsi.charqueadas.ifsul.edu.br/~ecgremoto/) - versao em desenvolvimento

## Requisitos
- NodeJS [https://nodejs.org/en/](https://nodejs.org/en/)
- MongoDB [https://www.mongodb.com/](https://www.mongodb.com/)
- Python 3.x [https://www.python.org/downloads/](https://www.python.org/downloads/)
- yarn [https://yarnpkg.com/package/download](https://yarnpkg.com/package/download)
- Biblioteca Python biosppy [https://biosppy.readthedocs.io/en/stable/](https://biosppy.readthedocs.io/en/stable/)


## Instalação
1. Faça download deste repositório
2. Instale o pacote yarn do NodeJS 
```sh
npm install yarn
yarn install
```

## Inicialização
Comandos de inicialização:
```sh
yarn dev
```
ou
```sh
yarn start
```
Visualize o servidor rodando no navegador:
```sh
http://localhost:${SERVER_PORT}/
```
### Variáveis de ambiente
- SERVER_PORT - Porta do servidor, se alterado, lembrar de alterar o Apache/Nginx da instância que estiver rodando para fazer o proxy reverso e redirecionar para a porta 80 e 443 e o site funcionar.
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
- 
exemplo:
![Alt text](/readmeIMG/image.png)

### Como registrar novos usuários e dispositivos (importante)
Nós ainda não contamos com um sistema de registro. Portanto para logar no sistema você precisará registrar sua conta manualmente no seu MongoDB, Entretanto o modo de registrar é diferente dependendo se você quer registrar um usuário (patient) ou um dispositivo (hardware)

- Usuário:

Você deve criar um JSON `patient` e `paciente` e inserir-los nas suas respectivas coleções. 

exemplo de `paciente`:

`````json
{
  "_id": { "$oid": "64e8f47d31cb42fdd73a3b59" },
  "cpf": "123",
  "senha": "202cb962ac59075b964b07152d234b70" // hash MD5
}
`````
exemplo de `patient`:
`````json
{
  "_id": { "$oid": "64b18432ac762285511d056c" },
  "resourceType": "Patient",
  "identifier": [
    {
      "system": "http://example.com/patient-id",
      "value": "64e8f47d31cb42fdd73a3b59" // <-- !!!ATENÇÃO!!!! o valor deste value DEVE ser o id do PACIENTE corespondende a este PATIENT
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "Doe",
      "given": ["John"]
    }
  ],
  "telecom": [
    { "system": "phone", "value": "123-456-7890" }
  ],
  "gender": "male",
  "birthDate": "1990-01-15",
  "deceasedBoolean": false,
  "address": [
    {
      "use": "home",
      "line": ["123 Main St"],
      "city": "Anytown",
      "state": "CA",
      "postalCode": "12345"
    }
  ],
  "maritalStatus": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/v3/MaritalStatus",
        "code": "M",
        "display": "Married"
      }
    ]
  },
  "multipleBirthBoolean": false,
  "photo": [
    {
      "contentType": "image/jpeg",
      "url": "http://example.com/patient.jpg"
    }
  ],
  "contact": [
    {
      "relationship": [
        {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0131",
              "code": "N",
              "display": "Next of Kin"
            }
          ]
        }
      ],
      "name": {
        "use": "official",
        "family": "Smith",
        "given": ["Jane"]
      },
      "telecom": [
        {
          "system": "phone",
          "value": "987-654-3210"
        }
      ]
    }
  ],
  "communication": [
    {
      "language": {
        "coding": [
          {
            "system": "urn:ietf:bcp:47",
            "code": "en-US",
            "display": "English"
          }
        ]
      }
    }
  ],
  "generalPractitioner": [
    { "reference": "Practitioner/123" }
  ],
  "managingOrganization": {
    "reference": "Organization/456"
  },
  "link": [
    {
      "other": { "reference": "Patient/789" },
      "type": "seealso"
    }
  ]
}
`````

- Dispositivo:
  
O processo para criação de dispositivos é muito mais simples. Basta registrar na coleção `auths` o seguinte JSON:

`````json
{
  "_id": { "$oid": "64e8f55031cb42fdd73a3b5a" },
  "client_id": "myclient",
  "client_secret": "mysecret",
  "scope": "all/*.cruds"
}
`````

## Rotas
Para fins estéticos e para comprovação da implementação correta do *SMART on FHIR* no aplicativo, realize o fluxo da aplicação via https://launch.smarthealthit.org/.
| Rota               | Metodo | Descricao                                                                                                  |
|--------------------|--------|------------------------------------------------------------------------------------------------------------|
| `/well-known/smart-configuration` | GET | Mostra as configurações para autenticação |
| `/auth/register` | ALL | Inicia o processo de autenticação |
| `/auth/login` | GET | Exibe a tela de login |
| `/auth/login` | POST | Efetua o login do usuário, sendo paciente ou médico |
| `/auth/authorize` | GET | Exibe a tela das permissões solicitadas pela aplicação |
| `/auth/authorize` | POST | Confirma a autorização da aplicação pelo usuário |
| `/auth/list` | GET | Exibe lista de pacientes do login do médico |
| `/auth/select` | POST | Seleciona o paciente para exibir os dados |
| `/auth/token` | POST | Gera um token com os grant_types: 'authorization_code' e 'client_credentials' |

### Parâmetros de cada rota
- `/auth/register`
  
A rota é definida como `ALL`, entretanto para o funcionamento correto da aplicação é necessário que você envie os dados num `GET` através da própia URL. Ou seja:

``http://localhost:8080/auth/register?redirect_uri=%2Fapi-docs&aud=asd&scope=patient%2F*.rs&state=asd&token_endpoint=%2Fauth%2Ftoken&client_id=client-1``

| Parâmetro         | Oque se espera nele               | Sugestão/Exemplo |
|-------------------|-----------------------------------|------------------|
| `redirect_uri`    | caminho do swagger.               | /api-docs        | 
| `scope`           | scopo do usuário.                 | patient/*.rs     |
| `token_endpoint`  | rota para obtenção do token.      | /auth/token      |
| `client_id`       | id do usuário registrado no Mongo.| client-1         |
| `aud`             | nada.                             | placeholder      |
| `state`           | nada.                             | placeholder      |

- `/auth/token`

A rota é definida como `POST` e espera um JSON contendo as informações necessárias, veja um exemplo a seguir:
````json
{
  "grant_type": "authorization_code",
	"scope":"patient/*.rs",
  "code": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50IjoiNjRiMTg0MzJhYzc2MjI4NTUxMWQwNTZjIiwic2NvcGUiOiJwYXRpZW50LyoucnMiLCJpYXQiOjE2OTIxMjUzMTUsImV4cCI6MTY5MjEyNTM3NX0.dk9wGD59nSLmDHUC-tVpiWKUqgcsr4S4OR6442__9NldSx0vLxVnRTQji8rML_Nf_XiLt7UuDmpA9K_2d3dy1KJVAec_SbrZxVhKJ3UgQlp22i7XHaYVt35Mk8LIl1zL_pZy-GJxPXkOS-wme9jKnUnwXkNFeZ1PpBbE14Egj5eUgr4_pjYLnWsuqBvJgFftggcl7OhWd0biLGMCCzsuiIKSsqpCBYssXxbvamV0T7XfgbRAgG_NqXy8IMC8u7Qyjhg7W5BAC2yOzjI0fpGYcEtHQXxzQKVbBLyKYURcooV4hH8stLd7du65h8pvObdUAd73reu4O5Sn7UN9R1HlQQ",
  "redirect_uri": "/api-docs",
  "client_id": "client-1"
}
````

| Parâmetro         | Oque se espera nele               | Sugestão/Exemplo |
|-------------------|-----------------------------------|------------------|
| `redirect_uri`    | caminho do swagger.               | /api-docs        | 
| `scope`           | scopo do usuário.                 | patient/*.rs     |
| `token_endpoint`  | rota para obtenção do token.      | /auth/token      |
| `client_id`       | id do usuário registrado no Mongo.| client-1         |
| `aud`             | nada.                             | placeholder      |
| `state`           | nada.                             | placeholder      |

## Ultilização
A forma como o aplicativo funciona é diferente dependendo se você está simulando um dispositivo ou um usuário, a seguir um guia para executar ambos de forma pratica.

- Usuário:

Tendo em mente que você já registrou o usuário como é mostrado na aba de ``"Como registrar novos usuários e dispositivos (importante)"`` você deve iniciar com uma requisição `GET` na rota `/auth/register` com os parâmentros mencionados em `"Rotas"`. Caso você tenha feito o processo corretamente, espera-se o seguinte resultado:

![Alt text](/readmeIMG/image-2.png)

nesses espaços você deve inserir as informações registradas na coleção `paciente`

![Alt text](/readmeIMG/image-3.png)

![Alt text](/readmeIMG/image-4.png)

quando essa tela do *Swagger* aparecer, você deve voltar ao MongoDB pois o aplicativo automáticamente adicionou um arquivo á coleção `auths`, então você deve copiar o `authorization_code`.

![Alt text](/readmeIMG/image-5.png)

agora com esse dado, faça uma requisição `POST` na rota `/auth/token` 

![Alt text](/readmeIMG/image-6.png)

extraia o resultado da requisição(`access_token`).

![Alt text](/readmeIMG/image-7.png)

com o `access_token` em mãos você pode finalmente acessar `http://localhost:porta/api-docs/` e usar o aplicativo.

![Alt text](/readmeIMG/image-8.png)

- Dispositivo:
  
Tendo em vista que você já registrou o dispositivo como é mostrado na aba de ``"Como registrar novos usuários e dispositivos (importante)"`` acesse o seu banco de dados e copie o registro do dispositivo(caso feito de maneira correta, deve estar na coleção `auths`).

![Alt text](/readmeIMG/image-9.png)

com o registro copiado, acesse https://jwt.io/ e cole o registro no `payload`(parte roxa).

![Alt text](/readmeIMG/image-10.png)

adicione mais um parametro da exata mesma forma como mostrado logo abaixo.

![Alt text](/readmeIMG/image-11.png)

e não se esqueça de preencher o `verify assignature`(azul) com a sua `OAUTH_SECRET` que foi escrita por você no seu arquivo .env, com isso pronto você deve fazer uma requisição `POST` á rota `/auth/token` como logo abaixo.

![Alt text](/readmeIMG/image-12.png)

extraia o resultado(`access_token`)

![Alt text](/readmeIMG/image-13.png)

através desse código, agora você é livre para usufluir do aplicativo.

![Alt text](/readmeIMG/image-8.png)
