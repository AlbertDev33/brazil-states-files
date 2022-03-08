# BrazilStatesFile
Scripts para gerar arquivos dos estados e cidades Brasileiras

São 4 scripts com funções semelhantes. Todos geram ou um único arquivo com todos os estados brasileiros ou um arquivo para cada estado brasileiro.

# Motivação
    - Nos casos em que é necessário preencher algum formulário de forma automática ou disponibilizar as informações dos estados e cidades brasileiros, uma boa alternativa é gera arquivos com esse conteúdo, visto que são informações com pouca alteração. Isso gera mais performance para sua aplicação, não sendo necessário gera uma chamada para uma API externa e esperar que seja resolvido. Os arquivos estáticos garantem muito mais performance para sua aplicação.

- O script do arquivo asyncStateFile.ts cria um arquivo para cada estado brasileiro e suas cidades e no final gera um único arquivo com todos os estados e suas cidades. Todos os arquivo são criados no formato .ts. A tarefa nesse script é feita através de chamadas assíncronas e stream's

- O script do arquivo statesFilesJson.ts gera um arquivo JSON para cada estado brasileiro e suas respectivas cidades. Toda a operação de escrita dos arquivos é feita utilizando stream's. A tarefa é feita de forma extremamente performática.

- O script do arquivo statesFilesTypescript gera a mesma saída do arquivo statesFilesJson.ts, porém, os arquivos são no formato JSON.

- O script do arquivo uniqueStateFile.ts gera um único arquivo contendo todoas os estados e suas respectivas cidades. Toda a tarefa de escrita é realizada utilizando stream's. A operação é feita de forma extremamente perfomática.

# Como utilizar os scripts
    - Para executar os scripts é necessário que o Node.js esteja instalado em sua máquina;
    - Abra o projeto e em seu terminal execute o comando yarn ou npm install para instalar as dependências;
    - Esse projeto foi desenvolvido em Typescript, por isso é necessário executar o script desejado utilizando ts-node (já instalado no passo anterior). Por exemplo yarn ts-node uniqueStatesFile.ts.

# Árvore de arquivos e pastas

`📦brasilStatesFiles
 ┣ 📂src
 ┃ ┣ 📂Constants
 ┃ ┃ ┗ 📜constants.ts
 ┃ ┣ 📂interfaces
 ┃ ┃ ┗ 📜IStates.ts
 ┃ ┣ 📜asyncStateFile.ts
 ┃ ┣ 📜statesFilesJson.ts
 ┃ ┣ 📜statesFilesTypescript.ts
 ┃ ┗ 📜uniqueStateFile.ts
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜LICENSE
 ┣ 📜README.md
 ┣ 📜package.json
 ┣ 📜tsconfig.json
 ┗ 📜yarn.lock
 `
