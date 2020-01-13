const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const Todo = require("./todo");
const { getData, getItem, setData } = require("./services");

const app = express();
const jsonParser = bodyParser.json();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use((request, response, next) => {
  const now = new Date();
  const data = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${
    request.method
  } ${request.url} ${request.get("user-agent")}`;

  fs.appendFile("server.log", data + "\n", () => {});
  next();
});

app.get("/api/todos", (req, res) => {
  res.send(getData());
});

app.post("/api/todos", jsonParser, ({ body }, res) => {
  if (!body) return res.sendStatus(400);
  const { title, description } = body;
  const todo = new Todo(title, description);
  res.send(setData([...getData(), todo]));
});

app.delete("/api/todos/:id", ({ params: { id } }, res) => {
  const todo = getItem(getData(), id);

  if (todo) {
    const data = setData(getData().filter(todo => todo.id !== id));
    res.send(data);
  } else {
    res.status(404).send('Todo not found');
  }
});

app.put("/api/todos", jsonParser, ({ body }, res) => {
  if (!body) return res.sendStatus(400);
  const { id, title, description, isCompleted } = body;
  const data = getData();
  const todo = getItem(data, id);
  const index = data.findIndex(el => el === todo);

  if (todo) {
    const newTodo = { ...todo, title, description, isCompleted };
    data.splice(index, 1, newTodo);
    res.send(setData(data));
  } else {
    res.status(404).send("Todo not found");
  }
});

app.listen(3001);
