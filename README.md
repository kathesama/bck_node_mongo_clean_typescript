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


