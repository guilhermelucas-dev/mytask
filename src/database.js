import fs from 'node:fs/promises';

export const databasePaht = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePaht, 'utf-8').then((data) => {
      this.#database = JSON.parse(data);
    }).catch(() => {
      this.#persist();
    });
  }

  #persist() {
    fs.writeFile(databasePaht, JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        console.log(data);
        return Object.entries(search).some(([key, value]) => {
          console.log(row)
          return row[key].toLowerCase().includes(value.toLowerCase());
        })
      })
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    console.log(data);

    if (rowIndex > -1) {
      const row = this.#database[table][rowIndex];
      this.#database[table][rowIndex] = { id, ...row, ...data };
      this.#persist();
    }

  }
  
  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}