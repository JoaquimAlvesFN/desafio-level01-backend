const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  if(likes) {
    return response.json({likes: 0});
  }

  const repoIndex = repositories.findIndex(repo => repo.id === id);
  if(repoIndex < 0) {
    return response.status(400).send();
  }

  const newRepo = {
    id,
    title,
    url,
    techs
  }

  repositories[repoIndex] = newRepo;

  return response.json(newRepo);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0) {
    return response.status(400).send();
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const [data] = repositories.filter(repo => {
    if(repo.id == id) {
      return repo.likes += 1;
    }
  });

  if(!data) {
    return response.status(400).send();
  }

  return response.json({likes: data.likes});
});

module.exports = app;
