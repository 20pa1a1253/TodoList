// __tests__/todo.js
/* eslint-disable no-undef */
// const request = require("supertest");
// const db = require("../models");
// const app = require("../app");

// let server, agent;
// describe("Todolist Test Suite", () => {
//   beforeAll(async () => {
//     await db.sequelize.sync({ force: true });
//     server = app.listen(8000, () => {});
//     agent = request.agent(server);
//   });
//   afterAll(async () => {
//     await db.sequelize.close();
//     server.close();
//   });

//   test("responds with json at /todo", async () => {
//     const response = await agent.post("/todos").send({
//       title: "Test todo",
//       dueDate: new Date().toISOString(),
//       completed: false,
//     });
//     expect(response.statusCode).toBe(302);
//     expect(response.header["content-type"]).toBe(
//       "application/json; charset=utf-8"
//     );
//     const parsedResponse = JSON.parse(response.text);
//     //expect(response.text.id).toBeDefined();
//     expect(parsedResponse.id).toBeDefined();
//   });
// test("Mark As Complete", async () => {
//   const response = await agent.post("/todos").send({
//     title: "Test todo",
//     dueDate: new Date().toISOString(),
//     completed: false,
//   });
//   const parsedResponse = JSON.parse(response.text);
//   const todoId = parsedResponse.id;
//   expect(parsedResponse.completed).toBe(false);
//   const markCompleteResponse = await agent
//     .put("/todos/" + todoId + "/markAsCompleted")
//     .send();
//   const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
//   expect(parsedUpdateResponse.completed).toBe(true);
// });
// test("Mark As Complete", async () => {
//   const response = await agent.post("/todos").send({
//     title: "Test todo",
//     dueDate: new Date().toISOString(),
//     completed: false,
//   });
//   const parsedResponse = JSON.parse(response.text);
//   const todoId = parsedResponse.id;
//   const todos = await db.Todo.findAll({
//     where: {
//       id: todoId,
//     },
//   });
//   expect(todos).toHaveLength(1);

//   // expect(parsedResponse.completed).toBe(false);
//   const delResponse = await agent.delete("/todos/" + todoId).send();
//   //const parsedUpdateResponse = JSON.parse(delResponse.text);
//   expect(delResponse.body).toBe(true);
//   const tod = await db.Todo.findAll({
//     where: {
//       id: todoId,
//     },
//   });
//   expect(tod).toHaveLength(0);
// });
//});
const req = require("supertest");
var cheerio = require("cheerio");
const db = require("../models/index");
const app = require("../app");
const { default: expect } = require("expect");
let server, agent;

function extractCsrfToken(res) {
  var $ = cheerio.load(res.text);
  return $("[name=_csrf]").val();
}

describe("Todo Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(4000, () => {});
    agent = req.agent(server);
  });
  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });
  test("responds with json at /todos", async () => {
    const r = await agent.get("/");
    const csrfToken = extractCsrfToken(r);
    const res = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    expect(res.statusCode).toBe(403);
  });

  // test("Mark a todo as complete", async () => {
  //   let res = await agent.get("/");
  //   let csrfToken = extractCsrfToken(res);
  //   await agent.post("/todos").send({
  //     title: "Buy milk",
  //     dueDate: new Date().toISOString(),
  //     completed: false,
  //     _csrf: csrfToken,
  //   });
  //   const groupedTodosResponse = await agent
  //     .get("/")
  //     .set("Accept", "application/json");
  //   const parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
  //   const dueTodayCount = parsedGroupedResponse.todotod.length;
  //   const latestTodo = parsedGroupedResponse.todotod[dueTodayCount - 1];

  //   res = await agent.get("/");
  //   csrfToken = extractCsrfToken(res);
  //   const markCompleteResponse = await agent
  //     .put(`/todos/${latestTodo.id}`)
  //     .send({
  //       completed: true,
  //       _csrf: csrfToken,
  //     });
  //   const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
  //   expect(parsedUpdateResponse.completed).toBe(true);
  // });

  // test("Delete a Todo", async () => {
  //   let res = await agent.get("/");
  //   let csrfToken = extractCsrfToken(res);
  //   await agent.post("/todos").send({
  //     title: "Buy milk",
  //     dueDate: new Date().toISOString(),
  //     completed: false,
  //     _csrf: csrfToken,
  //   });
  //   const groupedTodosResponse = await agent
  //     .get("/")
  //     .set("Accept", "application/json");
  //   const parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
  //   const dueTodayCount = parsedGroupedResponse.todotod.length;
  //   const latestTodo = parsedGroupedResponse.todotod[dueTodayCount - 1];

  //   res = await agent.get("/");
  //   csrfToken = extractCsrfToken(res);
  //   const deleteTodo = await agent.delete(`/todos/${latestTodo.id}`).send({
  //     _csrf: csrfToken,
  //   });
  //   const parsedUpdateResponse = JSON.parse(deleteTodo.text);
  //   expect(parsedUpdateResponse.success).toBe(true);
  // });
});
