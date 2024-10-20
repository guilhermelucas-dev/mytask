import { randomUUID } from 'node:crypto';
import { Database } from "./database.js";
import { buildRoutePath } from './utils/build-routes-path.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {

      const { search } = request.query

      console.log(search);

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search,
      } : null);
  
      return response.end(JSON.stringify(tasks));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { title, description } = request.body;

      if (!title) {
        return response.writeHead(400).end(JSON.stringify({ message: 'title is required' }));
      }

      if (!description) {
        return response.writeHead(400).end(JSON.stringify({message: 'description is required'}));
      }

    const task = {
      id: randomUUID(),
      title: title,
      description: description,
      completed_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    database.insert('tasks', task);

    return response.writeHead(201).end();
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      const { id } = request.params;
      const { title, description } = request.body;

      if (!title && !description) {
        return response.writeHead(400).end(
          JSON.stringify({message: 'title or description are required'})
        )
      }

      const [task] = database.select('tasks', { id })

      if (!task) {
        return response.writeHead(404).end();
      }

      database.update('tasks', id, {
        title,
        description,
        updated_at: new Date().toISOString()
      });
      return response.writeHead(204).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      const { id } = request.params;

      const [task] = database.select('tasks', { id });

      if (!task) {
        return response.writeHead(404).end();
      }

      database.delete('tasks', id);

      return response.writeHead(204).end();
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (request, response) => {
      const { id } = request.params;

      const [task] = database.select('tasks', { id });

      if (!task) {
        return response.writeHead(404).end();
      }

      const isTaskCompleted = !!task.completed_at;
      const completed_at = isTaskCompleted ? null : new Date().toISOString();

      database.update('tasks', id, { completed_at })

      return response.writeHead(204).end();
    }
  },
]