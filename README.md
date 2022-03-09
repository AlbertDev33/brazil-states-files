# BrazilStatesFile
Pacote para gerar arquivos dos estados e cidades brasileiras

São 4 funções que geram ou um único arquivo com todos os estados brasileiros ou um arquivo para cada estado do Brasil.

# Caso de uso
- Nos casos em que é necessário preencher algum formulário de forma automática ou disponibilizar as informações dos estados e cidades brasileiros em sua aplicação, uma boa alternativa é gerar arquivos com esse conteúdo, visto que são informações que tendem a serem alteradas poucas vezes durante anos. 
Isso gera mais performance para sua aplicação, não sendo necessário realizar uma chamada para uma API externa e esperar que essa seja resolvida toda vez que seu usuário precisar dessas informações. Os arquivos estáticos garantem muito mais performance para sua aplicação.

# Descrição de cada função desse pacote
- A função asyncStateFile cria um arquivo para cada estado brasileiro e suas cidades. Todos os arquivo são criados no formato .ts por padão, entretanto, é possível escolher entre os formatos '.ts' e '.js'. São utilizadas chamadas assíncronas para criar os arquivos de cada estado.

- A função statesFilesJson gera um arquivo JSON para cada estado brasileiro e suas respectivas cidades. Toda a operação de escrita dos arquivos é feita utilizando stream's. A tarefa é feita de forma extremamente performática.

- A função statesFilesTypescript gera a mesma saída da função statesFilesJson, porém, os arquivos são no formato .ts.

- A função uniqueStateFile gera um único arquivo contendo todos os estados brasileiros e suas respectivas cidades no formato '.json'. Toda a tarefa de escrita é realizada utilizando stream's. A operação é feita de forma extremamente perfomática.

# Como utilizar cada função
- Instale o pacote em seu projeto executando o comando yarn add brazil-states-files ou npm install brazil-states-files;
- Importe a função desejada;
- É importante que todas as funções sejam encapsuladas em uma chamada assíncrona. As funções não aceitam um callback como parâmetro.

# Exemplo
```ts
    import { statesFilesJson } from 'brazil-states-files';

    const states = async () => {
        // will create state files in root folder
        await statesFilesJson();
    }
```

# Árvore de arquivos e pastas

```
📦brasilStatesFiles
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
 ```
