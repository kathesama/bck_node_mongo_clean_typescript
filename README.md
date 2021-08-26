<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">

[<img src="https://img.shields.io/badge/Linkedin-kathesama-blue?style=for-the-badge&logo=linkedin">](https://www.linkedin.com/in/kathesama)
<br>
![MongoDB](https://img.shields.io/badge/-MongoDB-009900?logo=mongodb&logoColor=white&style=for-the-badge)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg?style=for-the-badge)
<br>
[![GitHub issues](https://img.shields.io/github/issues/kathesama/bck_node_mongo_clean?style=plastic)](https://github.com/kathesama/bck_node_mongo_clean/issues)
[![GitHub forks](https://img.shields.io/github/forks/kathesama/bck_node_mongo_clean?style=plastic)](https://github.com/kathesama/bck_node_mongo_clean/network)
[![GitHub stars](https://img.shields.io/github/stars/kathesama/bck_node_mongo_clean?style=plastic)](https://github.com/kathesama/bck_node_mongo_clean/stargazers)
<br>
![GitHub last commit](https://img.shields.io/github/last-commit/kathesama/bck_node_mongo_clean?color=red&style=plastic)
![GitHub version commits](https://img.shields.io/github/commits-since/kathesama/bck_node_mongo_clean/V2.0.0.svg?color=yellow&style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/kathesama/bck_node_mongo_clean?style=plastic)
<br>
![Maintaned](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=plastic)
![OWASP](https://img.shields.io/badge/OWASP%3F-yes-green.svg?style=plastic)
![OWASP](https://img.shields.io/badge/CleanCode%3F-yes-green.svg?style=plastic)
[![GitHub license](https://img.shields.io/github/license/kathesama/bck_node_mongo_clean?style=plastic)](https://github.com/kathesama/bck_node_mongo_clean/blob/main/LICENSE)
![GitHub repo size](https://img.shields.io/github/repo-size/kathesama/bck_node_mongo_clean?style=plastic)
<br>

# bck_node_mongo_clean
Backend for Farm proyect

Para crear un proyecto desde cero con Husky, abrir una consola y:
1. Crear una carpeta:
> mkdir [nombre del proyecto]
2. Inicializar git
> git init
3. Inicializar Node
> npm init
4. Iniciar Husky
> npx husky-init && npm install
5. Configurar Husky con lint-staged (Ejecutar en consola)<br>
a. $ npm i -D lint-staged<br>
b. $ npm set-script prepare "husky install"<br>
c. $ npm run prepare<br>
d. $ npx husky add .husky/pre-commit 'npx lint-staged'<br>
e. Este proyecto usa *git-commit-msg-linter* para tener un patron de desarrollo en git<br>

```
correct format: <type>[scope]: <subject>

  type:
    feat     A new feature.
    docs     Documentation only changes.
    style    Changes that do not affect the meaning of the code
              (white-space, formatting, missing semi-colons, etc).
    refactor A code change that neither fixes a bug nor adds a feature.
    test     Adding missing tests or correcting existing ones.
    chore    Changes to the build process or auxiliary tools and
              libraries such as documentation generation.
    perf     A code change that improves performance.
    ci       Changes to your CI configuration files and scripts.
    build    Changes that affect the build system or external dependencies
              (example scopes: gulp, broccoli, npm).
    temp     Temporary commit that won't be included in your CHANGELOG.

  scope:
    Optional, can be anything specifying the scope of the commit change.
    For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc.
    In App Development, scope can be a page, a module or a component.

  subject:
    Brief summary of the change in present tense. Not capitalized. No period at the end.
```

Para que funcione con las nuevas versiones de husky, ejecutar por consola:
>$ npx husky add .husky/commit-msg ".git/hooks/commit-msg \$1"

luego abrir *.git/hooks/commit-msg*, buscar la funcion main y reemplazar:

>const commitMsgFilePath = process.argv[2];

por:

>const commitMsgFilePath = path.resolve(process.env.PWD, process.argv[2].substring(1));

Esto corrige el path para el archivo COMMIT_EDITMSG.

Y eso sería todo, restaría agregar los modulos que desees para trabajar.

* npm i -D typescript
* npm install -g -D jest <-- para poderlo configurar luego
* npm i -D ts-jest @types/jest ts-node

Configuramos Jest:
> jest --init

√ Would you like to use Jest when running "test" script in "package.json"? ... yes
√ Would you like to use Typescript for the configuration file? ... yes
√ Choose the test environment that will be used for testing » node
√ Do you want Jest to add coverage reports? ... yes
√ Which provider should be used to instrument code for coverage? » babel
√ Automatically clear mock calls and instances between every test? ... yes

Para que el servidor transpile automaticamente en tiempo de ejecución
> npm i -D ts-node-dev

Para importr automaticamente los archivos de una carpeta en otro como un indice
> npm i fast-glob

Comandos útiles de Git.
* Agregar los cambios al commit: git add .
* Crear el commit: git git commit -m"[comando de git-commit-msg-linter] [mensaje]"
* Ver que archivos han cambiado: git status
* Ver cuales son tus commits pendientes por subir: git log

### Generar certificados TLS para cuando se habilite https, pasos:

1. openssl genrsa -out server-key.pem 2048
2. openssl req -new -sha256 -key server-key.pem -out server-csr.pem
3. openssl x509 -req -days 3650 -in server-csr.pem -signkey server-key.pem -out server-cert.pem

---
# Building docker images

## Steps:
1. Create a config file:
> docker buildx create --name mybuilderconfig --use

2. Configure the builder:
> docker buildx create --name mybuilderconfig --use

3. Build the image:
> docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -f Dockerfile -t kathemica/bck_node_mongo_clean:1.0.0 --push .

---
# Running container

With docker command:

```
docker run -d \
--name=nodeBckTPDam \
-p 8051:8051 \
-p 443:443 \
--restart always \
-e SERVER_FINGERKEY="SET YOUR RAMDON FINGERKEY HERE" \
-e SENDGRID_API_KEY="SET YOUR API KEY HERE" \
-e JWT_SECRET="WRITE A RANDOM STRING HERE" \
-e CA_TOKEN_MONGO="WRITE YOUR CA.cert PASSWORD HERE" \
-e MONGO_URL="INSERT YOUR MONGO_URL HERE" \
-e MAIL_OWNER="NAME A MAIL_OWNER HERE" \
-e MAIL_USERNAME="SENDGRID USERNAME HERE" \
-e IS_TLS_MONGO= "Should I connect with mongodb as TLS" \
-e DB_NAME= "INSERT YOUR DATABASE NAME HERE" \
-e isHTTPS= "Will I to connect with HTTPS?" \
-v $(pwd)/certs:/usr/app/certs \
kathemica/bck_node_mongo_clean:1.0.1

```
*$(pwd)*: is the actual path.

With docker compose

> docker-compose -f .\<docker-compose-file>.yml up

# Considerations

## For secure http connection:

You must provide certificates to the server in each path at folder:

- KEY_PEM_HTTPS= './certs/https/server-key.pem'
- CERT_PEM_HTTPS= './certs/https/server-cert.pem'

Aditionally you must indicate in an environment variable to turn on https at docker:
- isHTTPS=true

This one enable connections at port 443

## For secure TLS MongoDB connection:

You must provide certificates to the server in each path at folder, those are from mongo and are related to that replicaset:

- CA_CERT_MONGO= './certs/server_root_CA.crt'
- KEY_CERT_MONGO= './certs/client.key'
- PEM_CERT_MONGO= './certs/client.pem'

Aditionally you must indicate in an environment variable to turn on https at docker:
- IS_TLS_MONGO=true

### **NOTE**:
Only for connections with **atlas** you must enable *IS_TLS_MONGO=true*, with only that will work perfectly.

## Dev ambient settings
**Username**: someMail@dominiom.com
**Password**: Pa$1345678

### Starting up dev:
> docker-compose -f .\docker-compose.dev.yml up

### Console connections:
> docker exec -it mongodb_dev mongo /bin/bash

#### Backup database:
> mongodump --authenticationDatabase admin -d cleanCode -u root -p pass12345 -o dump-db

#### Restore database:
> mongorestore  --authenticationDatabase admin -d cleanCode -u root -p pass12345

