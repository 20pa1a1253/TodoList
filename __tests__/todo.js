// __tests__/todo.js
/* eslint-disable no-undef */
const request = require("supertest");
const db = require("../models");
const app = require("../app");

let server, agent;
describe("Todolist Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(3000, () => {});
    agent = request.agent(server);
  });
  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  test("responds with json at /todo", async () => {
    const response = await agent.post("/todos").send({
      title: "Test todo",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.id).toBeDefined();
  });
  test("Mark As Complete", async () => {
    const response = await agent.post("/todos").send({
      title: "Test todo",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    const parsedResponse = JSON.parse(response.text);
    const todoId = parsedResponse.id;
    expect(parsedResponse.completed).toBe(false);
    const markCompleteResponse = await agent
      .put("/todos/" + todoId + "/markAsCompleted")
      .send();
    const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
    expect(parsedUpdateResponse.completed).toBe(true);
  });
  test("Mark As Complete", async () => {
    const response = await agent.post("/todos").send({
      title: "Test todo",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    const parsedResponse = JSON.parse(response.text);
    const todoId = parsedResponse.id;
    const todos = await db.Todo.findAll({
      where: {
        id: todoId,
      },
    });
    expect(todos).toHaveLength(1);

    // expect(parsedResponse.completed).toBe(false);
    const delResponse = await agent.delete("/todos/" + todoId).send();
    //const parsedUpdateResponse = JSON.parse(delResponse.text);
    expect(delResponse.body).toBe(true);
    const tod = await db.Todo.findAll({
      where: {
        id: todoId,
      },
    });
    expect(tod).toHaveLength(0);
  });
});
