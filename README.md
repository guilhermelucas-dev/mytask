
# mytask

 API para realizar o CRUD de suas tasks(tarefas).

A API permite listar as tarefas cadastradas, marcá-las como concluídas, atualizá-las e remover tarefas da lista.

## Requisitos

#### Requisitos funcionais
- [x] Criação de uma task;
- [x] Listagem de todas as tasks cadastradas;
- [x] Marcar pelo id uma task como completa;
- [x] Atualização de uma task pelo id;
- [x] Remover uma taks da lista pelo id;
- [x] pesquisar por um task, através de uma palavra contida no título ou descrição;



## Tecnologias
- Node.js

## Documentação da API

#### Estrutura:

| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `id`      |  Idendificador único de cada task |
| `title`      |  Título da task |
| `description`      | Descrição detalhada da task |
| `completed_at`      |  Data de quando a task foi concluída. O valor inicial deve ser null |
| `created_at `      |   Data de quando a task foi criada. |
| `updated_at  `      |   Deve ser sempre alterado para a data de quando a task foi atualizada.

#### Rotas:

```http
  POST /tasks
```
```http
  GET /tasks
```
```http
  PUT /tasks/:id
```
```http
  DELETE /tasks/:id
```
```http
  PATCH /tasks/:id/complete
```



## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/guilherme-lucas-63539a2a8/)


