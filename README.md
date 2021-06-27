<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">

[<img src="https://img.shields.io/badge/Linkedin-kathesama-blue?style=for-the-badge&logo=linkedin">](https://www.linkedin.com/in/kathesama)
![MongoDB](https://img.shields.io/badge/-MongoDB-009900?logo=mongodb&logoColor=white&style=for-the-badge)
<br>
[![GitHub issues](https://img.shields.io/github/issues/kathesama/bck_node_mongo_clean?style=plastic)](https://github.com/kathesama/bck_node_mongo_clean/issues)
[![GitHub forks](https://img.shields.io/github/forks/kathesama/bck_node_mongo_clean?style=plastic)](https://github.com/kathesama/bck_node_mongo_clean/network)
[![GitHub stars](https://img.shields.io/github/stars/kathesama/bck_node_mongo_clean?style=plastic)](https://github.com/kathesama/bck_node_mongo_clean/stargazers)
![GitHub last commit](https://img.shields.io/github/last-commit/kathesama/bck_node_mongo_clean?color=red&style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/kathesama/bck_node_mongo_clean?style=plastic)
<br>
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
e. Abrir VSCode y crear el archivo **.lintstagedrc.json** en la raíz, agregar el siguiente contenido:
```
{
  "*.js": [
    "eslint 'src/**'"
  ]
}
```
f. Instalar eslint y sus dependencias en desarrollo, instalar:<br>

```
eslint
eslint-config-standard-with-typescript
eslint-plugin-import
eslint-plugin-node
eslint-plugin-promise
eslint-plugin-standard
@typescript-eslint/eslint-plugin
```
g. Para tener un patron de desarrollo en git<br>
```
npm i -D git-commit-msg-linter
```


![commiMessageLinter](assets/msgLinter.PNG)

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

Generar certificados TLS, pasos:

1. openssl genrsa -out server-key.pem 2048
2. openssl req -new -sha256 -key server-key.pem -out server-csr.pem
3. openssl x509 -req -days 3650 -in server-csr.pem -signkey server-key.pem -out server-cert.pem


